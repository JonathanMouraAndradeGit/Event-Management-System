import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/entities/DTO/UserDTO";
import { OngUser } from "src/entities/Ong.entity";
import { RolesE } from "src/entities/Roles.entity";
import { UserE } from "src/entities/User.entity";
import { Repository } from "typeorm";
import { role } from "src/entities/roles";
import { OngDTO } from "src/entities/DTO/OngDTO";
import { UserServ } from "./userServ.service";
@Injectable()

export class OngService {
    constructor(@InjectRepository(OngUser) private onge: Repository<OngUser>,
        @InjectRepository(UserE) private userRep: Repository<UserE>,
        @InjectRepository(RolesE) private roleRep: Repository<RolesE>,
        private userServ: UserServ) {

    }
    async getOngByUserName(name: string) {
        try {
            let res = await this.userRep.find({ where: { name: name }, relations: ['ondData'] })
            if (res.length > 0) {
                return res[0]
            } else {
                throw new Error("usuário não encontrado")
            }
        } catch (e) {
            console.log(e)
            return { messageerr: "erro ao buscar ong usuário" }
        }
    }
    /*async insertOng(obj: UserDTO) {
    try {

        const rol = await this.roleRep.findOneBy({
            typeRole: role[obj.role]
        })

        if (!rol) {
            throw new Error("Role não encontrada")
        }

        const arrRols: RolesE[] = [rol]

        let usr: any = this.userRep.create({
            name: obj.name,
            password: obj.password,
            userRole: arrRols,
            comments: []
        })
        usr = await this.userRep.save(usr)

        const onc = this.createOng(obj.ongData, usr)

        usr.ondData = onc

        usr = await this.userRep.save(usr)

        return usr

    } catch (e) {
        console.log(e)
        return { messageerr: "erro ao inserir ong usuário" }
    }
    }*/
    async insertOng(obj: UserDTO) {
        try {
            const rol = await this.roleRep.findOneBy({
                typeRole: role[obj.role]
            })

            if (!rol) throw new Error("Role não encontrada")

            const usr = this.userRep.create({
                name: obj.name,
                password: obj.password,
                file:obj.file,
                userRole: [rol],
                comments: []
            })

            const ong = this.onge.create({
                cnpj: obj.ongData.cnpj,
                status: obj.ongData.status,
                description: obj.ongData.description,
                logo: obj.ongData.logo,
                events: [],
                userData: usr
            })

            usr.ondData = ong

            // 🔥 salva tudo de uma vez (com cascade)
            let res = await this.userRep.save(usr)
            return res

        } catch (e) {
            console.log(e)
            return { messageerr: "erro ao inserir ong usuário" }
        }
    }
    createOng(obj: OngDTO, usr: UserE) {
        try {
            let OngObj: any = this.onge.create({
                cnpj: obj.cnpj, status: obj.status,
                description: obj.description, logo: obj.logo, events: [], userData: usr
            })
            return OngObj
        } catch (e) {
            return { messageerr: "erro ao inseriri ong" }
        }
    }
    async updateOng(userId: number, obj: UserDTO) {
        try {
            let usr: any = await this.userRep.findOne({
                where: { id: userId },
                relations: ['ondData']
            })
            console.log("searching ong for update")
            console.log(usr)

            if (!usr) {
                return { messageerr: "usuário não encontrado" }
            }

            let ong: any = usr.ondData

            if (!ong) {
                return { messageerr: "ong não encontrada" }
            }
            usr.name = obj.name ?? usr.name
            usr.password = obj.password ?? usr.password
            usr.file = obj.file ?? obj.file

            ong.cnpj = obj.ongData.cnpj ?? ong.cnpj
            ong.status = obj.ongData.status ?? ong.status
            ong.description = obj.ongData.description ?? ong.description
            ong.logo = obj.ongData.logo ?? ong.logo

            await this.onge.save(ong)
            console.log("////////updating user")
            console.log(usr)
            await this.userRep.save(usr)

            let newtok = await this.userServ.genoken({ name: usr.name })
            return { msg: "atualizado com sucesso ", token: newtok }

        } catch (e) {
            return { messageerr: "erro ao atualizar ong" }
        }
    }
    async deleteOng(userId: number) {
        try {

            let usr: any = await this.userRep.findOne({
                where: { id: userId },
                relations: ['ondData', 'userRole']
            })
            console.log("searching ong")
            console.log(usr)

            if (!usr) {
                return { messageerr: "usuário não encontrado" }
            }

            let ong = usr.ondData


            if (!ong) {
                return { messageerr: "ong não encontrada" }
            }

            await this.userRep.delete({ id: usr.id })
            await this.onge.delete({ id: ong.id })


            return { message: "ong deletada com sucesso" }

        } catch (e) {
            console.log(e)
            return { messageerr: "erro ao deletar ong" }
        }
    }
    async getAllOngs() {
        try {
            let result: any = await this.userRep.find({ relations: ["ondData", "userRole"] })
            let arr: any = []
            console.log(result)
            result.forEach(el => {
                if (el.ondData) {
                    arr.push(el)
                }
            });
            return arr
        } catch (e) {
            console.log(e)
            return { messageerr: "erro ao buscar ongs" }
        }
    }
    /*
    async getOngByUserId(){
        try{
            
        }catch(e){
    
        }
    }*/
}