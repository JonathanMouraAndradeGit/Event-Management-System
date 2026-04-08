import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolesE } from "./Roles.entity";
import { OngUser } from "./Ong.entity";
import { EventComments } from "./EventComments.entity";
import { Volunteer } from "./Volunteer.entity";
@Entity()
export class UserE {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    file:string;
    @ManyToMany(() => RolesE, (e) => e.users, { cascade: true })
    @JoinTable()
    userRole: RolesE[]

    @OneToOne(() => OngUser, (ong) => ong.userData, { cascade: true })
    @JoinColumn()
    ondData: OngUser

    @OneToMany(() => EventComments, (e) => e.user, { cascade: true })
    comments: EventComments[]

    @OneToOne(() => Volunteer, (v) => v.userD, { cascade: true })
    @JoinColumn()
    volunData: Volunteer
}