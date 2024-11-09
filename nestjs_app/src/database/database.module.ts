import {Module} from '@nestjs/common';
import {ConfigModule} from '../config/config.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from '../config/config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): any => {
        const config = configService.getDbConfig();
        return {
          ...config,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
      extraProviders: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {
}
