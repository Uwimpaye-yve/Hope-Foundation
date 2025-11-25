import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { User } from '../../users/entities/user.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @ManyToOne(() => Student, (student) => student.sessions)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column()
  counselorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'counselorId' })
  counselor: User;

  @Column()
  topic: string;

  @Column({ type: 'timestamp' })
  scheduledTime: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ default: 'Scheduled' })
  status: string;

  @Column({ default: 'video' })
  sessionType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}