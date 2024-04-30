import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { House } from './house.entity';

@Entity()
export class Complex {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @ManyToOne(() => User, (user) => user.complexes)
  @JoinColumn({ name: 'admin_id' })
  admin: User;

  @OneToMany(() => House, (house) => house.complex)
  houses: House[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  metadata: any;
}
