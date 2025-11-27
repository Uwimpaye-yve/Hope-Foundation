import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  async create(@Body() createDonationDto: CreateDonationDto) {
    try {
      return await this.donationsService.create(createDonationDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Payment processing failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.donationsService.getStats();
  }
}