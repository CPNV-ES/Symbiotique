import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: true, withoutRowid: true, name: 'device_data' })
export class DeviceData {
  @ApiProperty()
  @PrimaryColumn()
  time: Date;

  @ApiProperty()
  @PrimaryColumn()
  clientId: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  @Column('double precision')
  temperature: number;

  @ApiProperty()
  @Column('double precision')
  humidity: number;
}
