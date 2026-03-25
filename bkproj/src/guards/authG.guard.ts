import { CanActivate, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

let g = AuthGuard("local")
@Injectable()
export class authG extends g{

}