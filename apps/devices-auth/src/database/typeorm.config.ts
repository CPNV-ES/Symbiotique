import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'devices-auth-db',
  port: 5432,
  username: 'devices-auth',
  password: 'devices-auth',
  database: 'devices-auth',

  synchronize: true,

  migrationsRun: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
