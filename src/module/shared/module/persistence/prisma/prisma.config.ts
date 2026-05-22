import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const databaseUrl = `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

export default defineConfig({
  schema: '../../../../../database/shared/prisma/shared.prisma',
  migrations: {
    path: '../../../database/shared/prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});
