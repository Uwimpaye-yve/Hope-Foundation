import { Injectable } from '@nestjs/common';

@Injectable()
export class AchievementsService {
  private mockAchievements = [
    {
      id: '1',
      title: 'First Week Complete',
      description: 'Completed your first week in the program',
      category: 'milestone',
      points: 50,
      icon: 'star',
      requirement: { type: 'days_active', target: 7 },
      isEarned: true,
      earnedDate: '2024-01-22T00:00:00Z'
    },
    {
      id: '2',
      title: 'Perfect Attendance',
      description: 'Attended all sessions for a month',
      category: 'attendance',
      points: 100,
      icon: 'award',
      requirement: { type: 'attendance_streak', target: 30 },
      isEarned: true,
      earnedDate: '2024-02-15T00:00:00Z'
    },
    {
      id: '3',
      title: 'Champion',
      description: 'Complete 6 months in all programs',
      category: 'milestone',
      points: 200,
      icon: 'trophy',
      requirement: { type: 'program_duration', target: 180 },
      isEarned: false,
      progress: 67
    }
  ];

  async getStudentAchievements(studentId: string) {
    // Mock student progress data
    const studentProgress = {
      daysActive: 45,
      attendanceStreak: 30,
      programDuration: 120,
      volunteerHours: 15,
      gradeImprovement: 1
    };

    return this.mockAchievements.map(achievement => {
      const current = this.getCurrentProgress(achievement.requirement.type, studentProgress);
      const progress = Math.min(100, Math.round((current / achievement.requirement.target) * 100));
      
      return {
        ...achievement,
        requirement: {
          ...achievement.requirement,
          current
        },
        progress: achievement.isEarned ? 100 : progress,
        isEarned: achievement.isEarned || progress >= 100
      };
    });
  }

  async getStudentStats(studentId: string) {
    const achievements = await this.getStudentAchievements(studentId);
    const earnedAchievements = achievements.filter(a => a.isEarned);
    
    return {
      totalAchievements: earnedAchievements.length,
      totalPoints: earnedAchievements.reduce((sum, a) => sum + a.points, 0),
      currentStreak: 12,
      completedPrograms: 2,
      attendanceRate: 95,
      volunteerHours: 15
    };
  }

  async checkAndAwardAchievements(studentId: string, activityType: string, value: number) {
    // This would be called when student completes activities
    // Check if any achievements should be unlocked
    const achievements = await this.getStudentAchievements(studentId);
    const newlyEarned = achievements.filter(a => 
      !a.isEarned && a.progress >= 100
    );
    
    return newlyEarned;
  }

  private getCurrentProgress(type: string, studentProgress: any): number {
    const progressMap: { [key: string]: number } = {
      'days_active': studentProgress.daysActive,
      'attendance_streak': studentProgress.attendanceStreak,
      'program_duration': studentProgress.programDuration,
      'volunteer_hours': studentProgress.volunteerHours,
      'grade_improvement': studentProgress.gradeImprovement
    };
    
    return progressMap[type] || 0;
  }
}