import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ length: 50, nullable: true })
  name: string;

  @Column({ length: 50, nullable: true })
  lastname: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  isActive: boolean;
}
