import { VisitorType } from 'src/shared/enum/visitor-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Access } from './access.entity';

@Entity()
export class Visitor {
  @PrimaryColumn('uuid')
  user_id: string;

  @Column({ enum: VisitorType, default: VisitorType.VISITOR, type: 'enum' })
  type: VisitorType;

  @OneToMany(() => Access, (access) => access.visitor)
  accesses: Access[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
