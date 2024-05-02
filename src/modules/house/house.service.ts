import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from '../entity/entities/house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HouseService {
  constructor(@InjectRepository(House) private house_repo: Repository<House>) {}

  async findAll(): Promise<House[]> {
    return await this.house_repo.find();
  }

  async findOne(id: string): Promise<House> {
    return await this.house_repo.findOne({ where: { id } });
  }

  async create(house: House): Promise<House> {
    const new_house: House = this.house_repo.create(house);
    const saved_house: House = await this.house_repo.save(new_house);

    return saved_house;
  }

  async update(id: string, house: House): Promise<House> {
    const updated_house: House = await this.house_repo.save({ ...house, id });

    if (!updated_house) {
      throw new NotFoundException(`House with id ${id} not found.`);
    }

    return updated_house;
  }
}
