import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  private mockDonations = [
    {
      id: '1',
      amount: 100,
      donorName: 'John Smith',
      donorEmail: 'john@example.com',
      message: 'Keep up the great work!',
      status: 'completed',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      amount: 250,
      donorName: 'Sarah Johnson',
      donorEmail: 'sarah@example.com',
      message: 'Happy to support this cause',
      status: 'completed',
      createdAt: new Date('2024-01-10')
    }
  ];

  async create(createDonationDto: CreateDonationDto) {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate payment validation (in real app, integrate with Stripe/PayPal)
    if (createDonationDto.amount < 1) {
      throw new Error('Invalid donation amount');
    }

    const newDonation = {
      id: (this.mockDonations.length + 1).toString(),
      amount: createDonationDto.amount,
      donorName: createDonationDto.donorName,
      donorEmail: createDonationDto.email,
      message: createDonationDto.message || '',
      isRecurring: createDonationDto.isRecurring || false,
      paymentMethod: createDonationDto.paymentMethod || 'card',
      status: createDonationDto.status || 'completed',
      transactionId: `txn_${Date.now()}`,
      createdAt: new Date()
    };
    
    this.mockDonations.push(newDonation);
    
    // Return success response
    return {
      success: true,
      donation: newDonation,
      message: 'Thank you for your generous donation!'
    };
  }

  async findAll() {
    return this.mockDonations;
  }

  async getStats() {
    const totalAmount = this.mockDonations.reduce((sum, donation) => sum + donation.amount, 0);
    const totalDonors = this.mockDonations.length;
    return {
      totalAmount,
      totalDonors,
      averageDonation: Math.round(totalAmount / totalDonors)
    };
  }
}