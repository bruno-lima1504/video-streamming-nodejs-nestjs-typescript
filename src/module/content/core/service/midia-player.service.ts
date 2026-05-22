/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { VideoRepository } from '@contentModule/persistence/repository/video.repository';
import { VideoNotFoundException } from '@contentModule/core/exception/video-not-found-exception';

@Injectable()
export class MidiaPlayerService {
  constructor(private readonly videoRepository: VideoRepository) {}

  async PrepareStreaming(videoId: string) {
    const video = await this.videoRepository.findOneById(videoId);

    if (!video) {
      throw new VideoNotFoundException(`video with id ${videoId} not found`);
    }

    return video.url;
  }
}
