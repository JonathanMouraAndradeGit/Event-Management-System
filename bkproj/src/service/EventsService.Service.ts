import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { title } from "process";
import { EventCommentsDTO } from "src/entities/DTO/EventComments";
import { EventDTO } from "src/entities/DTO/EventDTO";
import { EventE } from "src/entities/Event.entity";
import { EventComments } from "src/entities/EventComments.entity";
import { OngUser } from "src/entities/Ong.entity";
import { UserE } from "src/entities/User.entity";
import { Volunteer } from "src/entities/Volunteer.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventService {
    constructor(@InjectRepository(EventE) private event: Repository<EventE>,
        @InjectRepository(OngUser) private ong: Repository<OngUser>,
        @InjectRepository(EventComments) private eventC: Repository<EventComments>,
        @InjectRepository(UserE) private usrE: Repository<UserE>,
        @InjectRepository(Volunteer) private injectValunteer: Repository<Volunteer>
    ) {

    }
    async subscribe(idUser: number, idEvent: number) {
        try {
            const user = await this.usrE.findOne({
                where: { id: idUser },
                relations: ["volunData", "volunData.subscription"]
            });

            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            if (!user.volunData) {
                throw new Error("Usuário não é voluntário");
            }

            const event = await this.event.findOneBy({ id: idEvent });

            if (!event) {
                throw new Error("Evento não encontrado");
            }

            if (!user.volunData.subscription) {
                user.volunData.subscription = [];
            }

            const alreadySubscribed = user.volunData.subscription.some(
                (e) => e.id === event.id
            );

            if (alreadySubscribed) {
                throw new Error("Usuário já inscrito neste evento");
            }

            user.volunData.subscription.push(event);

            await this.injectValunteer.save(user.volunData);

            return { message: "Usuário inscrito com sucesso" };

        } catch (e: any) {
            console.error(e);
            return { essagerror: e.message };
        }
    }
    async unsubscribe(idUser: number, idEvent: number) {
        try {
            const user = await this.usrE.findOne({
                where: { id: idUser },
                relations: ["volunData", "volunData.subscription"]
            });

            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            if (!user.volunData) {
                throw new Error("Usuário não é voluntário");
            }

            if (!user.volunData.subscription || user.volunData.subscription.length === 0) {
                throw new Error("Usuário não está inscrito em nenhum evento");
            }

            const event = await this.event.findOneBy({ id: idEvent });

            if (!event) {
                throw new Error("Evento não encontrado");
            }

            const isSubscribed = user.volunData.subscription.some(
                (e) => e.id === idEvent
            );

            if (!isSubscribed) {
                throw new Error("Usuário não está inscrito neste evento");
            }

            user.volunData.subscription = user.volunData.subscription.filter(
                (e) => e.id !== idEvent
            );

            await this.injectValunteer.save(user.volunData);

            return { message: "Usuário removido do evento com sucesso" };

        } catch (e: any) {
            console.error(e);
            return { messagerror: e.message };
        }
    }
    async getAllVolunteers(idEvent:number){
        try{
            let event:any = await this.event.findOneBy({id:idEvent})
            if(!event){
                throw new Error("Evento não encontrado");
            }
            let result = await this.injectValunteer.find({where:{subscription:event},relations:["userD"]})
            console.log(result)
            return result
        }catch(e){
            console.error(e);
            return { messagerror: "Erro ao buscar usuários" };
        }
    }
    async getAllEventsSubscription(id:number){
        try{
            let obj:any = await this.usrE.findOne({where:{id:id},relations:["volunData"]})
            if(!obj){
                throw new Error("usuário nao encontrado")
            }
            console.log("the obj is")
            console.log(obj)
            let evetns:any =  await this.injectValunteer.findOne({where:{id:obj.volunData.id},relations:["subscription"]})
            if(!evetns){
                throw new Error("eventos nao encontrado")
            }
            return evetns.subscription
        }catch(e){
            console.error(e);
            return { messagerror: "Erro ao buscar inscricoes" };
        }
    }
    async isVolunteerInEvent(idEvent:number,idusr:number){
        try{
            let usrInfo:any = await this.usrE.findOne({where:{id:idusr},relations:["volunData"]})
            let event:any = await this.event.findOneBy({id:idEvent})
            if(!usrInfo){
                throw new Error("usuário não encontrado");
            }
            if(!event){
                throw new Error("Evento não encontrado");
            }
            let result = await this.injectValunteer.find({where:{subscription:event,userD:usrInfo},relations:["userD"]})
            //console.log("the result is -------------------------------------")
            //console.log(result)
            //console.log("end is here ------------------------")
            if(result && result[0]){
                return {subscribe:true}
            }else{
                return {subscribe:false}
            }
        }catch(e){
            console.error(e);
            return { messagerror: "Erro ao buscar usuários" };
        }
    }
    /*
    async subscribe(idUser:number,idEvent:number){
        try{
            let res:any = await this.usrE.find({where:{id:idUser},relations:["volunData"]})
            let event:any = await this.event.findOneBy({id:idEvent})
            if(!event){
                throw new Error("event não encontrado")
            }
            if(res.length > 0){
                res = res[0]
                if(res.volunData){
                    res.volunData.subscription.push(event)
                    await this.injectValunteer.save(res.volunData)
                    return {message:"usuário inscrito com sucesso"}
                }else{
                    throw new Error("Usuário não é voluntário")    
                }
            }else{
                throw new Error("Usuário não encontrado")
            }
        }catch(e){
            return {message:"erro ao realizar inscrição"}
        }
    }*/
    
    async insertEvents(ev: EventDTO, ongId) {
        try {
            let ong: any = await this.ong.findOneBy({ id: ongId }) //await this.ong.findOneBy({id:ev.id})
            let obj: any = this.event.create({
                title: ev.title, description: ev.description,
                eventDate: ev.eventDate,
                latlon: ev.latlon,
                display: ev.display,
                file: ev.file,
                /*
                place:ev.place,
                city:ev.city,
                state:ev.state,*/

                ongE: ong,
                eventComments: [],
                eventVolunteers: []
            })
            obj = this.event.save(obj)
            return obj
        } catch (e) {
            return { messageerr: "error" }
        }
    }
    async updateEvents(ev: EventDTO) {
        try {
            //let ong:any = await this.ong.findOneBy({id:ongId}) //await this.ong.findOneBy({id:ev.id})
            let event: any = await this.event.findOneBy({ id: ev.id });
            if (!event) {
                return { messageerr: "Evento não encontrado" };
            }
            event.title = ev.title ?? event.title;
            event.description = ev.description ?? event.description;
            event.eventDate = ev.eventDate ?? event.eventDate;
            event.latlon = ev.latlon ?? event.latlon;
            event.display = ev.display ?? event.display;
            event.file = ev.file ?? event.file;

            const updatedEvent = await this.event.save(event);

            /*
            let obj: any = this.event.create({
                title: ev.title, description: ev.description,
                eventDate: ev.eventDate,
                latlon: ev.latlon,
                display: ev.display,
                ongE: ong,
                eventComments: []
            })
            obj = this.event.save(obj)*/
            return updatedEvent
        } catch (e) {
            return { messageerr: "error" }
        }
    }

    async activeOngEvents(ongId: number, date: Date) {
        try {
            let ong: any = await this.ong.findOneBy({ id: ongId })
            let events: any = await this.event.find({ where: { ongE: ong, } })
            events = events.map((el: any, i) => {
                let dt1 = new Date(date)
                let dt2 = new Date(el.eventDate)
                return dt1 < dt2 ? el : null
            })
            return events
        } catch (e) {
            return { messageerr: "erro ao buscar ong" }
        }
    }
    async inaactiveOngEvents(ongId: number, date: Date) {
        try {
            let ong: any = await this.ong.findOneBy({ id: ongId })
            let events: any = await this.event.find({ where: { ongE: ong, } })
            events = events.map((el: any, i) => {
                let dt1 = new Date(date)
                let dt2 = new Date(el.eventDate)
                return dt1 > dt2 ? el : null
            })
            return events
        } catch (e) {
            return { messageerr: "erro ao buscar ong" }
        }
    }
    async OngEvent(ongId: number) {
        try {
            let ong: any = await this.ong.findOneBy({ id: ongId })
            let events = await this.event.find({ where: { ongE: ong } })
            return events
        } catch (e) {
            return { messageerr: "erro ao buscar ong" }
        }
    }
    async insertComment(obj: EventCommentsDTO) {
        try {
            console.log("insertig")
            console.log(obj)
            let userRef: any = await this.getUser(obj.user)
            let eventRef: any = await this.getEvent(obj.event)
            let result: any = this.eventC.create({ content: obj.content, user: userRef, event: eventRef })
            result = this.eventC.save(result)
            return result
        } catch (e) {
            console.log(e)
            return { messageerr: "erro ao inserir Comment" }
        }
    }

    async getEvent(id: number) {
        try {
            let eventinfo = await this.event.findOneBy({ id: id })
            return eventinfo
        } catch (e) {
            return new Error("Evento não encontrado")
        }
    }
    async getUser(id: number) {
        try {
            let userinfo = await this.usrE.findOneBy({ id: id })
            console.log("found user is")
            console.log(userinfo)
            return userinfo
        } catch (e) {
            return new Error("usuário não encontrado")
        }
    }

    async getAllEvent() {
        try {
            let usrAll = await this.event.find()
            return usrAll
        } catch (e) {
            return { messageerr: "nao foi possivel obter usuários" }
        }
    }
    async getEventById(idEvent) {
        try {
            let usrAll = await this.event.find({ where: { id: idEvent }, relations: ['ongE'] })//findOneBy({id:id})
            let first = usrAll[0]
            console.log("this is the result res of event id")
            console.log(first)
            let result = await this.ong.find({ where: { id: first.ongE.id }, relations: ['userData'] })
            let { ongE, ...event } = first
            let { id, userData, events, ...ong } = ongE
            let { name, ...val } = result[0].userData
            let fullobj = { event, ong, name: name,photo:val.file }
            return fullobj//result[0]
        } catch (e) {
            return { messageerr: "nao foi possivel obter usuários" }
        }
    }

    async deleteEvent(id: number) {
        try {
            await this.deleteAllEventComments(id)
            await this.event.delete({ id: id })
            return { message: "deletado com sucesso" }
        } catch (e) {
            return { messageerr: "erro ao deletar" }
        }
    }
    async deleteEventComment(id: number) {
        try {
            let delres = await this.eventC.delete({ id: id })
            return { message: "comentário deletado" }
        } catch (e) {
            return { messageerr: "erro ao deletar comentário" }
        }
    }
    async deleteAllEventComments(id: number) {
        try {
            let res: any = await this.event.findOneBy({ id: id })
            let delres = await this.eventC.delete({ event: res })
            return { message: "deletado com sucesso" }
        } catch (e) {
            return { messageerr: "erro ao deletar" }
        }
    }
    async getAllComments() {
        try {
            return this.eventC.find()
        } catch (e) {
            return { messageerr: "erro ao obter comentários" }
        }
    }
}