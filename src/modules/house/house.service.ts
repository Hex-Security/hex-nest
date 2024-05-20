import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HouseDto } from 'src/shared/dto/house.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
      where: { complex_id },
    });
  }

  async findOne(house_id: string): Promise<House | null> {
    return await this.house_repo.findOne({ where: { id: house_id } });
  }

  async findOneByNumber(
    complex_id: string,
    number: string,
  ): Promise<House | null> {
    return await this.house_repo.findOne({ where: { number, complex_id } });
  }

  async findOneByOwner(owner_id: string): Promise<House | null> {
    return await this.house_repo.findOne({ where: { owner_id } });
  }

  async create(dto: HouseDto): Promise<House> {
    const complex: Complex = await this.complex_service.findOne(dto.complex_id);
    if (!complex) {
      throw new NotFoundException(
        `Complex with id ${dto.complex_id} not found.`,
      );
    }

    const user: User | null = await this.user_service.findOne(dto.owner_id);
    if (dto.owner_id) {
      if (!user) {
        throw new NotFoundException(`User with id ${dto.owner_id} not found.`);
      }
    }

    const new_house: House = this.house_repo.create({
      owner: dto.owner_id ? user : null,
      number: dto.number,
      complex,
    });
    const saved_house: House = await this.house_repo.save(new_house);

    return saved_house;
  }

  async update(
    house_id: string,
    house: Partial<HouseDto>,
  ): Promise<UpdateResult> {
    return this.house_repo.update(house_id, { ...house });
  }

  async delete(house_id: string): Promise<DeleteResult> {
    return this.house_repo.delete(house_id);
  }

  async findAllResidents(id: string): Promise<User[]> {
    const house: House | null = await this.house_repo.findOne({
      where: { id },
      relations: ['residents'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${id} not found.`);
    }

    return house.residents;
  }

  async findOneResident(
    house_id: string,
    resident_id: string,
  ): Promise<User | undefined> {
    const house: House = await this.house_repo.findOne({
      where: { id: house_id },
      relations: ['residents'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${house_id} not found.`);
    }

    let resident: User | null = await this.user_service.findOne(resident_id);

    if (!resident) {
      throw new NotFoundException(`User with id ${resident_id} not found.`);
    }

    resident = house.residents.find(
      (resident) => resident.user_id === resident_id,
    );

    if (!resident) {
      throw new NotFoundException(
        `Resident with id ${resident_id} not found for house ${house_id}.`,
      );
    }

    return resident;
  }

  async addResident(house_id: string, user_id: string): Promise<House> {
    const house: House = await this.house_repo.findOne({
      where: { id: house_id },
      relations: ['residents'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${house_id} not found.`);
    }

    const user: User = await this.user_service.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found.`);
    }

    house.residents.push(user);

    return this.house_repo.save(house);
  }

  async removeResident(house_id: string, user_id: string): Promise<House> {
    const house: House = await this.house_repo.findOne({
      where: { id: house_id },
      relations: ['residents'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${house_id} not found.`);
    }

    const user: User = await this.user_service.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found.`);
    }

    house.residents = house.residents.filter(
      (resident) => resident.user_id !== user_id,
    );

    return this.house_repo.save(house);
  }

  async findAllVehicles(house_id: string): Promise<Vehicle[]> {
    const house: House | null = await this.house_repo.findOne({
      where: { id: house_id },
      relations: ['vehicles'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${house_id} not found.`);
    }

    return house.vehicles;
  }

  async findOneVehicle(
    house_id: string,
    vehicle_id: string,
  ): Promise<Vehicle | undefined> {
    const house: House = await this.house_repo.findOne({
      where: { id: house_id },
      relations: ['vehicles'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${house_id} not found.`);
    }

    let vehicle: Vehicle | null =
      await this.vehicle_service.findOne(vehicle_id);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${vehicle_id} not found.`);
    }

    vehicle = house.vehicles.find((vehicle) => vehicle.id === vehicle_id);

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with id ${vehicle_id} not found for house ${house_id}.`,
      );
    }

    return vehicle;
  }

  async addVehicle(house_id: string, vehicle_id: string): Promise<House> {
    const house: House = await this.house_repo.findOne({
      where: { id: house_id },
      relations: ['vehicles'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${house_id} not found.`);
    }

    const vehicle: Vehicle = await this.vehicle_service.findOne(vehicle_id);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${vehicle_id} not found.`);
    }

    house.vehicles.push(vehicle);

    return this.house_repo.save(house);
  }

  async removeVehicle(house_id: string, vehicle_id: string): Promise<House> {
    const house: House = await this.house_repo.findOne({
      where: { id: house_id },
      relations: ['vehicles'],
    });

    if (!house) {
      throw new NotFoundException(`House with id ${house_id} not found.`);
    }

    const vehicle: Vehicle = await this.vehicle_service.findOne(vehicle_id);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${vehicle_id} not found.`);
    }

    house.vehicles = house.vehicles.filter(
      (vehicle) => vehicle.id !== vehicle_id,
    );

    return this.house_repo.save(house);
  }
}
