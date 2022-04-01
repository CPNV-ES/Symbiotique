import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'devices-data-db',
  port: 5432,
  username: 'devices-data',
  password: 'devices-data',
  database: 'devices-data',

  synchronize: true,

  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
