import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Video } from '@contentModule/persistence/entity/video.entity';
import { DefaultTypeOrmRepository } from '@sharedModule/persistence/typeorm/repository/default-typeorm.repository';

@Injectable()
export class VideoRepository extends DefaultTypeOrmRepository<Video> {
  constructor(@InjectDataSource('content') dataSource: DataSource) {
    super(Video, dataSource.manager);
  }
}
