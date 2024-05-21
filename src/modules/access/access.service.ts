import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/shared/enum/status.enum';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Access } from '../entity/entities/access.entity';
import { House } from '../entity/entities/house.entity';
import { User } from '../entity/entities/user.entity';
import { Vehicle } from '../entity/entities/vehicle.entity';
import { Visitor } from '../entity/entities/visitor.entity';
import { HouseService } from '../house/house.service';
import { UserService } from '../user/user.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { VisitorService } from '../visitor/visitor.service';
import { AccessDto } from './dto/access.dto';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access) private access_repo: Repository<Access>,
    private readonly user_service: UserService,
    private readonly visitor_service: VisitorService,
    private readonly house_service: HouseService,
    private readonly vehicle_service: VehicleService,
  ) {}

  async findAll(): Promise<Access[]> {
    return this.access_repo.find();
  }

  async findOne(access_id: string): Promise<Access> {
    return this.access_repo.findOne({ where: { id: access_id } });
  }

  async findMany(access_ids: string[]): Promise<Access[]> {
    return this.access_repo.find({ where: { id: In(access_ids) } });
  }

  async create(dto: AccessDto): Promise<Access> {
    // 1. Validate that no other access request is pending for the same visitor
    const pending_access: Access | null = await this.access_repo.findOne({
      where: { visitor_id: dto.visitor_id, status: Status.PENDING },
      relations: ['visitor'],
    });

    if (pending_access) {
      throw new ConflictException(
        `There is already a pending access request for visitor ${pending_access.visitor.name} ${pending_access.visitor.lname}`,
      );
    }

    // 2. Create the access request
    const {
      approver_id,
      document,
      house_id,
      reason,
      requested_at,
      requester_id,
      status,
      vehicle_id,
      visitor_id,
    } = dto;

    // 2.1. Validate that the approver, requester, visitor, house, and vehicle exist
    // 2.1.1 Validate Approver
    const approver: User | null = await this.user_service.findOne(approver_id);

    if (!approver) {
      throw new NotFoundException(`User with ID ${approver_id} does not exist`);
    }

    // 2.1.2 Validate Requester
    const requester: User | null =
      await this.user_service.findOne(requester_id);

    if (!requester) {
      throw new NotFoundException(
        `User with ID ${requester_id} does not exist`,
      );
    }

    // 2.1.3 Validate Visitor
    const visitor: Visitor | null =
      await this.visitor_service.findOne(visitor_id);

    if (!visitor) {
      throw new NotFoundException(
        `Visitor with ID ${visitor_id} does not exist`,
      );
    }

    // 2.1.4 Validate House
    const house: House | null = await this.house_service.findOne(house_id);

    if (!house) {
      throw new NotFoundException(`House with ID ${house_id} does not exist`);
    }

    // 2.1.5 Validate Vehicle
    const vehicle: Vehicle | null =
      await this.vehicle_service.findOne(vehicle_id);

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with ID ${vehicle_id} does not exist`,
      );
    }

    // 2.2 Create the access request
    // 2.2.1 Determine whether the requester in user is the approver
    const owned_house: House | null =
      await this.house_service.findOneByOwner(requester_id);

    const access: Access = this.access_repo.create({
      approver,
      document,
      house,
      reason,
      requested_at: requested_at || new Date(),
      requester,
      status: owned_house ? Status.APPROVED : Status.PENDING,
      vehicle,
      visitor,
    });

    const saved_access: Access = await this.access_repo.save(access);

    return saved_access;
  }

  async update(
    access_id: string,
    dto: Partial<AccessDto>,
  ): Promise<UpdateResult> {
    return this.access_repo.update(access_id, { ...dto });
  }

  async delete(access_id: string): Promise<DeleteResult> {
    return this.access_repo.delete(access_id);
  }

  async deleteMany(access_ids: string[]): Promise<DeleteResult> {
    return this.access_repo.delete(access_ids);
  }

  async findPending(): Promise<Access[]> {
    return this.access_repo.find({ where: { status: Status.PENDING } });
  }

  async findApproved(): Promise<Access[]> {
    return this.access_repo.find({ where: { status: Status.APPROVED } });
  }

  async findDenied(): Promise<Access[]> {
    return this.access_repo.find({ where: { status: Status.DENIED } });
  }

  async findExpired(): Promise<Access[]> {
    return this.access_repo.find({ where: { status: Status.EXPIRED } });
  }

  async findByStatus(status: Status): Promise<Access[]> {
    return this.access_repo.find({ where: { status } });
  }

  async approve(access_id: string): Promise<UpdateResult> {
    return this.access_repo.update(access_id, { status: Status.APPROVED });
  }

  async deny(access_id: string): Promise<UpdateResult> {
    return this.access_repo.update(access_id, { status: Status.DENIED });
  }

  async complete(access_id: string): Promise<UpdateResult> {
    return this.access_repo.update(access_id, { status: Status.COMPLETED });
  }

  async cancel(access_id: string): Promise<UpdateResult> {
    return this.access_repo.update(access_id, { status: Status.CANCELLED });
  }

  async expire(access_id: string): Promise<UpdateResult> {
    return this.access_repo.update(access_id, { status: Status.EXPIRED });
  }

  async findByRequesterAndStatus(
    requester_id: string,
    status: Status,
  ): Promise<Access[]> {
    return this.access_repo.find({ where: { requester_id, status } });
  }

  async findByApproverAndStatus(
    approver_id: string,
    status: Status,
  ): Promise<Access[]> {
    return this.access_repo.find({ where: { approver_id, status } });
  }

  async findByVisitorAndStatus(
    visitor_id: string,
    status: Status,
  ): Promise<Access[]> {
    return this.access_repo.find({ where: { visitor_id, status } });
  }

  async findByHouseAndStatus(
    house_id: string,
    status: Status,
  ): Promise<Access[]> {
    return this.access_repo.find({ where: { house_id, status } });
  }

  async findByVehicleAndStatus(
    vehicle_id: string,
    status: Status,
  ): Promise<Access[]> {
    return this.access_repo.find({ where: { vehicle_id, status } });
  }

  async findByRequester(requester_id: string): Promise<Access[]> {
    return this.access_repo.find({ where: { requester_id } });
  }

  async findByApprover(approver_id: string): Promise<Access[]> {
    return this.access_repo.find({ where: { approver_id } });
  }

  async findByVisitor(visitor_id: string): Promise<Access[]> {
    return this.access_repo.find({ where: { visitor_id } });
  }

  async findByHouse(house_id: string): Promise<Access[]> {
    return this.access_repo.find({ where: { house_id } });
  }

  async findByVehicle(vehicle_id: string): Promise<Access[]> {
    return this.access_repo.find({ where: { vehicle_id } });
  }

  async findByComplex(complex_id: string): Promise<Access[]> {
    return this.access_repo.find({
      where: { house: { complex: { id: complex_id } } },
      relations: ['house'],
    });
  }
}
