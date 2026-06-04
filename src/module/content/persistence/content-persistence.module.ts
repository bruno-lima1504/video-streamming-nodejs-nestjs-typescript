import { ContentRepository } from '@contentModule/persistence/repository/content.repository';
import { VideoRepository } from '@contentModule/persistence/repository/video.repository';
import { dataSourceOptionsFactory } from '@contentModule/persistence/typeorm-datasource.factory';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@sharedModule/config/config.module';
import { ConfigService } from '@sharedModule/config/service/config.service';
import { TypeOrmPersistenceModule } from '@sharedModule/persistence/typeorm/typeorm-persistence.module';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { EpisodeRepository } from '@contentModule/persistence/repository/episode.repositoy';

@Module({
  imports: [
    TypeOrmPersistenceModule.forRoot({
      imports: [ConfigModule.forRoot()],
      name: 'content',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return dataSourceOptionsFactory(configService);
      },
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource({
          name: options.name,
          dataSource: new DataSource(options),
        });
      },
    }),
  ],
  providers: [ContentRepository, EpisodeRepository, VideoRepository],
  exports: [ContentRepository, EpisodeRepository, VideoRepository],
})
export class PersistenceModule {}
