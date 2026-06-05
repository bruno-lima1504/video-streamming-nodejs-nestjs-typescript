import { Module } from '@nestjs/common';
import { AdminMovieController } from '@contentModule/http/rest/contoller/admin-movie.controller';
import { MidiaPlayerController } from '@contentModule/http/rest/contoller/media-player.controller';
import { PersistenceModule } from '@contentModule/persistence/content-persistence.module';
import { ExternalMovieClient } from '@contentModule/http/rest/client/external-movie-rating/external-movie-rating.client';
import { ContentManagementService } from '@contentModule/core/service/content-management.service';
import { MidiaPlayerService } from '@contentModule/core/service/midia-player.service';
import { ConfigModule } from '@sharedModule/config/config.module';
import { HttpClientModule } from '@sharedModule/http-client/http-client.module';
import { AuthModule } from '@sharedModule/auth/auth.module';
import { AdminTvShowController } from '@contentModule/http/rest/contoller/admin-tv-show.controller';
import { AgeRecommendationService } from '@contentModule/core/service/age-recommendation.service';
import { VideoProfanityFilterService } from '@contentModule/core/service/video-profanity-filter.service';
import { VideoMetadataService } from '@contentModule/core/service/video-metadata.service';

@Module({
  imports: [
    PersistenceModule,
    ConfigModule.forRoot(),
    HttpClientModule,
    AuthModule,
  ],
  controllers: [
    AdminMovieController,
    MidiaPlayerController,
    AdminTvShowController,
  ],
  providers: [
    ContentManagementService,
    MidiaPlayerService,
    ExternalMovieClient,
    AgeRecommendationService,
    VideoMetadataService,
    VideoProfanityFilterService,
  ],
})
export class ContentModule {}
