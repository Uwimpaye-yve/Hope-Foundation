import { Injectable } from '@nestjs/common';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';

@Injectable()
export class SupportRequestsService {
  private requests = [];

  async create(createSupportRequestDto: CreateSupportRequestDto): Promise<any> {
    const request = {
      id: Date.now().toString(),
      ...createSupportRequestDto,
      status: createSupportRequestDto.status || 'Pending',
      createdAt: new Date().toISOString(),
      response: null,
    };
    this.requests.push(request);
    return request;
  }

  async findAll(): Promise<any[]> {
    return this.requests;
  }

  async findOne(id: string): Promise<any | null> {
    return this.requests.find(r => r.id === id) || null;
  }

  async updateStatus(id: string, status: string): Promise<any | null> {
    const request = this.requests.find(r => r.id === id);
    if (request) {
      request.status = status;
      return request;
    }
    return null;
  }

  async respond(id: string, response: string): Promise<any | null> {
    const request = this.requests.find(r => r.id === id);
    if (request) {
      request.response = response;
      request.status = 'Resolved';
      request.respondedAt = new Date().toISOString();
      return request;
    }
    return null;
  }

  async sendEmail(id: string, subject: string, message: string): Promise<any | null> {
    const request = this.requests.find(r => r.id === id);
    if (request) {
      request.emailSent = true;
      request.emailSubject = subject;
      request.emailMessage = message;
      request.emailSentAt = new Date().toISOString();
      return { success: true, message: 'Email sent successfully', request };
    }
    return null;
  }

  async getCounselorRequests(counselorId: string): Promise<any[]> {
    return this.requests.filter(r => r.counselorId === counselorId || r.status === 'Pending');
  }
}