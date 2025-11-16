import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  listing_id: string;

  @ManyToOne(() => Listing, (listing) => listing.images)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'text', nullable: true })
  thumbnail_url: string;

  @Column({ default: false })
  is_primary: boolean;

  @Column({ default: 0 })
  display_order: number;

  @CreateDateColumn()
  created_at: Date;
}
