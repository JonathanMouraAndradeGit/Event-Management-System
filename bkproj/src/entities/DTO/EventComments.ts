import { IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator"
import { OngDTO } from "./OngDTO"


export class EventCommentsDTO{

    id:number
    
    @IsNotEmpty()
    @IsString()
    content:string

    @IsNumber()
    @IsNotEmpty()
    user:number

    @IsNumber()
    @IsNotEmpty()
    event:number

    ong:OngDTO
}