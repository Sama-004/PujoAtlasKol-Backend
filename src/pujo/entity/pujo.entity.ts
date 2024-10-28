import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Metro } from 'src/metro/metro.entity';
import { LastScore } from 'src/pujo/entity/lastScore.entity';

@Entity()
export class Pujo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'float', nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  lon: number;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  city: string;

  @Column({ length: 100 })
  zone: string;

  @Column({ type: 'float', default: 100.0 })
  search_score: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'float', nullable: true })
  nearest_metro_distance: number;

  @ManyToOne(() => Metro, (metro) => metro.pujos, { nullable: true })
  metro: Metro;

  @OneToMany(() => LastScore, (lastScore) => lastScore.pujo)
  last_scores: LastScore[];
}
