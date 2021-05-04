import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyCharacteristicsController } from './energyCharacteristics.controller';
import { EnergyCharacteristicsService } from './energyCharacteristics.service';
import EnergyCharacteristic from './entities/energyCharacteristic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnergyCharacteristic])],
  controllers: [EnergyCharacteristicsController],
  providers: [EnergyCharacteristicsService],
})
export class EnergyCharacteristicsModule {}
