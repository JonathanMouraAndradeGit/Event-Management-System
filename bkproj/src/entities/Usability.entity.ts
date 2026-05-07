
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { OneToMany } from "typeorm";
import { Double } from "typeorm/browser";
import { UserE } from "./User.entity";

@Entity()
export class Usability{
    @PrimaryGeneratedColumn()
    id:number;
    @OneToOne(()=>UserE,(u)=>u.usability)
    @JoinColumn()
    user:UserE;
    @Column("double")
    grade:number;
}