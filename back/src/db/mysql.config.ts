import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const MySQLConfig = (
  host: string | undefined,
  port: string | undefined,
  database: string | undefined,
  username: string | undefined,
  password: string | undefined
): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: host,
    port: parseInt(port ?? ''),
    username: username,
    password: password,
    database: database,
    entities: [path.join(__dirname, './entities', '**', '*.entity.{ts,js}')],
    synchronize: false,
    logging: false,
    timezone: 'Z',
    charset: 'utf8mb4_unicode_ci',
  };
};
