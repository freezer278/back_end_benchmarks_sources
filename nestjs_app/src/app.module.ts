import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from './config/config.module';
import {LoggerModule} from './logger/logger.module';
import {DatabaseModule} from './database/database.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";

@Module({
    imports: [
        ConfigModule,
        LoggerModule,
        DatabaseModule,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
