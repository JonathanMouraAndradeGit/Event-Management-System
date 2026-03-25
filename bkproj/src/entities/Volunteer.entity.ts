import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventComments } from "./EventComments.entity";
import { EventE } from "./Event.entity";
import { UserE } from "./User.entity";
@Entity()
export class Volunteer{
    @PrimaryGeneratedColumn()
    id:number

    @OneToOne(() => UserE, (user) => user.volunData)
    userD: UserE

    @ManyToMany(() => EventE, (e) => e.eventVolunteers, { cascade: true })
    @JoinTable()
    subscription: EventE[]
    /*
    @OneToMany(()=>EventComments,(evc)=>evc.id)
    @JoinColumn()
    comments:EventComments[]
    */
}