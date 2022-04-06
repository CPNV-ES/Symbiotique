import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDevicesDataTable1647002444468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      CREATE TABLE IF NOT EXISTS device_data (
        time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
        clientId VARCHAR(255),
        location TEXT,
        temperature DOUBLE PRECISION,
        humidity DOUBLE PRECISION,

        PRIMARY KEY (time, clientId)
      );

      SELECT create_hypertable('device_data', 'time', 'clientId', 4);
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('device_data');
  }
}
