import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interfaces/track.interface';

export interface IFavs {
  artists: Album[];
  albums: Artist[];
  tracks: Track[];
}

export type FavsEntities = IFavs['artists'] | IFavs['albums'] | IFavs['tracks'];
export type FavsEntity = Album | Artist | Track;
