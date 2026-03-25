import { IsNotEmpty, IsString } from "class-validator"
import { OngDTO } from "./OngDTO"

export class UserDTO{
    id:number
    @IsString()
    @IsNotEmpty()
    name:string
    @IsString()
    @IsNotEmpty()
    password:string
    @IsString()
    @IsNotEmpty()
    role:string
    ongData:OngDTO

    file:string
}