import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleDto } from 'src/shared/dto/vehicle.dto';
import { In, Repository, UpdateResult } from 'typeorm';
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

  async findMany(vids: string[]): Promise<Vehicle[]> {
    return this.vehicle_repository.find({ where: { id: In(vids) } });
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.vehicle_repository.findOne({ where: { id } });
  }

  async create(house_id: string, dto: VehicleDto): Promise<Vehicle> {
    // 1. Validate dto combinations
    if (dto.is_visitor && !dto.visitor_id) {
      throw new BadRequestException('Visitor vehicles must have a visitor.');
    }

    if (dto.visitor_id && !dto.is_visitor) {
      throw new BadRequestException(
        'Visitor vehicles must be marked as visitor.',
      );
    }

    if (!dto.is_visitor && !dto.user_id) {
      throw new BadRequestException('User vehicles must have a user.');
    }

    if (dto.is_visitor && dto.user_id) {
      throw new BadRequestException('Visitor vehicles cannot have a user.');
    }

    // 2. Find house, user, and visitor
    const house: House = await this.house_service.findOne(house_id);

    const user: User = dto.user_id
      ? await this.user_service.findOne(dto.user_id)
      : null;

    const visitor: Visitor = dto.visitor_id
      ? await this.visitor_service.findOne(dto.visitor_id)
      : null;

    // 3. Save vehicle to database
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

    const new_vehicle: Vehicle = this.vehicle_repository.create(vehicle);
    const saved_vehicle: Vehicle =
      await this.vehicle_repository.save(new_vehicle);

    return saved_vehicle;
  }

  async update(id: string, dto: Partial<VehicleDto>): Promise<UpdateResult> {
    return this.vehicle_repository.update(id, { ...dto });
  }

  async delete(id: string): Promise<void> {
    await this.vehicle_repository.delete(id);
  }

  async findOneByPlate(plate: string): Promise<Vehicle | null> {
    return this.vehicle_repository.findOne({ where: { plate } });
  }

  async findAllByHouse(house_id: string): Promise<Vehicle[]> {
    return this.vehicle_repository.find({ where: { house_id } });
  }

  async findAllByUser(user_id: string): Promise<Vehicle[]> {
    return this.vehicle_repository.find({ where: { user_id } });
  }

  async findAllByVisitor(visitor_id: string): Promise<Vehicle[]> {
    return this.vehicle_repository.find({ where: { visitor_id } });
  }

  async findAllByComplex(complex_id: string): Promise<Vehicle[]> {
    return this.vehicle_repository
      .createQueryBuilder('vehicle')
      .innerJoin('vehicle.house', 'house')
      .where('house.complex_id = :complex_id', { complex_id })
      .getMany();
  }

  async findAllByComplexAndUser(
    complex_id: string,
    user_id: string,
  ): Promise<Vehicle[]> {
    return this.vehicle_repository
      .createQueryBuilder('vehicle')
      .innerJoin('vehicle.house', 'house')
      .where('house.complex_id = :complex_id', { complex_id })
      .andWhere('vehicle.user_id = :user_id', { user_id })
      .getMany();
  }

  async findAllByComplexAndVisitor(
    complex_id: string,
    visitor_id: string,
  ): Promise<Vehicle[]> {
    return this.vehicle_repository
      .createQueryBuilder('vehicle')
      .innerJoin('vehicle.house', 'house')
      .where('house.complex_id = :complex_id', { complex_id })
      .andWhere('vehicle.visitor_id = :visitor_id', { visitor_id })
      .getMany();
  }

  async findAllByComplexAndHouse(
    complex_id: string,
    house_id: string,
  ): Promise<Vehicle[]> {
    return this.vehicle_repository
      .createQueryBuilder('vehicle')
      .innerJoin('vehicle.house', 'house')
      .where('house.complex_id = :complex_id', { complex_id })
      .andWhere('vehicle.house_id = :house_id', { house_id })
      .getMany();
  }

  async findAllByComplexAndHouseAndUser(
    complex_id: string,
    house_id: string,
    user_id: string,
  ): Promise<Vehicle[]> {
    return this.vehicle_repository
      .createQueryBuilder('vehicle')
      .innerJoin('vehicle.house', 'house')
      .where('house.complex_id = :complex_id', { complex_id })
      .andWhere('vehicle.house_id = :house_id', { house_id })
      .andWhere('vehicle.user_id = :user_id', { user_id })
      .getMany();
  }

  async findAllByComplexAndHouseAndVisitor(
    complex_id: string,
    house_id: string,
    visitor_id: string,
  ): Promise<Vehicle[]> {
    return this.vehicle_repository
      .createQueryBuilder('vehicle')
      .innerJoin('vehicle.house', 'house')
      .where('house.complex_id = :complex_id', { complex_id })
      .andWhere('vehicle.house_id = :house_id', { house_id })
      .andWhere('vehicle.visitor_id = :visitor_id', { visitor_id })
      .getMany();
  }
}
