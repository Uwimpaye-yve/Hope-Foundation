import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Student } from '../students/entities/student.entity';
import { Program } from '../programs/entities/program.entity';
import { SupportRequest } from '../support-requests/entities/support-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Program, SupportRequest]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}