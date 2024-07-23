import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Visitor, VisitorDocument } from 'src/schemas/visitor.schema';
import { UserService } from '../user/user.service';
import { ComplexService } from '../complex/complex.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { HouseService } from '../house/house.service';
import { CreateVisitorDto } from 'src/shared/dto/visitor/create-visitor.dto';
import { UpdateVisitorDto } from 'src/shared/dto/visitor/update-visitor.dto';
import { User } from 'src/schemas/user.schema';
import { VisitorStatus } from 'src/shared/enum/visitor.enum';

@Injectable()
export class VisitorService {
  constructor(
    @InjectModel(Visitor.name)
    private readonly visitor_model: Model<VisitorDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly user_service: UserService,
    @Inject(forwardRef(() => ComplexService))
    private readonly complex_service: ComplexService,
    @Inject(forwardRef(() => VehicleService))
    private readonly vehicle_service: VehicleService,
    @Inject(forwardRef(() => HouseService))
    private readonly house_service: HouseService,
  ) {}

  async create(
    requester: User,
    dto: CreateVisitorDto,
  ): Promise<VisitorDocument> {
    // 1. Check if the visitor is already in the system
    const existing_visitor = await this.visitor_model.findOne({
      id_number: dto.id_number,
    });

    if (existing_visitor) {
      throw new ConflictException('Visitor already exists');
    }

    // 2. Create custom ObjectId
    const _id = new mongoose.Types.ObjectId();

    // 3. Find host, requested_by, and approved_by in the user collection
    const host = await this.user_service.findUsersHouseOwner(
      requester._id.toString(),
    );
    const requested_by = await this.user_service.findOne(
      requester._id.toString(),
    );
    let approved_by = null;
    let status = VisitorStatus.PENDING;

    if (host._id.toString() === requested_by._id.toString()) {
      approved_by = requested_by;
      status = VisitorStatus.APPROVED;
    }

    // 4. Find complex in the complex collection
    const complex = await this.complex_service.findOne(dto.complex);

    // 5. Find vehicle in the vehicle collection
    const vehicle = await this.vehicle_service.findOne(dto.vehicle);

    // 6. Find house in the house collection
    const house = await this.house_service.findOne(dto.house);

    // 7. Create the visitor
    const visitor = await new this.visitor_model({
      _id,
      ...dto,
      host,
      requested_by,
      approved_by,
      complex,
      vehicle,
      house,
      status,
    }).save();

    // 8. Update the user's visitors
    await this.user_service.addVisitor(
      host._id.toString(),
      visitor._id.toString(),
    );

    // 9. Update the house's visitors
    await this.house_service.addVisitor(dto.house, visitor._id.toString());

    // 10. Update the complex's visitors
    await this.complex_service.addVisitor(dto.complex, visitor._id.toString());

    // 11. Update the vehicle's visitors
    await this.vehicle_service.setOwnerVisitor(
      dto.vehicle,
      visitor._id.toString(),
    );

    return visitor;
  }

  async findAll(): Promise<VisitorDocument[]> {
    return this.visitor_model.find().exec();
  }

  async findOne(id: string): Promise<VisitorDocument> {
    return this.visitor_model.findById(id).exec();
  }

  async update(id: string, dto: UpdateVisitorDto): Promise<VisitorDocument> {
    return this.visitor_model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<VisitorDocument> {
    return this.visitor_model.findByIdAndDelete(id).exec();
  }
}
