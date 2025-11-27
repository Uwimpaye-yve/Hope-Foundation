import { Controller, Put, Body, UseGuards, Request, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('test')
  test() {
    return { message: 'Users controller is working' };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req, @Body() updateData: any) {
    try {
      console.log('Controller - user from JWT:', req.user);
      console.log('Controller - update data:', updateData);
      return await this.usersService.updateProfile(req.user.id, updateData);
    } catch (error) {
      console.error('Controller error:', error);
      throw new HttpException(
        error.message || 'Failed to update profile',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Put('password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(@Request() req, @Body() passwordData: any) {
    try {
      return await this.usersService.updatePassword(req.user.id, passwordData);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update password',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}