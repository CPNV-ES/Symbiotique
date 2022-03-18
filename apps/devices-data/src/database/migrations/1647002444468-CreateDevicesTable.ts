import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDevicesTable1647002444468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'devices_metrics',
        columns: [
          {
            name: 'time',
            type: 'TIMESTAMPTZ',
            isNullable: false,
          },
          {
            name: 'location',
            type: 'TEXT',
            isNullable: false,
          },
          {
            name: 'temperature',
            type: 'DOUBLE PRECISION',
          },
          {
            name: 'humidity',
            type: 'DOUBLE PRECISION',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('devices_metrics');
  }
}
