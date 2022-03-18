import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDevicesMetricsHypertable1647524074207
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `SELECT create_hypertable('devices_metrics','time');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
