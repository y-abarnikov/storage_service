import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class EnergyCharacteristic {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'real', nullable: false })
  public voltage: number;

  @Column({ type: 'real', nullable: false })
  public amperage: number;

  @Column({ type: 'uuid' })
  public reportedBy: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
