import { Module } from '@nestjs/common';
import { PujoController } from './pujo.controller';
import { PujoService } from './pujo.service';
import { DatabaseModule } from 'db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PujoController],
  providers: [PujoService],
})
export class PujoModule {}
