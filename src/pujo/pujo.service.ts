import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Pujo } from './entity/pujo.entity';
import { CreatePujoDto, UpdatePujoDto, SearchPujoDto } from './pujo.dto';

@Injectable()
export class PujoService {
  constructor(
    @InjectRepository(Pujo)
    private pujoRepository: Repository<Pujo>
  ) {}

  async findAll(): Promise<Pujo[]> {
    return await this.pujoRepository.find({
      relations: ['metro', 'last_scores'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(createPujoDto: CreatePujoDto): Promise<Pujo> {
    const pujo = this.pujoRepository.create(createPujoDto);
    return await this.pujoRepository.save(pujo);
  }

  async findOne(uuid: string): Promise<Pujo> {
    const pujo = await this.pujoRepository.findOne({
      where: { id: uuid },
      relations: ['metro', 'last_scores'],
    });

    if (!pujo) {
      throw new NotFoundException(`Pujo with UUID "${uuid}" not found`);
    }

    return pujo;
  }

  async update(uuid: string, updatePujoDto: UpdatePujoDto): Promise<Pujo> {
    const pujo = await this.findOne(uuid);

    Object.assign(pujo, updatePujoDto);
    pujo.updated_at = new Date();

    return await this.pujoRepository.save(pujo);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.pujoRepository.delete(uuid);

    if (result.affected === 0) {
      throw new NotFoundException(`Pujo with UUID "${uuid}" not found`);
    }
  }

  async trending(): Promise<Pujo[]> {
    return await this.pujoRepository.find({
      relations: ['metro', 'last_scores'],
      order: {
        search_score: 'DESC',
      },
      take: 10,
    });
  }

  async increaseSearchScore(uuid: string): Promise<Pujo> {
    const pujo = await this.findOne(uuid);

    pujo.search_score += 1;
    pujo.updated_at = new Date();

    return await this.pujoRepository.save(pujo);
  }

  async searchPujo(searchPujoDto: SearchPujoDto): Promise<Pujo[]> {
    const { query } = searchPujoDto;

    return await this.pujoRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { address: ILike(`%${query}%`) },
        { city: ILike(`%${query}%`) },
        { zone: ILike(`%${query}%`) },
      ],
      relations: ['metro', 'last_scores'],
      order: {
        search_score: 'DESC',
      },
    });
  }
}
