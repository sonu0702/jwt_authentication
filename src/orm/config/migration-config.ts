import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


function fetchConfig() {
  const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: ['src/orm/entities/**/*.ts'],
    migrations: ['src/orm/migrations/**/*.ts'],
    subscribers: ['src/orm/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/orm/entities',
      migrationsDir: 'src/orm/migrations',
      subscribersDir: 'src/orm/subscriber',
    },
    namingStrategy: new SnakeNamingStrategy(),
  };

  return config;
}

export = fetchConfig();