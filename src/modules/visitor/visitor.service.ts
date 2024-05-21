import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitorType } from 'src/shared/enum/visitor-type.enum';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Visitor } from '../entity/entities/visitor.entity';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(Visitor) private visitor_repository: Repository<Visitor>,
  ) {}

  async findAll(): Promise<Visitor[]> {
    return this.visitor_repository.find();
  }

  async findOne(visitor_id: string): Promise<Visitor> {
    return this.visitor_repository.findOne({ where: { id: visitor_id } });
  }

  async findMany(visitor_ids: string[]): Promise<Visitor[]> {
    return this.visitor_repository.find({ where: { id: In(visitor_ids) } });
  }

  async update(
    visitor_id: string,
    visitor: Partial<Visitor>,
  ): Promise<UpdateResult> {
    return this.visitor_repository.update(visitor_id, visitor);
  }

  async delete(user_id: string): Promise<DeleteResult> {
    return this.visitor_repository.delete(user_id);
  }

  async findVisitorByPhone(phone: string): Promise<Visitor> {
    return this.visitor_repository.findOne({ where: { phone } });
  }

  async findVisitorsByType(type: VisitorType): Promise<Visitor[]> {
    return this.visitor_repository.find({ where: { type } });
  }

  async findVisitorsByVehicle(vehicle_id: string): Promise<Visitor[]> {
    return this.visitor_repository.find({
      where: { vehicles: { id: vehicle_id } },
      relations: ['vehicles'],
    });
  }

  async findVisitorsByAccess(access_id: string): Promise<Visitor[]> {
    return this.visitor_repository.find({
      where: { accesses: { id: access_id } },
      relations: ['accesses'],
    });
  }

  async findVisitorsByHouse(house_id: string): Promise<Visitor[]> {
    return this.visitor_repository.find({
      where: { accesses: { house: { id: house_id } } },
      relations: ['accesses'],
    });
  }

  async findVisitorsByComplex(complex_id: string): Promise<Visitor[]> {
    return this.visitor_repository.find({
      where: { accesses: { house: { complex: { id: complex_id } } } },
      relations: ['accesses'],
    });
  }
}
