import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/entities/user.entity';
import { Complex } from '../entity/entities/complex.entity';
import { ComplexDto } from 'src/shared/dto/complex.dto';
import { House } from '../entity/entities/house.entity';

@Injectable()
export class ComplexService {
  constructor(
    @InjectRepository(Complex) private complex_repo: Repository<Complex>,
  ) {}

  async findAll(): Promise<Complex[]> {
    return await this.complex_repo.find();
  }

  async findOne(id: string): Promise<Complex> {
    return await this.complex_repo.findOne({ where: { id } });
  }

  async create(dto: ComplexDto): Promise<Complex> {
    const admin: User;
    const houses: House[] = [];

    if (dto.admin) {
      admin = this.user_service.createAdmin(dto.admin);
    }

    if (dto.houses) {
      dto.houses.forEach((house) => {
        const new_house: House = this.house_service.create(house);
        const saved_house = await this.house_service.save(new_house);

        houses.push(saved_house);
      });
    }

    const new_complex: Complex = this.complex_repo.create({
      ...complex,
    });
    const saved_complex = await this.complex_repo.save(new_complex);

    return saved_complex;
  }
}
