import { Module } from '@nestjs/common';
import { PrismaService } from '@src/persistence/prisma/prisma.service';
import { ContentController } from '@src/http/rest/contoller/content.controller';
import { MidiaPlayerService } from '@src/core/service/midia-player.service';
import { ContentManagementService } from '@src/core/service/content-management.service';
import { ContentRepository } from '@src/persistence/repository/content.repository';
import { VideoRepository } from '@src/persistence/repository/video.repository';
import { MidiaPlayerController } from '@src/http/rest/contoller/media-player.controller';
import { ConfigModule } from './infra/module/config/config.module';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ContentController, MidiaPlayerController],
  providers: [
    PrismaService,
    ContentManagementService,
    MidiaPlayerService,
    ContentRepository,
    VideoRepository,
  ],
})
export class AppModule {}
