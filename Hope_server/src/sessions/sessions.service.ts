import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async getCounselorSessions(counselorId: string) {
    return this.sessionRepository.find({
      where: { counselorId },
      relations: ['student', 'counselor'],
      order: { scheduledTime: 'ASC' },
    });
  }

  async createSession(data: any) {
    const session = this.sessionRepository.create(data);
    return this.sessionRepository.save(session);
  }

  async updateSession(id: string, data: any) {
    await this.sessionRepository.update(id, data);
    return this.sessionRepository.findOne({ where: { id }, relations: ['student', 'counselor'] });
  }

  async addNote(id: string, notes: string) {
    await this.sessionRepository.update(id, { notes });
    return this.sessionRepository.findOne({ where: { id } });
  }

  async rescheduleSession(id: string, scheduledTime: Date) {
    await this.sessionRepository.update(id, { scheduledTime });
    return this.sessionRepository.findOne({ where: { id } });
  }

  async updateStatus(id: string, status: string) {
    await this.sessionRepository.update(id, { status });
    return this.sessionRepository.findOne({ where: { id } });
  }

  async getSessionById(id: string) {
    const session = await this.sessionRepository.findOne({ 
      where: { id }, 
      relations: ['student', 'counselor'] 
    });
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }
}
