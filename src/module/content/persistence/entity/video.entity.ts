import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Episode } from '@contentModule/persistence/entity/episode.entity';
import { Movie } from '@contentModule/persistence/entity/movie.entity';
import { DefaultEntity } from '@contentModule/infra/module/typeorm/entity/default.entity';

@Entity({ name: 'Video' })
export class Video extends DefaultEntity<Video> {
  @Column()
  url: string;

  @Column()
  sizeInKb: number;

  @Column()
  duration: number;

  @OneToOne(() => Movie, (movie) => movie.video)
  @JoinColumn()
  movie: Movie;

  @OneToOne(() => Episode, (episode) => episode.video)
  @JoinColumn()
  episode: Episode;
}
