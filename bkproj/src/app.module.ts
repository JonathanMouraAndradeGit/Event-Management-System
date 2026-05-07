import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserE } from './entities/User.entity';
import { RolesE } from './entities/Roles.entity';
import { JwtStrategyCls } from './service/jwtStrategy.service';
import { authG } from './guards/authG.guard';
import { Volunteer } from './entities/Volunteer.entity';
import { OngUser } from './entities/Ong.entity';
import { EventE } from './entities/Event.entity';
import { EventComments } from './entities/EventComments.entity';
import { EventService } from './service/EventsService.Service';
import { InitServ } from './service/initServ.Service';
import { OngService } from './service/OngService.Service';
import { UserServ } from './service/userServ.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { Usability } from './entities/Usability.entity';
import { UsabilityService } from './service/UsabilityService.service';
@Module({
  imports: [
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '24h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  MulterModule.register({
    dest: './uploads', // pasta onde os arquivos serão salvos
    /*
    MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname;
        cb(null, filename);
      },
    }),
  }),
    */
  }),
  TypeOrmModule.forRoot({
    type: 'sqlite',
    synchronize: true,
    entities: [UserE, RolesE, Volunteer, OngUser, EventE, EventComments,Usability],
    database: "sql.db"
  }),
  TypeOrmModule.forFeature([UserE, RolesE, Volunteer, OngUser, EventE, EventComments,Usability])
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategyCls, authG, EventService, InitServ, OngService, UserServ,UsabilityService],
})
export class AppModule { }
