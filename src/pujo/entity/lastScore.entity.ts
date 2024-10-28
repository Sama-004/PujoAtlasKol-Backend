import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Pujo } from './pujo.entity';

@Entity()
export class LastScore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pujo, (pujo) => pujo.last_scores, { onDelete: 'CASCADE' })
  pujo: Pujo;

  @Column()
  name: string;

  @Column({ type: 'float' })
  value: number;

  @UpdateDateColumn()
  last_updated_at: Date;
}
