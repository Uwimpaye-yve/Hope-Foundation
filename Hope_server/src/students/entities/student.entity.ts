import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Program } from 'src/programs/entities/program.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { SupportRequest } from 'src/support-requests/entities/support-request.entity';
import { User } from '../../users/entities/user.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  age: number;

  @Column({ type: 'date' })
  joinDate: Date;

  @Column({ default: 'Active' })
  status: string;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Column({ default: 'medium priority' })
  priority: string;

  @ManyToMany(() => Program, (program) => program.students)
  @JoinTable()
  programs: Program[];

  @OneToMany(() => Session, (session) => session.student)
  sessions: Session[];

  @OneToMany(() => SupportRequest, (request) => request.student)
supportRequests: SupportRequest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}