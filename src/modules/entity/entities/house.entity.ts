import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Access } from './access.entity';
import { Complex } from './complex.entity';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';

@Entity('house')
export class House {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @Column()
  owner_id: string;

  @Column()
  complex_id: string;

  @ManyToOne(() => User, (user) => user.residence)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToOne(() => Complex, (complex) => complex.houses)
  @JoinColumn({ name: 'complex_id' })
  complex: Complex;

  @OneToMany(() => Access, (access) => access.house)
  accesses: Access[];

  @OneToMany(() => User, (user) => user.residence)
  residents: User[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.house)
  vehicles: Vehicle[];
}
