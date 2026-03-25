import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserE } from "./User.entity";
import { EventE } from "./Event.entity";

@Entity()
export class OngUser{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    cnpj:string
    @Column()
    status:boolean
    @Column()
    description:string
    @Column()
    logo:string

    @OneToOne(() => UserE, (user) => user.ondData)
    userData: UserE

    /*
    @OneToOne(()=>UserE,(e)=>e.id)
    userData:UserE*/

    @OneToMany(()=>EventE,(e)=>e.ongE,{cascade:true})
    @JoinColumn()
    events:EventE[]
}