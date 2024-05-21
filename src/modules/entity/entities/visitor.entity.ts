import { VisitorType } from 'src/shared/enum/visitor-type.enum';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Access } from './access.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Visitor {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  lname: string;

  @Column()
  phone: string;

  @Column({ enum: VisitorType, default: VisitorType.VISITOR, type: 'enum' })
  type: VisitorType;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.visitor)
  vehicles: Vehicle[];

  @OneToMany(() => Access, (access) => access.visitor)
  accesses: Access[];
}
