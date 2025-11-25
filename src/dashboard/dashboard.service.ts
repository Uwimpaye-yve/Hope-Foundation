import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  // ✅ Stats for dashboard
  async getDashboardStats() {
    return {
      totalStudents: 120,
      activePrograms: 5,
      recentEnrollments: 14,
    };
  }

  // ✅ Students list with optional search, limit & offset
  async getStudentsList(
    search: string = '',
    limit: number = 10,
    offset: number = 0,
  ) {
    return {
      search,
      limit,
      offset,
      students: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Yvette Uwimpaye' },
      ],
    };
  }

  // ✅ Recent activities
  async getRecentActivities(limit: number = 5) {
    return {
      limit,
      activities: [
        { id: 1, action: 'New enrollment', timestamp: new Date() },
        { id: 2, action: 'Program updated', timestamp: new Date() },
      ],
    };
  }

  // ✅ Program overview
  async getProgramOverview() {
    return {
      programs: [
        { id: 1, name: 'Software Engineering', studentCount: 40 },
        { id: 2, name: 'Cybersecurity', studentCount: 30 },
      ],
    };
  }
}
