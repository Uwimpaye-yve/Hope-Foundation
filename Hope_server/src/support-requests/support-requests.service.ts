import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { SupportRequest } from './entities/support-request.entity';

@Injectable()
export class SupportRequestsService {
  constructor(
    @InjectRepository(SupportRequest)
    private supportRequestsRepository: Repository<SupportRequest>,
  ) {}

  async create(createSupportRequestDto: CreateSupportRequestDto): Promise<SupportRequest> {
    const supportRequest = new SupportRequest();
    Object.assign(supportRequest, createSupportRequestDto);
    supportRequest.status = createSupportRequestDto.status || 'Pending';
    
    return await this.supportRequestsRepository.save(supportRequest);
  }

  async findAll(): Promise<SupportRequest[]> {
    return await this.supportRequestsRepository.find({
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<SupportRequest | null> {
    return await this.supportRequestsRepository.findOne({
      where: { id },
      relations: ['student'],
    });
  }

  async updateStatus(id: string, status: string): Promise<SupportRequest | null> {
    await this.supportRequestsRepository.update(id, { status });
    return this.findOne(id);
  }
}