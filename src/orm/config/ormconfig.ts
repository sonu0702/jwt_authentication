import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function getConfig(): ConnectionOptions {
  return {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: ['dist/orm/entities/**/*.js'],
    migrations: ['dist/orm/migrations/**/*.js'],
    subscribers: ['dist/orm/subscriber/**/*.js'],
    cli: {
      entitiesDir: 'dist/orm/entities',
      migrationsDir: 'dist/orm/migrations',
      subscribersDir: 'dist/orm/subscriber',
    },
    namingStrategy: new SnakeNamingStrategy(),
  };
}

