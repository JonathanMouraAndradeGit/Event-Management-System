import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OngUser } from "./Ong.entity";
import { EventComments } from "./EventComments.entity";
import { Volunteer } from "./Volunteer.entity";
@Entity()
export class EventE{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
    @Column()
    description:string
    @Column()
    eventDate:Date
    @Column()
    latlon:string
    @Column()
    display:string
    @Column()
    file:string

    /*
    place:string
    @Column()
    city:string
    @Column()
    state:string*/

    @ManyToOne(()=>OngUser,(e)=>e.events)
    ongE:OngUser

    @OneToMany(()=>EventComments,(evm)=>evm.event)
    eventComments:EventComments[]

    @ManyToMany(() => Volunteer, (e) => e.subscription)
    eventVolunteers: Volunteer[]

}