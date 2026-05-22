import { DynamicModule, Module } from '@nestjs/common';
import { Content } from '@contentModule/persistence/entity/content.entity';
import { Episode } from '@contentModule/persistence/entity/episode.entity';
import { Movie } from '@contentModule/persistence/entity/movie.entity';
import { Thumbnail } from '@contentModule/persistence/entity/thumbnail.entity';
import { TvShow } from '@contentModule/persistence/entity/tv-show.entity';
import { Video } from '@contentModule/persistence/entity/video.entity';
import { ContentRepository } from '@contentModule/persistence/repository/content.repository';
import { MovieRepository } from '@contentModule/persistence/repository/movie.repository';
import { VideoRepository } from '@contentModule/persistence/repository/video.repository';
import { TypeOrmPersistenceModule } from '@contentModule/infra/module/typeorm/typeorm-persistence.module';

@Module({})
export class PersistenceModule {
  static forRoot(opts?: { migrations?: string[] }): DynamicModule {
    const { migrations } = opts || {};
    return {
      module: PersistenceModule,
      imports: [
        TypeOrmPersistenceModule.forRoot({
          migrations,
          entities: [Content, Movie, Thumbnail, Video, TvShow, Episode],
        }),
      ],
      providers: [ContentRepository, MovieRepository, VideoRepository],
      exports: [ContentRepository, MovieRepository, VideoRepository],
    };
  }
}
