import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Thumbnail } from '@contentModule/persistence/entity//thumbnail.entity';
import { TvShow } from '@contentModule/persistence/entity/tv-show.entity';
import { Video } from '@contentModule/persistence/entity/video.entity';
import { DefaultEntity } from '@contentModule/infra/module/typeorm/entity/default.entity';

@Entity('episode')
export class Episode extends DefaultEntity<Episode> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  season: number;

  @Column()
  number: number;

  @ManyToOne(() => TvShow, (tvShow) => tvShow.episodes)
  tvShow: TvShow;

  @OneToOne(() => Thumbnail)
  @JoinColumn()
  thumbnail: Thumbnail;

  @OneToOne(() => Video, (video) => video.episode)
  video: Video;
}
