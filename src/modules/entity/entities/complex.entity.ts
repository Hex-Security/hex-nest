import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { House } from './house.entity';
import { User } from './user.entity';

@Entity()
export class Complex {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  admin_id: string;

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
