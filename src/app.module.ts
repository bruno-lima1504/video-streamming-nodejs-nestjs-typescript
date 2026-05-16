import { Module } from '@nestjs/common';
import { ContentController } from '@src/http/rest/contoller/content.controller';
import { MidiaPlayerService } from '@src/core/service/midia-player.service';
import { ContentManagementService } from '@src/core/service/content-management.service';
import { ContentRepository } from '@src/persistence/repository/content.repository';
import { VideoRepository } from '@src/persistence/repository/video.repository';
import { MidiaPlayerController } from '@src/http/rest/contoller/media-player.controller';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [PersistenceModule.forRoot()],
  controllers: [ContentController, MidiaPlayerController],
  providers: [
    ContentManagementService,
    MidiaPlayerService,
    ContentRepository,
    VideoRepository,
  ],
})
export class AppModule {}
