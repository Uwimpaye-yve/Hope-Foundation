import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', default: 0 })
  enrolled: number;

  @Column({ type: 'int', default: 0 })
  sessionsCompleted: number;

  @Column()
  schedule: string;

  @Column({ default: 'Active' })
  status: string;

  @Column({ type: 'int', nullable: true })
  successRate: number;

  @Column({ type: 'int', nullable: true })
  satisfaction: number;

  @Column({ type: 'int', nullable: true })
  participation: number;

  @ManyToMany(() => Student, (student) => student.programs)
  students: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}