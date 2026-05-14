import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/persistence/prisma/prisma.service';

@Injectable()
export class PrepareStreamingUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<string | undefined> {
    const video = await this.prismaService.video.findUnique({
      where: { id },
    });

    return video?.url;
  }
}
