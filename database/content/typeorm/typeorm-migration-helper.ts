import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@sharedModule/config/service/config.service';
import { TypeOrmMigrationService } from '@contentModule/infra/module/typeorm/service/typeorm-migration.service';
import { PersistenceModule } from '@contentModule/persistence/persistence.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { createPostgresDatabase } from 'typeorm-extension';

export const ensureDatabaseSchema = async (dataSource: DataSource) => {
  const schema = (dataSource.options as { schema?: string }).schema ?? 'public';
  await dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
};

const createDatabaseModule = async () => {
  return await NestFactory.createApplicationContext(
    PersistenceModule.forRoot({
      migrations: [__dirname + '/migrations/*'],
    }),
  );
};

export const migrate = async () => {
  const migrationModule = await createDatabaseModule();
  migrationModule.init();
  const configService = migrationModule.get<ConfigService>(ConfigService);
  const options = {
    type: 'postgres',
    ...configService.get('database'),
  } as DataSourceOptions;
  await createPostgresDatabase({
    ifNotExist: true,
    options,
  });
  const dataSource = await migrationModule
    .get(TypeOrmMigrationService)
    .getDataSource();
  await ensureDatabaseSchema(dataSource);
  await migrationModule.get(TypeOrmMigrationService).migrate();
};

export const getDataSource = async () => {
  const migrationModule = await createDatabaseModule();
  return migrationModule.get(TypeOrmMigrationService).getDataSource();
};
