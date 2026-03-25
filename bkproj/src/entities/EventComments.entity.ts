import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserE } from "./User.entity";
import { EventE } from "./Event.entity";

@Entity()
export class EventComments{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    content:string

    @ManyToOne(()=>UserE,(e)=>e.comments)
    @JoinColumn()
    user:UserE

    @ManyToOne(()=>EventE,(e)=>e.eventComments)
    @JoinColumn()
    event:EventE

}