import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplexDto } from 'src/shared/dto/complex.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Complex } from '../entity/entities/complex.entity';
import { User } from '../entity/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ComplexService {
  constructor(
    @InjectRepository(Complex) private complex_repo: Repository<Complex>,
    private readonly user_service: UserService,
  ) {}

  async findAll(): Promise<Complex[]> {
    return this.complex_repo.find();
  }

  async findOne(complex_id: string): Promise<Complex | null> {
    return this.complex_repo.findOne({ where: { id: complex_id } });
  }

  async create(dto: ComplexDto): Promise<Complex> {
    const { address, admin_id, city, metadata, name, state, zip } = dto;

    const admin_user: User | null = await this.user_service.findOne(admin_id);

    // Check admin exists if provided
    if (admin_id !== undefined && !admin_user) {
      throw new NotFoundException(`Admin with id ${admin_id} not found.`);
    }

    const new_complex: Complex = this.complex_repo.create({
      address,
      admin_id: admin_id || null,
      admin: admin_user,
      city,
      metadata,
      name,
      state,
      zip,
    });

    const saved_complex = await this.complex_repo.save(new_complex);

    return saved_complex;
  }

  async update(
    complex_id: string,
    dto: Partial<ComplexDto>,
  ): Promise<UpdateResult> {
    return this.complex_repo.update(complex_id, { ...dto });
  }

  async delete(complex_id: string): Promise<DeleteResult> {
    return this.complex_repo.delete(complex_id);
  }

  async getAdmin(complex_id: string): Promise<User> {
    const complex: Complex | null = await this.complex_repo.findOne({
      where: { id: complex_id },
      relations: ['admin'],
    });

    if (!complex) {
      throw new NotFoundException(`Complex with id ${complex_id} not found.`);
    }

    return complex.admin;
  }

  async setAdmin(complex_id: string, user_id: string): Promise<Complex> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
      relations: ['admin'],
    });

    if (!complex) {
      throw new NotFoundException(`Complex with id ${complex_id} not found.`);
    }

    const user: User = await this.user_service.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found.`);
    }

    complex.admin = user;

    return this.complex_repo.save(complex);
  }

  async deleteAdmin(complex_id: string): Promise<Complex> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
      relations: ['admin'],
    });

    if (!complex) {
      throw new NotFoundException(`Complex with id ${complex_id} not found.`);
    }

    complex.admin = null;

    return this.complex_repo.save(complex);
  }

  async getMetadata(complex_id: string): Promise<any> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
    });

    if (!complex) {
      throw new NotFoundException(`Complex with id ${complex_id} not found.`);
    }

    return complex.metadata;
  }

  async setMetadata(complex_id: string, metadata: any): Promise<Complex> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
    });

    if (!complex) {
      throw new NotFoundException(`Complex with id ${complex_id} not found.`);
    }

    complex.metadata = metadata;

    return this.complex_repo.save(complex);
  }

  async deleteMetadata(complex_id: string): Promise<Complex> {
    const complex: Complex = await this.complex_repo.findOne({
      where: { id: complex_id },
    });

    if (!complex) {
      throw new NotFoundException(`Complex with id ${complex_id} not found.`);
    }

    complex.metadata = null;

    return this.complex_repo.save(complex);
  }
}
