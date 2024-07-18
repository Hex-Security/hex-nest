import { HouseDto } from 'src/shared/dto/entities/house.dto';
import { CreateHouseDto } from 'src/shared/dto/house/create-house.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const create_house: SwaggerOptions = {
  operation: {
    description: 'Create a new house',
    summary: 'Create house',
  },
  param: {
    name: 'complex_id',
    description: 'Complex id',
    required: true,
    type: 'string',
  },
  body: {
    description: 'House data',
    required: true,
    type: CreateHouseDto,
  },
  ok_response: {
    description: 'House created successfully',
    type: HouseDto,
  },
};
