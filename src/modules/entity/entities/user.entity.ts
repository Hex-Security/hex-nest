import { RolesEnum } from 'src/shared/enum/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Access } from './access.entity';
import { Complex } from './complex.entity';
import { House } from './house.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  lname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ enum: RolesEnum, default: RolesEnum.USER, type: 'enum' })
  role: RolesEnum;

  @OneToMany(() => Access, (access) => access.approver)
  accesses: Access[];

  // Resident fields
  @Column()
  residence_id: string;

  @ManyToOne(() => House, (house) => house.residents)
  @JoinColumn({ name: 'residence_id' })
  residence: House;

  @OneToMany(() => House, (house) => house.owner)
  owned_residence: House;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  // Admin fields
  @OneToMany(() => Complex, (complex) => complex.admin)
  complexes: Complex[];

  // Guard fields
  @OneToMany(() => Access, (access) => access.guard)
  guard_accesses: Access[];

  @Column({ nullable: true })
  complex_id: string;

  @ManyToOne(() => Complex, (complex) => complex.guards)
  @JoinColumn({ name: 'complex_id' })
  complex: Complex;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
