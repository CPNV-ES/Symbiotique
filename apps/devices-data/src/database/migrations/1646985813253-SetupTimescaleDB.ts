import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupTimescaleDB1646985813253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION timescaledb;`);
  }
}
