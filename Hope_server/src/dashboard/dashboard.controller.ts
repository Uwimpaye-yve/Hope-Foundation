import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard) // Protect all dashboard routes
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats() {
    return this.dashboardService.getDashboardStats();
  }

  @Get('students')
  async getStudents(
    @Query('search') search?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.dashboardService.getStudentsList(
      search,
      limit ? parseInt(limit.toString()) : 10,
      offset ? parseInt(offset.toString()) : 0,
    );
  }

  @Get('activities')
  async getActivities(@Query('limit') limit?: number) {
    return this.dashboardService.getRecentActivities(
      limit ? parseInt(limit.toString()) : 5,
    );
  }

  @Get('programs/overview')
  async getProgramsOverview() {
    return this.dashboardService.getProgramOverview();
  }
}