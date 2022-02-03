import { MigrationInterface, QueryRunner } from 'typeorm';
import { Credential } from 'src/auth/entities/crediential.entity';

export class addAdminCreditentials1642076982154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminCredentials = new Credential();
    adminCredentials.username = 'device';
    adminCredentials.password = 'device';

    await queryRunner.manager.save(adminCredentials);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminCredentials = await queryRunner.manager.find(Credential, {
      where: {
        username: 'device',
      },
    });

    await queryRunner.manager.remove(adminCredentials);
  }
}
