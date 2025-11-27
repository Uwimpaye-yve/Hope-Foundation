const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'attendance' | 'academic' | 'participation' | 'milestone' | 'community';
  points: number;
  icon: string;
  requirement: {
    type: string;
    target: number;
    current?: number;
  };
  earnedDate?: string;
  isEarned: boolean;
  progress: number;
}

export interface StudentStats {
  totalAchievements: number;
  totalPoints: number;
  currentStreak: number;
  completedPrograms: number;
  attendanceRate: number;
  volunteerHours: number;
}

export const achievementsService = {
  async getStudentAchievements(studentId: string): Promise<Achievement[]> {
    // Mock achievements - replace with real API call
    return [
      {
        id: "1",
        title: "First Week Complete",
        description: "Completed your first week in the program",
        category: "milestone",
        points: 50,
        icon: "star",
        requirement: { type: "days_active", target: 7, current: 7 },
        earnedDate: "2024-01-22",
        isEarned: true,
        progress: 100
      },
      {
        id: "2", 
        title: "Perfect Attendance",
        description: "Attended all sessions for a month",
        category: "attendance",
        points: 100,
        icon: "award",
        requirement: { type: "attendance_streak", target: 30, current: 30 },
        earnedDate: "2024-02-15",
        isEarned: true,
        progress: 100
      },
      {
        id: "3",
        title: "Helping Hand",
        description: "Completed 10 hours of community service",
        category: "community",
        points: 75,
        icon: "heart",
        requirement: { type: "volunteer_hours", target: 10, current: 10 },
        earnedDate: "2024-03-08",
        isEarned: true,
        progress: 100
      },
      {
        id: "4",
        title: "Quick Learner",
        description: "Improved grade by one letter in any subject",
        category: "academic",
        points: 80,
        icon: "zap",
        requirement: { type: "grade_improvement", target: 1, current: 1 },
        earnedDate: "2024-03-20",
        isEarned: true,
        progress: 100
      },
      {
        id: "5",
        title: "Champion",
        description: "Complete 6 months in all programs",
        category: "milestone",
        points: 200,
        icon: "trophy",
        requirement: { type: "program_duration", target: 180, current: 120 },
        isEarned: false,
        progress: 67
      },
      {
        id: "6",
        title: "Mentor",
        description: "Help another student succeed",
        category: "participation",
        points: 150,
        icon: "users",
        requirement: { type: "peer_help", target: 1, current: 0 },
        isEarned: false,
        progress: 0
      }
    ];
  },

  async getStudentStats(studentId: string): Promise<StudentStats> {
    // Mock stats - replace with real API call
    return {
      totalAchievements: 4,
      totalPoints: 305,
      currentStreak: 12,
      completedPrograms: 2,
      attendanceRate: 95,
      volunteerHours: 15
    };
  },

  async checkForNewAchievements(studentId: string, activity: string, value: number) {
    // This would be called when student completes activities
    // Returns any newly earned achievements
    console.log(`Checking achievements for ${activity}: ${value}`);
    return [];
  }
};