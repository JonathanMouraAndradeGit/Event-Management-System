import { InjectRepository } from "@nestjs/typeorm";
import { filter } from "rxjs";
import { Usability } from "src/entities/Usability.entity";
import { UserE } from "src/entities/User.entity";
import { Repository } from "typeorm";

export class UsabilityService {
    constructor(@InjectRepository(UserE) private usre: Repository<UserE>,
        @InjectRepository(Usability) private usblt: Repository<Usability>) {

    }
    async injectGrade(obj: Usability) {
        try {
            const res = await this.usblt.findOne({
                where: { user: { id: obj.user.id } },
                relations: ["user"]
            });

            if (res) {
                res.grade = obj.grade;
                await this.usblt.save(res);

                return { message: "Atualizado com sucesso" };
            } else {
                let val = this.usblt.create({
                    user: obj.user,
                    grade: obj.grade
                });

                val = await this.usblt.save(val);

                return { message: "Criado com sucesso", obj: val };
            }
        } catch (e) {
            console.error(e);
            return { messageError: "Erro ao realizar operação" };
        }
    }

    async getTotalAvg() {
        try {
            const result = await this.usblt
                .createQueryBuilder("usability")
                .select("AVG(usability.grade)", "avg")
                .getRawOne();

            const above = await this.usblt.find();
            let numAbove = above.reduce(
                (count, { grade }) => count + (grade > 50 ? 1 : 0),
                0
            );
            const numBelow = ((above.length - numAbove)*100/above.length);
            numAbove = (numAbove*100/above.length)

            const grades = await this.usblt.find({
                relations: ["user"],
            });

            const evaluations = grades.map((el) => ({
                name: el.user?.name,
                img: el.user?.file,
                email: el.user?.email,
                grade: el.grade,
            }));

            return {
                above:numAbove,
                below:numBelow,
                avg: Number(result?.avg || 0),
                evaluations,
            };
        } catch (e) {
            console.error(e);

            return {
                messageError: "Erro ao realizar operação",
            };
        }
    }
    /*
    async injectGrade(obj:Usability){
        try{
            let res:any = await this.usblt.findOne({where:{user:obj.user},relations:["user"]})
            if(res){
                res.grade = obj.grade
                await this.usblt.save(res)
                return {massage:"atualizado com sucesso"}
            }else{
                let val = await this.usblt.create({user:obj.user,grade:obj.grade})
                val = await this.usblt.save(val)
                return {massage:"criado com sucesso",obj:val}
            }
        }catch(e){
            return {massageError:"Erro ao realizar operação"}
        }
    }
    async getTotalAvg(){
        try{
            let result = await this.usblt.average("grade")
            return {avg:result}
        }catch(e){
            return {massageError:"Erro ao realizar operação"}
        }
    }*/
}