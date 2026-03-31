import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserE } from "./User.entity";
import { EventE } from "./Event.entity";

@Entity()
export class EventComments {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    content: string


    @ManyToOne(() => EventComments, (comment) => comment.answers, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'parentId' })
    parent?: EventComments;

    @Column({ nullable: true })
    parentId?: number;

    @OneToMany(() => EventComments, (comment) => comment.parent)
    answers: EventComments[];

    //@ManyToOne(() => EventComments, (e) => e.answers)
    //reply: EventComments

    //@OneToMany(() => EventComments, (e) => e.reply)
    //answers: EventComments[]

    @ManyToOne(() => UserE, (e) => e.comments)
    @JoinColumn()
    user: UserE

    @ManyToOne(() => EventE, (e) => e.eventComments)
    @JoinColumn()
    event: EventE

}