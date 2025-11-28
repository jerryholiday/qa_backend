import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { Answer } from './answer.entity';

@Entity()
export class TestResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  userId: string;

  @Column()
  totalScore: number;

  @Column({ type: 'text', nullable: true })
  resultText: string;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.testResults)
  questionnaire: Questionnaire;

  @OneToMany(() => Answer, (answer) => answer.testResult)
  answers: Answer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
