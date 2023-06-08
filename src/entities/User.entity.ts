import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { UserAccountDetails } from "./userAccount.entity";


@Entity()
export class User extends BaseEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string


    @Column()
    name: string

    @Column()
    age: number


    @OneToMany(()=>UserAccountDetails, (userAccountDetails)=>userAccountDetails.user)
    userAccountDetails: UserAccountDetails[]
}


