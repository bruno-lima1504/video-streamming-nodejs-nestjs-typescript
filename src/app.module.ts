import { Module } from '@nestjs/common';
import { PrismaService } from '@src/persistence/prisma/prisma.service';
import { ContentController } from '@src/http/rest/contoller/content.controller';
import { MidiaPlayerService } from '@src/core/service/midia-player.service';
import { ContentManagementService } from '@src/core/service/content-management.service';
import { ContentRepository } from './persistence/repository/content.repository';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [
    PrismaService,
    ContentManagementService,
    MidiaPlayerService,
    ContentRepository,
  ],
})
export class AppModule {}
