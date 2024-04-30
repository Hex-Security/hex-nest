import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';
import { Complex } from './complex.entity';
import { Access } from './access.entity';

@Entity()
export class House {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @ManyToOne(() => User, (user) => user.residence)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => User, (user) => user.residence)
  residents: User[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.house)
  vehicles: Vehicle[];

  @ManyToOne(() => Complex, (complex) => complex.houses)
  @JoinColumn({ name: 'complex_id' })
  complex: Complex;

  @OneToMany(() => Access, (access) => access.house)
  accesses: Access[];
}
