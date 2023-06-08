import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";


@Entity()
export class UserAccountDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountNumber: string;

  @Column()
  isActive: boolean;

  @Column()
  balance: number;

  @ManyToOne(() => User, (user) => user.userAccountDetails)
  @JoinColumn({ name: "user_account_id" })
  user: User;
}