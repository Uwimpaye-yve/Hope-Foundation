import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SupportRequestsService } from './support-requests.service';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';

@Controller('support-requests')
export class SupportRequestsController {
  constructor(private readonly supportRequestsService: SupportRequestsService) {}

  @Post()
  create(@Body() createSupportRequestDto: CreateSupportRequestDto) {
    return this.supportRequestsService.create(createSupportRequestDto);
  }

  @Get()
  findAll() {
    return this.supportRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportRequestsService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.supportRequestsService.updateStatus(id, body.status);
  }

  @Post(':id/respond')
  respond(@Param('id') id: string, @Body() body: { response: string }) {
    return this.supportRequestsService.respond(id, body.response);
  }

  @Post(':id/email')
  sendEmail(@Param('id') id: string, @Body() body: { subject: string; message: string }) {
    return this.supportRequestsService.sendEmail(id, body.subject, body.message);
  }

  @Get('counselor/:counselorId')
  getCounselorRequests(@Param('counselorId') counselorId: string) {
    return this.supportRequestsService.getCounselorRequests(counselorId);
  }
}