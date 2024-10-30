import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { envFiles } from './env';
import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFiles,
      expandVariables: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
