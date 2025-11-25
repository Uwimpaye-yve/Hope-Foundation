export class DashboardStatsDto {
  totalStudents: number;
  activePrograms: number;
  supportRequests: number;
  pendingSupportRequests: number;
  successRate: number;
  studentsGrowth: number;
  successRateGrowth: number;
}

export class StudentListDto {
  id: string;
  name: string;
  age: number;
  programs: number;
  lastActive: string;
  avatar: string;
  avatarColor: string;
}

export class RecentActivityDto {
  id: string;
  title: string;
  description: string;
  time: string;
}

export class ProgramOverviewDto {
  category: string;
  programCount: number;
  studentsEnrolled: number;
  icon: string;
  color: string;
}