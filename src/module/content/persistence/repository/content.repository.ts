import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DefaultTypeOrmRepository } from '@sharedModule/persistence/typeorm/repository/default-typeorm.repository';
import { DataSource } from 'typeorm';
import { Content } from '@contentModule/persistence/entity/content.entity';
import { MovieContentModel } from '@contentModule/core/model/movie-content.model';
import { TvShowContentModel } from '@contentModule/core/model/tv-show-cotent.model';

@Injectable()
export class ContentRepository extends DefaultTypeOrmRepository<Content> {
  constructor(@InjectDataSource('content') dataSource: DataSource) {
    super(Content, dataSource.manager);
  }

  async saveMovie(entity: MovieContentModel): Promise<MovieContentModel> {
    const content = new Content({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      type: entity.type,
      movie: entity.movie,
    });

    await super.save(content);

    return new MovieContentModel({
      id: content.id,
      title: content.title,
      description: content.description,
      ageRecommendation: entity.ageRecommendation,
      movie: content.movie!,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
      deletedAt: content.deletedAt,
    });
  }

  async saveTvShow(entity: TvShowContentModel): Promise<TvShowContentModel> {
    const content = new Content({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      type: entity.type,
      ageRecommendation: entity.ageRecommendation,
      tvShow: entity.tvShow,
    });
    await super.save(content);

    return new TvShowContentModel({
      id: content.id,
      title: content.title,
      description: content.description,
      tvShow: content.tvShow!,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
      deletedAt: content.deletedAt,
    });
  }

  async findTvShowContentById(
    id: string,
    relations: string[],
  ): Promise<TvShowContentModel | null> {
    const content = await super.findOneById(id, relations);
    if (!content) {
      return null;
    }
    return new TvShowContentModel({
      id: content.id,
      title: content.title,
      description: content.description,
      tvShow: content.tvShow!,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
      deletedAt: content.deletedAt,
    });
  }
}
