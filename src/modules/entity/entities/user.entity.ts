import { RolesEnum } from 'src/shared/enum/roles.enum';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
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

  @OneToMany(() => Complex, (complex) => complex.admin)
  complexes: Complex[];

  @OneToMany(() => House, (house) => house.owner)
  residence: House;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @OneToMany(() => Access, (access) => access.approver)
  accesses: Access[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
