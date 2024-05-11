import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Visitor } from '../entity/entities/visitor.entity';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(Visitor) private visitor_repository: Repository<Visitor>,
  ) {}

  async findAll(): Promise<Visitor[]> {
    return this.visitor_repository.find();
  }

  async findOne(uid: string): Promise<Visitor> {
    return this.visitor_repository.findOne({ where: { uid } });
  }

  async findMany(uids: string[]): Promise<Visitor[]> {
    return this.visitor_repository.find({ where: { uid: In(uids) } });
  }

  async update(id: string, visitor: Partial<Visitor>): Promise<Visitor> {
    return this.visitor_repository.save({ ...visitor, id });
  }

  async remove(uid: string): Promise<Visitor> {
    const visitor: Visitor = await this.visitor_repository.findOne({
      where: { uid },
    });

    return this.visitor_repository.remove(visitor);
  }
}
