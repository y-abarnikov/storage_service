import { Controller, Get, Param } from '@nestjs/common';
import { EnergyCharacteristicsService } from './energyCharacteristics.service';

@Controller('energyCharacteristics')
export class EnergyCharacteristicsController {
  constructor(
    private readonly energyCharacteristicsService: EnergyCharacteristicsService,
  ) {}

  @Get(':id')
  public async getEnergyCharacteristicsByFacilityId(
    @Param('id') facilityId: string,
  ) {
    return this.energyCharacteristicsService.getByFacilityId(facilityId);
  }
}
