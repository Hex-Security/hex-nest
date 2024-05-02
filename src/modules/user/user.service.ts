import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entity/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from '../entity/entities/house.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private user_repo: Repository<User>) {}

  // q: is there a diferrence between returning the await value and returning the promise that the .find() method returns?
  // a: no, there is no difference. The await keyword is used to wait for the promise to resolve and return the resolved value.

  async findAll(): Promise<User[]> {
    const users: User[] = await this.user_repo.find();

    if (!users) {
      throw new NotFoundException('No users found!!!');
    }

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.user_repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return user;
  }

  async create(user: User): Promise<User> {
    const new_user: User = this.user_repo.create(user);
    const saved_user: User = await this.user_repo.save(new_user);

    return saved_user;
  }

  async update(id: string, user: User): Promise<User> {
    const updated_user: User = await this.user_repo.save({ ...user, id });

    if (!updated_user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return updated_user;
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.user_repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    await this.user_repo.remove(user);

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user: User = await this.user_repo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return user;
  }

  async findUserByUsername(username: string): Promise<User> {
    const user: User = await this.user_repo.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found.`);
    }

    return user;
  }

  async findUserByPhone(phone: string): Promise<User> {
    const user: User = await this.user_repo.findOne({ where: { phone } });

    if (!user) {
      throw new NotFoundException(`User with phone ${phone} not found.`);
    }

    return user;
  }

  async findUsersByRole(role: 'admin' | 'resident' | 'guard'): Promise<User[]> {
    const users: User[] = await this.user_repo.find({ where: { role } });

    if (!users) {
      throw new NotFoundException(`Users with role ${role} not found.`);
    }

    return users;
  }

  async findUsersByComplex(complex_id: string): Promise<User[]> {
    const users: User[] = await this.user_repo.find({
      where: { complexes: { id: complex_id } },
      relations: ['complexes'],
    });

    if (!users) {
      throw new NotFoundException(`Users in complex ${complex_id} not found.`);
    }

    return users;
  }

  async findUsersByHouse(house_id: string): Promise<User[]> {
    const users: User[] = await this.user_repo.find({
      where: { residence: { id: house_id } },
      relations: ['residence'],
    });

    if (!users) {
      throw new NotFoundException(`Users in house ${house_id} not found.`);
    }

    return users;
  }

  async findUserManagedHouse(user_id: string): Promise<House> {
    const user: User = await this.user_repo.findOne({
      where: { id: user_id },
      relations: ['residence'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found.`);
    }

    return user.residence;
  }
}
