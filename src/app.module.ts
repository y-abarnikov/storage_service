import { Module } from '@nestjs/common';

import { SharedModule } from '@shared/shared.module';
import { EventsGateway } from '@src/events.gateway';

@Module({
  imports: [SharedModule],
  providers: [EventsGateway],
})
export class AppModule {}
