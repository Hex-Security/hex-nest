import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { House } from '../entity/entities/house.entity';
import { User } from '../entity/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private user_repo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.user_repo.find();
  }

  async findOne(user_id: string): Promise<User | null> {
    return this.user_repo.findOne({ where: { user_id } });
  }

  async findMany(uids: string[]): Promise<User[]> {
    return this.user_repo.find({ where: { user_id: In(uids) } });
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.user_repo.save({ ...user, id });
  }

  async remove(user_id: string): Promise<User> {
    const user: User = await this.user_repo.findOne({ where: { user_id } });

    return this.user_repo.remove(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.user_repo.findOne({ where: { email } });
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.user_repo.findOne({ where: { username } });
  }

  async findUserByPhone(phone: string): Promise<User> {
    return this.user_repo.findOne({ where: { phone } });
  }

  async findUsersByRole(role: 'admin' | 'resident' | 'guard'): Promise<User[]> {
    return this.user_repo.find({ where: { role } });
  }

  async findUsersByComplex(complex_id: string): Promise<User[]> {
    return this.user_repo.find({
      where: { complexes: { id: complex_id } },
      relations: ['complexes'],
    });
  }

  async findUsersByHouse(house_id: string): Promise<User[]> {
    return this.user_repo.find({
      where: { residence: { id: house_id } },
      relations: ['residence'],
    });
  }

  async findUserManagedHouse(user_id: string): Promise<House> {
    // find user from
    const user: User = await this.user_repo.findOne({
      where: { user_id },
      relations: ['residence'],
    });

    return user.residence;
  }
}
