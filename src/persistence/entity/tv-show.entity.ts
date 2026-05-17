import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Content } from '@src/persistence/entity/content.entity';
import { Episode } from '@src/persistence/entity/episode.entity';

import { DefaultEntity } from '@src/infra/module/typeorm/entity/default.entity';
import { Thumbnail } from '@src/persistence/entity/thumbnail.entity';

@Entity({ name: 'TvShow' })
export class TvShow extends DefaultEntity<TvShow> {
  @OneToMany(() => Episode, (episode) => episode.tvShow)
  episodes: Episode[];

  @OneToOne(() => Content)
  @JoinColumn()
  content: Content;

  @OneToOne(() => Thumbnail)
  @JoinColumn()
  thumbnail: Thumbnail;
}
