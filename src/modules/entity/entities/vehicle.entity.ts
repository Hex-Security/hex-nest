import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { House } from './house.entity';
import { Access } from './access.entity';
import { Visitor } from './visitor.entity';

@Entity()
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

  @Column({ default: true })
  is_visitor: boolean;

  @Column({ nullable: true })
  @ManyToOne(() => Visitor, (visitor) => visitor.vehicles)
  visitor: Visitor;

  @Column({ nullable: true })
  @ManyToOne(() => User, (user) => user.vehicles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => House, (house) => house.vehicles)
  @JoinColumn({ name: 'house_id' })
  house: House;

  @OneToMany(() => Access, (access) => access.vehicle)
  accesses: Access[];
}
