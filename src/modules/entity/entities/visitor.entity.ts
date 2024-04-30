import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Access } from './access.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Visitor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lname: string;

  @Column()
  phone: string;

  @Column()
  type: 'visitor' | 'service' | 'delivery' | 'vendor' | 'other';

  @OneToMany(() => Vehicle, (vehicle) => vehicle.visitor)
  vehicles: Vehicle[];

  @OneToMany(() => Access, (access) => access.visitor)
  accesses: Access[];
}
