import { VehicleDto } from 'src/shared/dto/entities/vehicle.dto';
import { CreateVehicleDto } from 'src/shared/dto/vehicle/create-vehicle.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const create_vehicle: SwaggerOptions = {
  operation: {
    summary: 'Create a new vehicle',
    description: 'Create a new vehicle for a user',
  },
  body: {
    type: CreateVehicleDto,
    description: 'Create vehicle data',
  },
  ok_response: {
    description: 'Vehicle created successfully',
    type: VehicleDto,
  },
};
