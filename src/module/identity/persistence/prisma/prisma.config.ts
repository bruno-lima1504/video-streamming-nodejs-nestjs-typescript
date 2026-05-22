import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const databaseUrl = `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=public`;

export default defineConfig({
  schema: '../../../../../database/identity/prisma/identity.prisma',
  migrations: {
    path: '../../../../..//database/identity/prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});
