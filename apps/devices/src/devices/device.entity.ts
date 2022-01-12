import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

enum DeviceState {
  NOT_CONFIGURED = 'NOT_CONFIGURED',
  CONFIGURED = 'CONFIGURED',
}

@Entity()
export class Device {
  @PrimaryColumn({ unique: true })
  @ApiProperty({ example: 'device-1' })
  clientId: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Temperature sensor guest room' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'On the wall' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: DeviceState.NOT_CONFIGURED })
  @ApiProperty({ example: DeviceState.NOT_CONFIGURED })
  state: DeviceState;
}
