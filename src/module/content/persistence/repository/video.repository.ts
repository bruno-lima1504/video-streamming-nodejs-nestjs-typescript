import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Video } from '@contentModule/persistence/entity/video.entity';
import { DefaultTypeOrmRepository } from '@sharedModule/persistence/typeorm/repository/default-typeorm.repository';

@Injectable()
export class VideoRepository extends DefaultTypeOrmRepository<Video> {
  constructor(@Inject('content') dataSource: DataSource) {
    super(Video, dataSource.manager);
  }
}
