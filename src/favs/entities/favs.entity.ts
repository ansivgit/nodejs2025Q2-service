import { Entity, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';

import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';

@Entity('favs')
export class Favs {
  @PrimaryColumn()
  readonly id: string = 'singleton';

  @ManyToMany(() => Artist, {
    cascade: false,
    eager: true,
  })
  @JoinTable({
    name: 'favs_artists',
    joinColumn: {
      name: 'favsId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artistId',
      referencedColumnName: 'id',
    },
  })
  artists: Artist[];

  @ManyToMany(() => Album, {
    cascade: false,
    eager: true,
  })
  @JoinTable({
    name: 'favs_albums',
    joinColumn: {
      name: 'favsId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'albumId',
      referencedColumnName: 'id',
    },
  })
  albums: Album[];

  @ManyToMany(() => Track, {
    cascade: false,
    eager: true,
  })
  @JoinTable({
    name: 'favs_tracks',
    joinColumn: {
      name: 'favsId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'trackId',
      referencedColumnName: 'id',
    },
  })
  tracks: Track[];

  constructor(favs: Favs) {
    Object.assign(this, favs);
  }
}
