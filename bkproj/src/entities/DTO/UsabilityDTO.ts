import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UsabilityDTO{
    id:number;
    @IsString()
    @IsNotEmpty()
    user:string;
    @IsNumber()
    @IsNotEmpty()
    grade:number;
}