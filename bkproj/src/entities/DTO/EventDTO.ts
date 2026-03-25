import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class EventDTO{
    id:number

    @IsString()
    @IsNotEmpty()
    title:string
    @IsString()
    @IsNotEmpty()
    description:string
    @IsDate()
    @IsNotEmpty()
    eventDate:Date
    /*
    @IsString()
    @IsNotEmpty()
    place:string
    @IsString()
    @IsNotEmpty()
    city:string
    @IsString()
    @IsNotEmpty()
    state:string*/

    file:string

    @IsString()
    @IsNotEmpty()
    latlon:string
    @IsString()
    @IsNotEmpty()
    display:string
    
    @IsNumber()
    @IsNotEmpty()
    ongE:number

    //username:string
}