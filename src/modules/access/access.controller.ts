import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessService } from './access.service';
import { AccessDto } from './dto/access.dto';

@ApiTags('Access')
@Controller('access')
export class AccessController {
  constructor(private access_service: AccessService) {}

  @Get()
  async findAll() {
    return this.access_service.findAll();
  }

  @Post()
  async createAccess(@Body() dto: AccessDto) {
    return this.access_service.create(dto);
  }

  @Get(':access_id')
  async findOne(@Param('access_id') access_id: string) {
    return this.access_service.findOne(access_id);
  }

  @Post(':access_id/approve')
  async approveAccess(@Param('access_id') access_id: string) {
    return this.access_service.approve(access_id);
  }

  @Post(':access_id/deny')
  async rejectAccess(@Param('access_id') access_id: string) {
    return this.access_service.deny(access_id);
  }

  @Post(':access_id/cancel')
  async cancelAccess(@Param('access_id') access_id: string) {
    return this.access_service.cancel(access_id);
  }

  @Post(':access_id/complete')
  async completeAccess(@Param('access_id') access_id: string) {
    return this.access_service.complete(access_id);
  }
}
