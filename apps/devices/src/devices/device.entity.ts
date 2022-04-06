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
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  DISABLED = 'DISABLED',
  REMOVED = 'REMOVED',
  DISCONNECTED = 'DISCONNECTED',
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
  @ApiProperty({ example: DeviceType.TEMPERATURE, enum: DeviceType })
  type: DeviceType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: DeviceState.NOT_CONFIGURED })
  @ApiProperty({
    example: DeviceState.NOT_CONFIGURED,
    enum: DeviceState,
    description: `
    NOT_CONFIGURED: This state is set when the device is authenticated to the broker but not yet configured.
    CONFIGURED: This state is set when the device is configured and will start to send sensor data to the server. 
    AUTHENTICATION_FAILED: This state will be set when the device tried to connect to the server but the credentials used (username and password) are invalid.
    DISABLED: This state is set when the device is manually disabled by the user, in this state the device will not send any data to the server.
    REMOVED: This state is set when the device is manually removed by the user from the web interface.
    DISCONNECTED: This state is set when the device is disconnected from the server and can no longer send data to the server.
  `,
  })
  state: DeviceState;
}
