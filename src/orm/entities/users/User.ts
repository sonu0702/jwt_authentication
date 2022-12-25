import bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


import { Role} from './types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  user_uuid: string;

  @Column({
    nullable: true,
  })
  image?: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email?: string;

  @Column({
    nullable: true,
  })
  name?: string;

  @Column({
    nullable: true,
  })
  password?: string;

  @Column({
    nullable: true,
  })
  city?: string;

  @Column({
    default: 'STANDARD' as Role,
    length: 30,
  })
  role: string;

  @Column({
    default: {},
    nullable: false,
    type: 'jsonb',
  })
  additional_data: any;



  @Column({
    default: false,
  })
  isEmailVerified: boolean;

  @Column({
    default: {},
    type: 'jsonb',
  })
  user_preferences: any;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
