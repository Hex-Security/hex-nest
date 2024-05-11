import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HouseDto } from 'src/shared/dto/house.dto';
import { Repository } from 'typeorm';
import { ComplexService } from '../complex/complex.service';
import { Complex } from '../entity/entities/complex.entity';
import { House } from '../entity/entities/house.entity';
import { User } from '../entity/entities/user.entity';
import { Vehicle } from '../entity/entities/vehicle.entity';
import { UserService } from '../user/user.service';
import { VehicleService } from '../vehicle/vehicle.service';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House) private house_repo: Repository<House>,
    private readonly user_service: UserService,
    private readonly complex_service: ComplexService,
    private readonly vehicle_service: VehicleService,
  ) {}

  async findAll(complex_id: string): Promise<House[]> {
    return await this.house_repo.find({
      where: { complex: { id: complex_id } },
    });
  }

  async findOne(id: string): Promise<House> {
    return await this.house_repo.findOne({ where: { id } });
  }

  async create(dto: HouseDto): Promise<House> {
    const user: User = await this.user_service.findOne(dto.owner);

    const complex: Complex = await this.complex_service.findOne(dto.complex);

    const residents: User[] = await this.user_service.findMany(dto.residents);

    const vehicles: Vehicle[] = await this.vehicle_service.findMany(
      dto.vehicles,
    );

    const house: Partial<House> = {
      owner: user,
      number: dto.number,
      complex,
      residents,
      vehicles,
    };

    const new_house: House = this.house_repo.create(house);
    const saved_house: House = await this.house_repo.save(new_house);

    return saved_house;
  }

  async update(id: string, house: Partial<House>): Promise<House> {
    const updated_house: House = await this.house_repo.save({ ...house, id });

    if (!updated_house) {
      throw new NotFoundException(`House with id ${id} not found.`);
    }

    return updated_house;
  }

  async remove(id: string): Promise<House> {
    const house: House = await this.house_repo.findOne({ where: { id } });

    if (!house) {
      throw new NotFoundException(`House with id ${id} not found.`);
    }

    return this.house_repo.remove(house);
  }

  async findAllResidents(id: string): Promise<User[]> {
    const house: House = await this.house_repo.findOne({
      where: { id },
      relations: ['residents'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${id} not found.`);
    }

    return house.residents;
  }

  async findOneResident(
    id: string,
    resident_id: string,
  ): Promise<User | undefined> {
    const house: House = await this.house_repo.findOne({
      where: { id },
      relations: ['residents'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${id} not found.`);
    }

    const resident: User = house.residents.find(
      (resident) => resident.uid === resident_id,
    );

    if (!resident) {
      throw new NotFoundException(`Resident with id ${resident_id} not found.`);
    }

    return resident;
  }
}
