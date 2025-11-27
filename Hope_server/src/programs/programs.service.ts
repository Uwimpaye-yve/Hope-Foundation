import { Injectable } from '@nestjs/common';
import { ApplyProgramDto } from './dto/apply-program.dto';

@Injectable()
export class ProgramsService {
  private applications = [];
  private programs = [
    {
      id: '1',
      title: 'Academic Tutoring',
      description: 'One-on-one tutoring for students struggling with core subjects',
      category: 'education',
      schedule: 'Mon, Wed, Fri',
      maxStudents: 50,
      instructor: 'Dr. Smith',
      studentsEnrolled: 45,
      sessionsCompleted: 120,
      status: 'Active',
    },
    {
      id: '2',
      title: 'Mental Health Support',
      description: 'Professional counseling and emotional support services',
      category: 'mental-health',
      schedule: 'Tue, Thu',
      maxStudents: 40,
      instructor: 'Dr. Johnson',
      studentsEnrolled: 32,
      sessionsCompleted: 85,
      status: 'Active',
    },
  ];

  async createProgram(programData: any) {
    const program = {
      id: Date.now().toString(),
      ...programData,
      studentsEnrolled: 0,
      sessionsCompleted: 0,
      status: 'Active',
    };
    this.programs.push(program);
    return program;
  }

  async getAllPrograms() {
    return this.programs;
  }

  async getProgramById(id: string) {
    return this.programs.find(p => p.id === id);
  }

  async deleteProgram(id: string) {
    this.programs = this.programs.filter(p => p.id !== id);
    return { success: true, message: 'Program deleted successfully' };
  }

  async applyToProgram(applyDto: ApplyProgramDto) {
    const application = {
      id: Date.now().toString(),
      ...applyDto,
      status: 'pending',
      appliedAt: new Date(),
    };
    this.applications.push(application);
    return {
      success: true,
      message: 'Application submitted successfully! We will contact you soon.',
      application,
    };
  }

  async getApplications() {
    return this.applications;
  }

  async getAvailablePrograms() {
    return this.programs.map(p => ({
      id: p.id,
      name: p.title,
      type: p.category,
      description: p.description,
      available: true,
    }));
  }
}
