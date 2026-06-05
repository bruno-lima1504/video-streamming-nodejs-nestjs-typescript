import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { DefaultTypeOrmRepository } from '@sharedModule/persistence/typeorm/repository/default-typeorm.repository';
import { Movie } from '@contentModule/persistence/entity/movie.entity';

@Injectable()
export class MovieRepository extends DefaultTypeOrmRepository<Movie> {
  constructor(@InjectDataSource('content') dataSource: DataSource) {
    super(Movie, dataSource.manager);
  }
}
