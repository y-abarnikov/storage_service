import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import EnergyCharacteristic from './entities/energyCharacteristic.entity';

@Injectable()
export class EnergyCharacteristicsService {
  constructor(
    private readonly energyCharacteristicsRepository: Repository<
      EnergyCharacteristic
    >,
  ) {}

  public async getByFacilityId(facilityId: string) {
    return this.energyCharacteristicsRepository.find({
      reportedBy: facilityId,
    });
  }
}
