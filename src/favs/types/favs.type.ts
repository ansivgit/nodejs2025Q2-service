import { Album } from 'src/album/types/album.type';
import { Artist } from 'src/artist/types/artist.type';
import { Track } from 'src/track/types/track.type';

export interface IFavs {
  artists: Album[];
  albums: Artist[];
  tracks: Track[];
}

export type FavsEntities = IFavs['artists'] | IFavs['albums'] | IFavs['tracks'];
export type FavsEntity = Album | Artist | Track;
