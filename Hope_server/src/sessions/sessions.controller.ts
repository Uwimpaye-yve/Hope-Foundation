import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSessionDto, UpdateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get('counselor')
  async getCounselorSessions(@Request() req) {
    return this.sessionsService.getCounselorSessions(req.user.userId);
  }

  @Post()
  async createSession(@Body() data: CreateSessionDto, @Request() req) {
    return this.sessionsService.createSession({ ...data, counselorId: req.user.userId });
  }

  @Put(':id')
  async updateSession(@Param('id') id: string, @Body() data: any) {
    return this.sessionsService.updateSession(id, data);
  }

  @Put(':id/notes')
  async addNote(@Param('id') id: string, @Body() body: { notes: string }) {
    return this.sessionsService.addNote(id, body.notes);
  }

  @Put(':id/reschedule')
  async rescheduleSession(@Param('id') id: string, @Body() body: { scheduledTime: Date }) {
    return this.sessionsService.rescheduleSession(id, body.scheduledTime);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.sessionsService.updateStatus(id, body.status);
  }

  @Get(':id')
  async getSession(@Param('id') id: string) {
    return this.sessionsService.getSessionById(id);
  }
}
