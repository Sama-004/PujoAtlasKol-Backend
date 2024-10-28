import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PujoService } from './pujo.service';
import { CreatePujoDto, UpdatePujoDto, SearchPujoDto } from './pujo.dto';

@Controller('pujo')
export class PujoController {
  constructor(private readonly pujoService: PujoService) {}

  @Get('list')
  async findAll() {
    return await this.pujoService.findAll();
  }

  @Post('add')
  async create(@Body() createPujoDto: CreatePujoDto) {
    return await this.pujoService.create(createPujoDto);
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return await this.pujoService.findOne(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updatePujoDto: UpdatePujoDto
  ) {
    return await this.pujoService.update(uuid, updatePujoDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return await this.pujoService.remove(uuid);
  }

  @Get('list/trending')
  async trending() {
    return await this.pujoService.trending();
  }

  @Post('searched')
  async increaseSearchScore(@Body() body: { uuid: string }) {
    return await this.pujoService.increaseSearchScore(body.uuid);
  }

  @Post('search')
  async searchPujo(@Body() searchPujoDto: SearchPujoDto) {
    return await this.pujoService.searchPujo(searchPujoDto);
  }
}
