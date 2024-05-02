import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/entities/user.entity';
import { Complex } from '../entity/entities/complex.entity';
import { ComplexDto } from 'src/shared/dto/complex.dto';
import { House } from '../entity/entities/house.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ComplexService {
  constructor(
    @InjectRepository(Complex) private complex_repo: Repository<Complex>,
    private readonly user_service: UserService,
  ) {}

  async findAll(): Promise<Complex[]> {
    return await this.complex_repo.find();
  }

  async findOne(id: string): Promise<Complex> {
    return await this.complex_repo.findOne({ where: { id } });
  }

  async create(dto: ComplexDto): Promise<Complex> {
    const { address, admin, city, metadata, name, state, zip } = dto;

    const admin_user: User = await this.user_service.findOne(admin);

    // Check admin exists if provided
    if (admin !== undefined && !admin_user) {
      throw new BadRequestException(`Admin with id ${admin} not found.`);
    }

    const new_complex: Complex = this.complex_repo.create({
      address,
      admin:
        admin !== undefined ? await this.user_service.findOne(admin) : null,
      city,
      metadata,
      name,
      state,
      zip,
    });
    const saved_complex = await this.complex_repo.save(new_complex);

    return saved_complex;
  }

  async update(id: string, dto: ComplexDto): Promise<Complex> {
    const { address, admin, city, metadata, name, state, zip } = dto;

    const complex: Complex = await this.complex_repo.findOne({ where: { id } });

    if (!complex) {
      throw new BadRequestException(`Complex with id ${id} not found.`);
    }

    const admin_user: User = await this.user_service.findOne(admin);

    // Check admin exists if provided
    if (admin !== undefined && !admin_user) {
      throw new BadRequestException(`Admin with id ${admin} not found.`);
    }

    complex.address = address;
    complex.admin = admin !== undefined ? admin_user : null;
    complex.city = city;
    complex.metadata = metadata;
    complex.name = name;
    complex.state = state;
    complex.zip = zip;

    const updated_complex = await this.complex_repo.save(complex);

    return updated_complex;
  }

  async remove(id: string): Promise<Complex> {
    const complex: Complex = await this.complex_repo.findOne({ where: { id } });

    if (!complex) {
      throw new BadRequestException(`Complex with id ${id} not found.`);
    }

    return this.complex_repo.remove(complex);
  }

  async getHouses(complex_id: string): Promise<House[]> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
      relations: ['houses'],
    });

    if (!complex) {
      throw new BadRequestException(`Complex with id ${complex_id} not found.`);
    }

    return complex.houses;
  }

  async getAdmin(complex_id: string): Promise<User> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
      relations: ['admin'],
    });

    if (!complex) {
      throw new BadRequestException(`Complex with id ${complex_id} not found.`);
    }

    return complex.admin;
  }

  async setAdmin(complex_id: string, user_id: string): Promise<Complex> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
      relations: ['admin'],
    });

    if (!complex) {
      throw new BadRequestException(`Complex with id ${complex_id} not found.`);
    }

    const user: User = await this.user_service.findOne(user_id);

    if (!user) {
      throw new BadRequestException(`User with id ${user_id} not found.`);
    }

    complex.admin = user;

    return this.complex_repo.save(complex);
  }

  async removeAdmin(complex_id: string): Promise<Complex> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
      relations: ['admin'],
    });

    if (!complex) {
      throw new BadRequestException(`Complex with id ${complex_id} not found.`);
    }

    complex.admin = null;

    return this.complex_repo.save(complex);
  }

  async getMetadata(complex_id: string): Promise<any> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
    });

    if (!complex) {
      throw new BadRequestException(`Complex with id ${complex_id} not found.`);
    }

    return complex.metadata;
  }

  async setMetadata(complex_id: string, metadata: any): Promise<Complex> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
    });

    if (!complex) {
      throw new BadRequestException(`Complex with id ${complex_id} not found.`);
    }

    complex.metadata = metadata;

    return this.complex_repo.save(complex);
  }

  async removeMetadata(complex_id: string): Promise<Complex> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
    });

    if (!complex) {
      throw new BadRequestException(`Complex with id ${complex_id} not found.`);
    }

    complex.metadata = null;

    return this.complex_repo.save(complex);
  }
}
