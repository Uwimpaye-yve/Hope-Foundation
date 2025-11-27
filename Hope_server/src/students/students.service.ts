import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  private students = [];

  async create(createStudentDto: CreateStudentDto): Promise<any> {
    const student = { id: Date.now().toString(), ...createStudentDto, programs: 0, lastActive: new Date().toISOString() };
    this.students.push(student);
    return student;
  }

  async findAll(): Promise<any[]> {
    return this.students;
  }

  async findOne(id: string): Promise<any> {
    return this.students.find(s => s.id === id) || { id };
  }

  async findByUserId(userId: string): Promise<any> {
    return this.students.find(s => s.userId === userId) || { userId };
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<any> {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updateStudentDto };
      return this.students[index];
    }
    return { id, ...updateStudentDto };
  }

  async remove(id: string): Promise<void> {
    this.students = this.students.filter(s => s.id !== id);
  }

  async getStats(): Promise<any> {
    return {
      totalStudents: this.students.length,
      activePrograms: 15,
      supportRequests: 0,
      successRate: 50
    };
  }

  addStudent(user: any): void {
    const student = {
      id: user.id,
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      age: 0,
      programs: 0,
      lastActive: new Date().toISOString(),
      avatar: user.firstName.charAt(0).toUpperCase(),
      avatarColor: 'bg-orange-400'
    };
    this.students.push(student);
  }
}