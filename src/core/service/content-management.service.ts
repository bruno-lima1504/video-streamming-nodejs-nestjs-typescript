import { Injectable } from '@nestjs/common';
import { VideoDAO } from '../dao/video.dao';
import { ContentEntity, ContentType } from '../entity/content.entity';
import { MovieEntity } from '../entity/movie.entity';
import { VideoEntity } from '../entity/video.entity';
import { ThumbnailEntity } from '../entity/thumbnail.entity';

export interface CreateContentData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  sizeInKb: number;
}

@Injectable()
export class ContentManagementService {
  constructor(private readonly videoDAO: VideoDAO) {}

  async createContent(createContentData: CreateContentData) {
    const content = ContentEntity.createNew({
      title: createContentData.title,
      description: createContentData.title,
      type: ContentType.MOVIE,
      media: MovieEntity.createNew({
        video: VideoEntity.createNew({
          url: createContentData.url,
          sizeInKb: createContentData.sizeInKb,
          duration: 100,
        }),
        thumbnail: ThumbnailEntity.createNew({
          url: createContentData.thumbnailUrl,
        }),
      }),
    });

    //const createVideo = await this.videoDAO.create(createContentData);
    return createVideo;
  }
}
