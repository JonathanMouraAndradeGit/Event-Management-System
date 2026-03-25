import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { role } from "./roles";
import { UserE } from "./User.entity";

@Entity()
export class RolesE{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    typeRole:role;

    @ManyToMany(()=>UserE,(u)=>u.userRole)
    @JoinColumn()
    users:UserE[]
}