import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Access } from './access.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Visitor {
  @PrimaryColumn()
  uid: string;

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
