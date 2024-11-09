import { Injectable, LoggerService } from '@nestjs/common';
import { format, transports, createLogger, Logger as WinstonLogger } from 'winston';
import { ConfigService } from '../config/config.service';
import { LOG_LEVEL, LOG_TRANSPORT } from './constants';
import * as Transport from 'winston-transport';

export const CONTEXT_KEY_WITH_MEMORY_USAGE = 'withMemoryUsage';
export const CONTEXT_KEY_ERROR = 'error';

@Injectable()
export class Logger implements LoggerService {
  private logger: WinstonLogger;

  constructor(configService: ConfigService) {
    this.initWinstonLogger(configService);
  }

  private initWinstonLogger(configService: ConfigService) {
    const config = configService.getLogConfig();

    this.logger = createLogger({
      level: config.level,
      format: format.combine(format.timestamp(), format.colorize(), format.simple()),
      transports: this.getTransport(config.transport),
      defaultMeta: {
        metadata: {
          environment: config.environment,
          namespace: config.namespace,
          processId: process.pid,
        },
      },
    });
  }

  private getTransport(name: LOG_TRANSPORT): Transport[] {
    const transportOptions: Record<LOG_TRANSPORT, Transport[]> = {
      console: [new transports.Console()],
      console_json: [
        new transports.Console({
          format: format.combine(format.timestamp(), format.uncolorize(), format.json()),
        }),
      ],
      stack: [
        new transports.Console({
          format: format.combine(format.timestamp(), format.colorize(), format.simple()),
        }),
        new transports.File({
          filename: 'logs/app.log',
          format: format.combine(format.timestamp(), format.uncolorize(), format.json()),
        }),
      ],
    };

    return transportOptions[name];
  }

  public isDebugLevelEnabled(): boolean {
    return this.logger.isDebugEnabled();
  }

  public debug(message: any, context: any = {}): any {
    this.logger.debug(message, this.transformContextFields(context));
  }

  public error(message: any, context: any = {}): any {
    this.logger.error(message, this.transformContextFields(context));
  }

  public fatal(message: any, context: any = {}): any {
    this.logger.error(message, this.transformContextFields(context));
  }

  public log(message: any, context: any = {}): any {
    this.logger.info(message, this.transformContextFields(context));
  }

  public logWithLevel(level: LOG_LEVEL, message: any, context: any = {}): any {
    this.logger.log({
      level,
      message,
      ...this.transformContextFields(context),
    });
  }

  public warn(message: any, context: any = {}): any {
    this.logger.warn(message, this.transformContextFields(context));
  }

  private transformContextFields(context: any = {}) {
    if (typeof context === 'string') {
      return context;
    }

    const result = {};
    for (const contextKey in context) {
      if (contextKey === CONTEXT_KEY_ERROR && context[contextKey] instanceof Error) {
        const error = context[contextKey];
        result[CONTEXT_KEY_ERROR] = {
          message: error.toString(),
          // @ts-expect-error Property 'trace' does not exist on type 'Error'.
          trace: (error.trace ?? error.stack) + '\n' + Error().stack,
        };
        continue;
      }

      if (contextKey === CONTEXT_KEY_WITH_MEMORY_USAGE && context[contextKey] === true) {
        result['memory_usage_mb'] = process.memoryUsage().heapUsed / 1024 / 1024;
        delete context[contextKey];
      }

      result[contextKey] = context[contextKey];
    }
    return result;
  }
}
