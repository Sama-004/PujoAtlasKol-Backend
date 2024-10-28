import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pujo } from 'src/pujo/entity/pujo.entity';

@Entity()
export class Metro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  lat: number;

  @Column('float')
  lon: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  station_code?: string;

  @Column('simple-array')
  line: string[];

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  @OneToMany(() => Pujo, (pujo) => pujo.metro)
  pujos: Pujo[];
}

export class MetroDto {
  id: string; // Change to string type
  lat: number;
  lon: number;
  name: string;
  station_code?: string;
  line: string[];
  created_at: number;
  updated_at: number;
}
