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
    return this.visitor_repository.findOne({ where: { user_id: visitor_id } });
  }

  async findMany(visitor_ids: string[]): Promise<Visitor[]> {
    return this.visitor_repository.find({
      where: { user_id: In(visitor_ids) },
    });
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

  async findVisitorsByType(type: VisitorType): Promise<Visitor[]> {
    return this.visitor_repository.find({ where: { type } });
  }

  async findVisitorsByAccess(access_id: string): Promise<Visitor[]> {
    return this.visitor_repository.find({
      where: { accesses: { id: access_id } },
      relations: ['accesses'],
    });
  }

  async findVisitorsByHouse(house_id: string): Promise<Visitor[]> {
    return this.visitor_repository.find({
      where: { accesses: { house_id } },
      relations: ['accesses'],
    });
  }

  async findVisitorsByComplex(complex_id: string): Promise<Visitor[]> {
    return this.visitor_repository.find({
      where: { accesses: { house: { complex_id } } },
      relations: ['accesses'],
    });
  }
}
