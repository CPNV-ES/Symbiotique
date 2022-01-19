import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DeviceState {
  NOT_CONFIGURED = 'NOT_CONFIGURED',
  CONFIGURED = 'CONFIGURED',
  /**
   * This state will be set when the device tried to connect to the server but
   * the credentials used (username and password) are invalid.
   */
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
}

enum DeviceType {
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITY = 'HUMIDITY',
  LIGHT = 'LIGHT',
  PRESSURE = 'PRESSURE',
  CO2 = 'CO2',
  DOOR = 'DOOR',
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

  @Column({ nullable: true })
  @ApiProperty({ example: DeviceType.TEMPERATURE })
  type: DeviceType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: DeviceState.NOT_CONFIGURED })
  @ApiProperty({ example: DeviceState.NOT_CONFIGURED })
  state: DeviceState;
}
