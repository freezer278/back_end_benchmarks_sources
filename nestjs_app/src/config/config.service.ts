import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ENV, LOG_LEVEL, LOG_TRANSPORT } from '../logger/constants';
import {DatabaseType} from 'typeorm/driver/types/DatabaseType';

export type LogConfig = {
  level: LOG_LEVEL;
  transport: LOG_TRANSPORT;
  namespace: string;
  environment: ENV;
};

export type DbConfig = {
  type: DatabaseType,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  synchronize: boolean,
};

@Injectable()
export class ConfigService extends NestConfigService {
  public getLogConfig(): LogConfig {
    return {
      level: this.get<LOG_LEVEL>('LOG_LEVEL', LOG_LEVEL.INFO),
      transport: this.get<LOG_TRANSPORT>('LOG_TRANSPORT', LOG_TRANSPORT.STACK),
      namespace: `type-orm-test-service`,
      environment: this.get<ENV>('APP_ENV', ENV.PROD),
    };
  }

  public getDbConfig(): DbConfig {
    return {
      type: 'postgres',
      host: this.get<string>('DB_HOST', '127.0.0.1'),
      port: this.get<number>('DB_PORT', 5432),
      username: this.get<string>('DB_USER', 'root'),
      password: this.get<string>('DB_PASSWORD', 'root'),
      database: this.get<string>('DB_DATABASE', 'test_db'),
      synchronize: this.get<boolean>('DB_SYNCHRONIZE', false),
    };
  }
}
