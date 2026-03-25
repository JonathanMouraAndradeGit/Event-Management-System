import { InjectRepository } from "@nestjs/typeorm";
import { RolesE } from "src/entities/Roles.entity";
import { UserE } from "src/entities/User.entity";
import { Repository } from "typeorm";
import { role } from "src/entities/roles";
import { Jwt } from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "src/entities/DTO/UserDTO";
import { Volunteer } from "src/entities/Volunteer.entity";
export class UserServ {
    constructor(@InjectRepository(UserE) private injectRep: Repository<UserE>,
        @InjectRepository(RolesE) private injectrole: Repository<RolesE>,
        @InjectRepository(Volunteer) private injectValunteer: Repository<Volunteer>,
        private jwtService: JwtService) {

    }
    async getUserByName(name:string){
        try{
            console.log("get user by name")
            console.log(name)
            let res = await this.injectRep.findOneBy({name:name})
            console.log(res)
            if(res){
                return res
            }else{
                throw new Error("usuário não encontrado")
            }
        }catch(e){
            console.log(e)
            return { messageerr: "erro ao buscar usuário" }
        }
    }
    async insrtUser(usr: UserDTO) {
        //let role:any = new UserE()
        //role = this.injectrole.create({typeRole:role[usr.role]})
        console.log(usr)
        console.log("inserting")
        let arr: RolesE[] = []
        let rol: any = await this.injectrole.find({ where: { typeRole: role[usr.role] } })
        arr.push(rol[0])
        console.log(arr)
        try {
            let usrc: any = this.injectRep.create({ name: usr.name, password: usr.password, userRole: arr,file:usr.file })
            let vol:any = this.injectValunteer.create({userD:usrc,subscription:[]})
            usrc.volunData = vol
            usrc = await this.injectRep.save(usrc)
            return usrc
        } catch (e) {
            console.log("Error" + e)
            return { mesage: "erro ao inserir usuário" }
        }
    }
    async updateUser(usr: UserDTO, id: number) {
        //let role:any = new UserE()
        //role = this.injectrole.create({typeRole:role[usr.role]})
        try {
            let usrArr:any = await this.injectRep.findOneBy({id:id})//.find({ where: { id: id } })
            let checkName = await this.injectRep.find({ where: { name: usr.name } })
            if (checkName.length > 0) {
                let isnew = false
                checkName.forEach((el, i) => {
                    if (id != el.id) {
                        isnew = true
                    }
                })
                if (isnew) {
                    throw new Error("nome já cadastrado")
                }
            }
            usrArr.name = usr.name ?? usrArr.name;
            usrArr.password = usr.password ?? usrArr.password;
            usrArr.file = usr.file ?? usrArr.file;
            await this.injectRep.save(usrArr)
            //console.log("//////////// this is generating a token with name")
            //console.log(usrArr.name)
            let newtok = await this.genoken({name:usrArr.name})
            return {msg:"atualizado com sucesso",token:newtok}
        } catch (e) {
            console.log(e)
            return {msgerror:"erro ao atualizar o usuário"}
        }
        //let usr = this.injectRep.create({name:usr.name,password:usr.password,usr})
        /*
        console.log(usr)
        console.log("inserting")
        let arr: RolesE[] = []
        let rol: any = await this.injectrole.find({ where: { typeRole: role[usr.role] } })
        arr.push(rol[0])
        console.log(arr)
        try {
            let usrc: any = this.injectRep.create({ name: usr.name, password: usr.password, userRole: arr })
            usrc = await this.injectRep.save(usrc)
            return usrc
        } catch (e) {
            console.log("Error" + e)
            return { mesage: "erro ao inserir usuário" }
        }*/
    }
    async getAllusers() {
        return this.injectRep.find({ relations: ["userRole"] })
    }
    async getUserRole(name: string) {
        try {
            console.log("searching for")
            console.log(name)

            const val: any = await this.injectRep.findOne({
                where: { name: name },
                relations: ["userRole"]
            })

            if (!val) {
                return { message: "Usuário não encontrado" }
            }
            console.log(val)

            return val.userRole[0]?.typeRole

        } catch (e) {
            console.log("Error " + e)
            return { message: "erro ao buscar role do usuário" }
        }
    }
    async checkUse(obj: any) {
        let res = await this.injectRep.findOneBy({ name: obj.name })
        console.log(obj)
        if (res?.password == obj.password) {
            return res
        } else {
            return false
        }
    }
    genoken(obj: any) {
        let payload = { name: obj.name }
        console.log(payload)
        console.log("start to sign")
        return this.jwtService.sign(payload)
    }
    async getUserByNameOng(name: string) {
        try {
            let res = (await this.injectRep.find({
                where: { name: name },
                relations: ['ondData']
            }))[0]
            console.log("the res is ")
            console.log(res)
            if (res) {
                return res
            } else {
                return new Error("erro ao encontrar usuário")
            }
        } catch (e) {
            console.log(e)
            return new Error("erro ao encontrar usuário")
        }
    }
}