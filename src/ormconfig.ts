import { ConnectionOptions } from 'typeorm';

const config = {
  host: 'localhost',
  user: 'real_acc',
  password: '111111',
  database: 'nest',
};

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'real_acc',
  password: '111111',
  database: 'nest',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
