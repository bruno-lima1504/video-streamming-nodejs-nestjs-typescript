import { Module } from '@nestjs/common';
import { VideoUploadController } from '@contentModule/http/rest/contoller/video-upload.controller';
import { ContentRepository } from '@contentModule/persistence/repository/content.repository';
import { VideoRepository } from '@contentModule/persistence/repository/video.repository';
import { MidiaPlayerController } from '@contentModule/http/rest/contoller/media-player.controller';
import { PersistenceModule } from '@contentModule/persistence/persistence.module';
import { externalMovieClient } from '@contentModule/http/rest/client/external-movie-rating/external-movie-rating.client';
import { ContentManagementService } from '@contentModule/core/service/content-management.service';
import { MidiaPlayerService } from '@contentModule/core/service/midia-player.service';
import { ConfigModule } from '@sharedModule/config/config.module';
import { HttpClientModule } from '@sharedModule/http-client/http-client.module';

@Module({
  imports: [
    PersistenceModule.forRoot(),
    ConfigModule.forRoot(),
    HttpClientModule,
  ],
  controllers: [VideoUploadController, MidiaPlayerController],
  providers: [
    ContentManagementService,
    MidiaPlayerService,
    ContentRepository,
    VideoRepository,
    externalMovieClient,
  ],
})
export class ContentModule {}
