import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { authG } from './guards/authG.guard';
import { UserServ } from './service/userServ.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './entities/DTO/UserDTO';
import { OngService } from './service/OngService.Service';
import { EventDTO } from './entities/DTO/EventDTO';
import { EventService } from './service/EventsService.Service';
import { EventCommentsDTO } from './entities/DTO/EventComments';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private serv: UserServ, private ongserv: OngService,
    private eventServ: EventService, private jwtService: JwtService
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      originalname: file.originalname,
      path: file.path
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("authck/")
  async checkAuth(@Body() obj: any) {
    let ck: any = await this.serv.checkUse(obj);
    let role = await this.serv.getUserRole(obj.name);
    let usr:any = await this.serv.getUserByName(obj.name)

    console.log(ck)
    console.log("auth check user is")
    console.log(usr.file)
    try {
      if (ck) {
        return { token: this.serv.genoken(obj), role: role,file:usr.file}
      } else {
        return { msg: "invalid authentication" }
      }
    } catch (e) {
      console.log(e)
      return { msg: "invalid authentication" }
    }
  }
  @UseGuards(authG)
  @Get("check/")
  checkVal(): any {
    return { msg: "results token" }
  }

  @Get("res/")
  checkRes() {
    return { msg: "ok check" }
  }
  //INSERT USER
  @Post("usr/")
  @UseInterceptors(FileInterceptor('file'))
  async insertUser(@UploadedFile() file: Express.Multer.File, @Body() obj: UserDTO) {
    if (file.filename && file.originalname) {
      obj.file = file.filename
    }
    return await this.serv.insrtUser(obj)
  }
  //INSERT ONG
  @Post("usrOng/")
  @UseInterceptors(FileInterceptor('file'))
  async insertUserOng(@UploadedFile() file: Express.Multer.File, @Body() obj: UserDTO) {
    if (file && file.filename && file.originalname) {
      obj.file = file.filename
    }
    console.log(obj)
    return await this.ongserv.insertOng(obj)
  }
  //UPDATE USER - ONG
  @Put("usrOng/updateU/:id")
  @UseInterceptors(FileInterceptor('file'))
  async updateUserOng(@UploadedFile() file: Express.Multer.File, @Param("id") id: number, @Body() obj: UserDTO) {
    if (file && file.filename && file.originalname) {
      obj.file = file.filename
    }
    return await this.ongserv.updateOng(id, obj)
  }
  //UPDATE USER
  @Put("usr/updateU/")
  @UseInterceptors(FileInterceptor('file'))
  async updateUser(@UploadedFile() file: Express.Multer.File, @Headers("authorization") auth: string,
    @Body() obj: UserDTO) {
    console.log("updating this")
    //console.log(obj)
    try {
      if (file && file.originalname) {
        obj.file = file.filename
      }
      let tok = auth.split(" ")[1]
      const decoded = await this.jwtService.decode(tok);
      let resName: any = await this.serv.getUserByName(decoded.name)
      //console.log("user identified")
      //console.log(resName)
      //console.log(resName.id)
      let resultupdate = await this.serv.updateUser(obj, resName.id)
      //console.log("//--// this is the resultupdate" )
      //console.log(resultupdate)
      return resultupdate
    } catch (e) {
      console.log(e)
      return { msgError: "erro ao buscar usuário" }
    }
    //return await this.ongserv.updateOng(id,obj)
    //return await this.serv.updateUser(obj,id)
  }
  //GET ALL ONGS
  @Get("usrOng/getAll")
  async getAllUserOng() {
    return await this.ongserv.getAllOngs()
  }
  // DELETE USER - ONG
  @Delete("usrOng/:id")
  async delOngUser(@Param("id") id: number) {
    return await this.ongserv.deleteOng(id)
  }
  // GET ALL USER
  @Get("usrall/")
  async getAllUser() {
    return await this.serv.getAllusers()
  }
  // GET ROLE BY USER NAME
  @Get("usrole/:name")
  async getUserRole(@Param("name") name: string) {
    console.log(name)
    return await this.serv.getUserRole(name)
  }
  //GET USER BY TOKEN
  @Get("usrtoken/")
  async getUserByToken(@Headers("authorization") auth: string) {
    try {
      console.log("------------- this is the auth get user")
      console.log(auth)
      let tok = auth.split(" ")[1]
      const decoded = await this.jwtService.decode(tok);
      console.log(decoded)
      let res: any = await this.ongserv.getOngByUserName(decoded.name)
      console.log(res)
      return res
    } catch (e) {
      console.log(e)
      return { msgError: "erro ao buscar usuário" }
    }
  }
  //-----------------------------------
  @Post("bolds/")
  @UseInterceptors(FileInterceptor('file'))
  uploadFile2(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      originalname: file.originalname,
      path: file.path
    };
  }

  //INSERT EVENT
  @Post("event/")
  @UseInterceptors(FileInterceptor('file'))
  async createEvent(@UploadedFile() file: Express.Multer.File,
    @Headers("authorization") auth: string, @Body() event: EventDTO) {
    /*console.log({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path
    })*/
    console.log("content is")
    console.log(event)
    try {
      console.log("------------- this is the auth get user")
      console.log(auth)
      let tok = auth.split(" ")[1]
      const decoded = await this.jwtService.decode(tok);
      console.log(decoded)
      let res: any = await this.ongserv.getOngByUserName(decoded.name)
      if (file && file.filename && file.originalname) {
        event.file = file.filename
      }
      if (res.ondData.id) {
        return await this.eventServ.insertEvents(event, res.ondData.id)
      } else {
        console.log("no ong")
        throw new Error("usuário não possui ong")
      }

      /*
      let res: any = await this.ongserv.getOngByUserName(decoded.name)
      console.log(res)
      return res*/
    } catch (e) {
      console.log(e)
      return { msgError: "erro ao buscar usuário" }
    }
    /*
    try {
      let user: any = await this.serv.getUserByNameOng(event.username)
      console.log("user event")
      console.log(user)
      event.ongE = user.ondData.id
      console.log("changes")
      console.log(event)
      if (user.ondData.id) {
        return await this.eventServ.insertEvents(event)
      } else {
        console.log("no ong")
        throw new Error("usuário não possui ong")
      }
    } catch (e) {
      console.log(e)
      return { messageerr: "erro ao inserir event" }
    }*/

  }
  //UPDATE EVENT
  @Put("event/:id")
  @UseInterceptors(FileInterceptor('file'))
  async updateEvent(@UploadedFile() file: Express.Multer.File, @Body() event: EventDTO) {
    try {
      if (file && file.filename && file.originalname) {
        event.file = file.filename
      }
      console.log("event file is ")
      console.log(event.file)
      return await this.eventServ.updateEvents(event)
    } catch (e) {
      return { messageerr: "erro ao atualizar evento" }
    }
  }
  //DELETE EVENT
  @Delete("event/:id")
  async deleteEvent(@Param("id") id: number) {
    return await this.eventServ.deleteEvent(id)
  }
  //GET EVENTS
  @Get("event/")
  async getEvents() {
    return await this.eventServ.getAllEvent()
  }
  //GET EVENT BY ID
  @Get("eventid/:id")
  async getEventById(@Param("id") id: number) {
    let res = await this.eventServ.getEventById(id)
    console.log(res)
    return res
  }
  //GET EVENTS OF ONG
  @Get("eventOngEvents/")
  async getOngEvents(@Headers("authorization") auth: string) {
    try {
      console.log(auth)
      let tok = auth.split(" ")[1]
      const decoded = await this.jwtService.decode(tok);
      console.log(decoded)
      let res: any = await this.ongserv.getOngByUserName(decoded.name)
      return await this.eventServ.OngEvent(res.ondData.id)
    } catch (e) {
      return { msgError: "erro ao buscar" }
    }
  }
  //----------------------------------
  //INSERT COMMENT
  @Post("comment/")
  async createComment(@Body() obj: EventCommentsDTO) {
    return await this.eventServ.insertComment(obj)
  }
  //GET COMMENT
  @Get("comment/")
  async getComment() {
    return await this.eventServ.getAllComments()
  }
  //DELETE COMMENT
  @Delete("comment/:id")
  async deleteComment(@Param("id") id: number) {
    return await this.eventServ.deleteEventComment(id)
  }
  //DELETE ALL FROM EVENT
  @Delete("comment/allevent/:id")
  async deleteAllComment(@Param("id") id: number) {
    return await this.eventServ.deleteAllEventComments(id)
  }
  //------------------------------------------
  //USER SUBSCRIBE
  @Post("subscription/:id")
  async subscribe(@Headers("authorization") auth: string, @Param("id") id: number) {
    try {
      console.log(auth)
      let tok = auth.split(" ")[1]
      const decoded = await this.jwtService.decode(tok);
      console.log(decoded)
      let resName: any = await this.serv.getUserByName(decoded.name)
      let result = await this.eventServ.subscribe(resName.id, id)
      //let res: any = await this.ongserv.getOngByUserName(decoded.name)
      //return await this.eventServ.OngEvent(res.id)
      return result
    } catch (e) {
      return { msgError: "erro ao realizar inscrição" }
    }
  }
  //USER UNSUBSCRIBE
  @Delete("subscription/:id")
  async unsubscribe(@Headers("authorization") auth: string, @Param("id") id: number) {
    try {
      console.log(auth)
      let tok = auth.split(" ")[1]
      const decoded = await this.jwtService.decode(tok);
      console.log(decoded)
      let resName: any = await this.serv.getUserByName(decoded.name)
      let result = await this.eventServ.unsubscribe(resName.id, id) //await this.subscribe(resName.id,id)
      //let res: any = await this.ongserv.getOngByUserName(decoded.name)
      //return await this.eventServ.OngEvent(res.id)
      return result
    } catch (e) {
      return { msgError: "erro ao desinscrever" }
    }
  }
  //GET ALL VOLUNTEERS
  @Get("subcribers/:id")
  async getAllVolunteers(@Param("id") id: number) {
    return await this.eventServ.getAllVolunteers(id)
  }
  //CHECK IF IS SUBSCRIBED
  @Get("checkSubcription/:id")
  async checkSubscription(@Headers("authorization") auth: string, @Param("id") id: number) {
    //console.log("here check --------------------------")
    try {
      console.log(auth)
      let tok = auth.split(" ")[1]
      const decoded = await this.jwtService.decode(tok);
      console.log(decoded)
      let resName: any = await this.serv.getUserByName(decoded.name)
      //console.log("this is the decoded user")
      //console.log(resName)
      let result = await this.eventServ.isVolunteerInEvent(id, resName.id)//await this.eventServ.unsubscribe(resName.id,id) //await this.subscribe(resName.id,id)
      //console.log("the chekc if user is subscribed is ------>")
      console.log(result)
      //let res: any = await this.ongserv.getOngByUserName(decoded.name)
      //return await this.eventServ.OngEvent(res.id)
      return result
    } catch (e) {
      return { msgError: "erro ao checar inscricao" }
    }
  }
  //GET ALL VOLUNTEER EVENTS
  @Get("getAllSub/")
  async getAllVEvents(@Headers("authorization") auth: string) {
    try {
      console.log(auth)
      let tok = auth.split(" ")[1]
      const decoded = await this.jwtService.decode(tok);
      console.log(decoded)
      let resName: any = await this.serv.getUserByName(decoded.name)
      let val = await this.eventServ.getAllEventsSubscription(resName.id)
      return val
      //return result
    } catch (e) {
      return { msgError: "erro ao checar inscricao" }
    }
  }
}
