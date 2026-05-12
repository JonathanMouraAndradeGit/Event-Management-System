import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesE } from "src/entities/Roles.entity";
import { Repository } from "typeorm";
import { role } from "src/entities/roles";
import { UserE } from "src/entities/User.entity";
@Injectable()
export class InitServ implements OnModuleInit {
    constructor(@InjectRepository(RolesE) private roles: Repository<RolesE>,
        @InjectRepository(UserE) private usre: Repository<UserE>) {

    }
    async onModuleInit() {

        const arr = ["admin", "user", "manager"];

        for (const e of arr) {

            console.log("inserting " + e);

            const result = await this.roles.findOne({
                where: {
                    typeRole: role[e]
                }
            });

            console.log(result);

            if (!result) {

                const r = new RolesE();

                r.typeRole = role[e];
                r.users = [];

                await this.roles.save(r);
            }
        }

        const rol = await this.roles.find({
            where: {
                typeRole: role.manager
            }
        });

        const checkUsr = await this.usre.findOne({
            where: {
                name: "manageUsr"
            }
        });

        if (!checkUsr && rol[0]) {

            const usrc = this.usre.create({
                name: "manageUsr",
                email: "manageUsr@gmail.com",
                password: "pass@Ab123",
                userRole: rol,
                file: "",

            });

            await this.usre.save(usrc);
        }
    }
}