import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class OngDTO{
    id:number
    @IsNotEmpty()
    @IsString()
    cnpj:string
    @IsNotEmpty()
    @IsBoolean()
    status:boolean
    @IsNotEmpty()
    @IsString()
    description:string
    @IsNotEmpty()
    //@IsString()
    //logo:string
    userData:number
}