import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/persistence/prisma/prisma.service';

@Injectable()
export class MidiaPlayerService {
  constructor(private readonly prismaService: PrismaService) {}

  async PrepareStreaming(videoId: string) {
    const video = await this.prismaService.video.findUnique({
      where: { id: videoId },
    });

    return video?.url;
  }
}
