import { Module } from '@nestjs/common';
import { VideoUploadController } from '@src/http/rest/contoller/video-upload..controller';
import { MidiaPlayerService } from '@src/core/service/midia-player.service';
import { ContentManagementService } from '@src/core/service/content-management.service';
import { ContentRepository } from '@src/persistence/repository/content.repository';
import { VideoRepository } from '@src/persistence/repository/video.repository';
import { MidiaPlayerController } from '@src/http/rest/contoller/media-player.controller';
import { PersistenceModule } from '@src/persistence/persistence.module';
import { externalMovieClient } from '@src/http/rest/client/external-movie-rating/external-movie-rating.client';
import { HttpClient } from '@src/infra/http/client/http.client';
import { ConfigModule } from './infra/module/config/config.module';
@Module({
  imports: [PersistenceModule.forRoot(), ConfigModule.forRoot()],
  controllers: [VideoUploadController, MidiaPlayerController],
  providers: [
    ContentManagementService,
    MidiaPlayerService,
    ContentRepository,
    VideoRepository,
    externalMovieClient,
    HttpClient,
  ],
})
export class AppModule {}
