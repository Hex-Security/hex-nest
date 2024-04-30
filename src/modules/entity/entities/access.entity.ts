import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterUpdate,
} from 'typeorm';
import { Visitor } from './visitor.entity';
import { Vehicle } from './vehicle.entity';
import { House } from './house.entity';
import { User } from './user.entity';

@Entity()
export class Access {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reason: string;

  @Column() // NOTE - The document field is a string because it can be a driver's license, passport, or other form of ID
  document: string;

  @ManyToOne(() => Visitor, (visitor) => visitor.accesses)
  @JoinColumn({ name: 'visitor_id' })
  visitor: Visitor;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.accesses)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => House, (house) => house.accesses)
  @JoinColumn({ name: 'house_id' })
  house: House;

  @CreateDateColumn()
  requested_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  entry_time: Date;

  @Column({ nullable: true })
  exit_time: Date;

  @Column({ nullable: true })
  requested_by: string;

  @Column({ nullable: true })
  approved_by: string;

  @Column({ nullable: true })
  duration: number;

  @AfterUpdate()
  updateDuration() {
    if (this.exit_time !== undefined) {
      const entry = this.entry_time.getTime();
      const exit = this.exit_time.getTime();
      this.duration = exit - entry;
    }
  }
}
