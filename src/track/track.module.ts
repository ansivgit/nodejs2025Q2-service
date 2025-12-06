import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track]) ],
  controllers: [ TrackController ],
  providers: [ TrackRepository, TrackService ],
  exports: [ TrackRepository, TrackService ],
})

export class TrackModule {}
