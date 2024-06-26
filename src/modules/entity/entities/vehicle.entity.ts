import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Access } from './access.entity';
import { House } from './house.entity';
import { User } from './user.entity';

@Entity('vehicle')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  plate: string;

  @Column()
  color: string;

  @Column()
  year: string;

  @Column({ default: true })
  is_visitor: boolean;

  @Column()
  house_id: string;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User, (user) => user.vehicles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => House, (house) => house.vehicles)
  @JoinColumn({ name: 'house_id' })
  house: House;

  @OneToMany(() => Access, (access) => access.vehicle)
  accesses: Access[];
}
