import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
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

  @Column()
  role: 'admin' | 'resident' | 'guard' | 'dev';

  @OneToMany(() => Complex, (complex) => complex.admin)
  complexes: Complex[];

  @OneToMany(() => House, (house) => house.owner)
  residence: House;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
