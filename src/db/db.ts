import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favs } from 'src/favs/entities/favs.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { testData } from './testData';

@Injectable()
export class DataBase {
  public albums: Album[] = testData.albums;
  public artists: Artist[] = testData.artists;
  public favs: Favs = testData.favs;
  public tracks: Track[] = testData.tracks;
  public users: User[] = testData.users;
}
