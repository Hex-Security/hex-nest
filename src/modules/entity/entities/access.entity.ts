import { Status } from 'src/shared/enum/status.enum';
import {
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { House } from './house.entity';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';

@Entity('access')
export class Access {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reason: string;

  @Column() // NOTE - The document field is a string because it can be a driver's license, passport, or other form of ID
  document: string;

  @Column({
    enum: Status,
    default: Status.PENDING,
    nullable: false,
    type: 'enum',
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.approved_accesses)
  @JoinColumn({ name: 'approver_id' })
  approver: User;

  @Column({ nullable: true })
  approver_id: string;

  @Column()
  visitor_id: string;

  @ManyToOne(() => User, (user) => user.visitor_accesses)
  @JoinColumn({ name: 'visitor_id' })
  visitor: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.accesses)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column({ nullable: true })
  vehicle_id: string;

  @ManyToOne(() => House, (house) => house.accesses)
  @JoinColumn({ name: 'house_id' })
  house: House;

  @Column()
  house_id: string;

  @CreateDateColumn()
  requested_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  entry_time: Date;

  @Column({ nullable: true })
  exit_time: Date;

  @ManyToOne(() => User, (user) => user.requested_accesses)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @Column()
  requester_id: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  guard_id: string;

  @ManyToOne(() => User, (user) => user.guard_accesses)
  @JoinColumn({ name: 'guard_id' })
  guard: User;

  @AfterUpdate()
  updateDuration() {
    if (this.exit_time !== undefined) {
      const entry = this.entry_time.getTime();
      const exit = this.exit_time.getTime();
      this.duration = exit - entry;
    }
  }
}
