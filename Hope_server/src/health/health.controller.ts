import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('api/health')
export class HealthController {
  constructor(private databaseService: DatabaseService) {}

  @Get()
  async getHealth() {
    try {
      // Test database connection
      await this.databaseService.query('SELECT 1');
      
      return {
        status: 'OK',
        message: 'All systems operational',
        timestamp: new Date().toISOString(),
        database: 'Connected',
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime()
      };
    } catch (error) {
      return {
        status: 'ERROR',
        message: 'System health check failed',
        timestamp: new Date().toISOString(),
        database: 'Disconnected',
        error: error.message
      };
    }
  }

  @Get('ready')
  async getReadiness() {
    try {
      await this.databaseService.query('SELECT 1');
      return { status: 'Ready' };
    } catch (error) {
      throw new Error('Service not ready');
    }
  }

  @Get('live')
  getLiveness() {
    return { status: 'Alive' };
  }
}