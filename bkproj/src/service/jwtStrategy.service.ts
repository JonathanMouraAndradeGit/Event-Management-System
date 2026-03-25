import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt"
@Injectable()
export class JwtStrategyCls extends PassportStrategy(Strategy,"local"){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "123",
        })
    }
    async validate(payload:any){
        return {name:payload.name}
    }
}