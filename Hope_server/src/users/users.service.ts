import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async updateProfile(userId: number, updateData: any) {
    console.log('Service - updating profile for user:', userId, updateData);
    return { message: 'Profile updated successfully', data: updateData };
  }

  async updatePassword(userId: number, passwordData: any) {
    const { currentPassword, newPassword } = passwordData;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('Service - updating password for user:', userId);
    return { message: 'Password updated successfully' };
  }
}
