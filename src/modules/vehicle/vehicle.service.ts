import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleDto } from 'src/shared/dto/vehicle.dto';
import { In, Repository } from 'typeorm';
import { House } from '../entity/entities/house.entity';
import { User } from '../entity/entities/user.entity';
import { Vehicle } from '../entity/entities/vehicle.entity';
import { Visitor } from '../entity/entities/visitor.entity';
import { HouseService } from '../house/house.service';
import { UserService } from '../user/user.service';
import { VisitorService } from '../visitor/visitor.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private vehicle_repository: Repository<Vehicle>,
    private readonly house_service: HouseService,
    private readonly user_service: UserService,
    private readonly visitor_service: VisitorService,
  ) {}

  findMany(vids: string[]): Promise<Vehicle[]> {
    return this.vehicle_repository.find({ where: { id: In(vids) } });
  }

  findOne(id: string): Promise<Vehicle> {
    return this.vehicle_repository.findOne({ where: { id } });
  }

  async create(dto: VehicleDto): Promise<Vehicle> {
    if (dto.is_visitor && !dto.visitor) {
      throw new BadRequestException('Visitor vehicles must have a visitor.');
    }

    if (dto.visitor && !dto.is_visitor) {
      throw new BadRequestException(
        'Visitor vehicles must be marked as visitor.',
      );
    }

    if (!dto.is_visitor && !dto.user) {
      throw new BadRequestException('User vehicles must have a user.');
    }

    if (dto.is_visitor && dto.user) {
      throw new BadRequestException('Visitor vehicles cannot have a user.');
    }

    const house: House = await this.house_service.findOne(dto.house);

    const user: User = dto.user
      ? await this.user_service.findOne(dto.user)
      : null;

    const visitor: Visitor = dto.visitor
      ? await this.visitor_service.findOne(dto.visitor)
      : null;

    const vehicle: Partial<Vehicle> = {
      plate: dto.plate,
      color: dto.color,
      model: dto.model,
      year: dto.year,
      make: dto.make,
      is_visitor: dto.is_visitor,
      house,
      user,
      visitor,
    };

    const new_vehicle = this.vehicle_repository.create(vehicle);
    return this.vehicle_repository.save(new_vehicle);
  }

  getVehicleByPlate(plate: string) {}
}
