import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesE } from "src/entities/Roles.entity";
import { Repository } from "typeorm";
import { role } from "src/entities/roles";
@Injectable() 
export class InitServ implements OnModuleInit {
    constructor(@InjectRepository(RolesE) private roles :Repository<RolesE>){

    }
     onModuleInit() {
        //throw new Error("Method not implemented.");
        const arr = ["admin","user"]
        arr.forEach(async (e)=> {
            console.log("inserting "+e)
            //console.log(RolesE[e])
            let result = await this.roles.findOne({where:{typeRole:role[e]}})
            console.log(result)
            if(!result){
                let r = new RolesE;
                r.typeRole = role[e];
                r.users=[]
                this.roles.save(r)
            }
        });
    }
}