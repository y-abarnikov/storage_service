import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '@shared/shared.module';
import { EventsGateway } from '@src/events.gateway';
import { ConnectionOptions } from 'tls';

import CONFIG from './config';
import { EnergyCharacteristicsModule } from './energyCharacteristics/energyCharacteristics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [CONFIG],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ConnectionOptions => {
        return configService.get<ConnectionOptions>('socketPostgres');
      },
    }),
    SharedModule,
    EnergyCharacteristicsModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
