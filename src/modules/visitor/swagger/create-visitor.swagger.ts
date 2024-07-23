import { VisitorDto } from 'src/shared/dto/entities/visitor.dto';
import { CreateVisitorDto } from 'src/shared/dto/visitor/create-visitor.dto';
import { SwaggerOptions } from 'src/shared/interfaces/swagger-options.interface';

export const create_visitor: SwaggerOptions = {
  operation: {
    summary: 'Create a visitor',
    description: 'Create a visitor',
  },
  body: {
    description: 'Visitor data',
    required: true,
    type: CreateVisitorDto,
  },
  ok_response: {
    description: 'Visitor created successfully',
    type: VisitorDto,
  },
};
