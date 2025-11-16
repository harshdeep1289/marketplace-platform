import {
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

@Entity('service_details')
export class ServiceDetail {
  @PrimaryColumn('uuid')
  listing_id: string;

  @OneToOne(() => Listing, (listing) => listing.service_detail)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column({ length: 100 })
  service_type: string;

  @Column({ length: 100, nullable: true })
  subcategory: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  min_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  max_price: number;

  @Column({ length: 50, default: 'fixed' })
  price_unit: string; // fixed, hourly, daily, project

  @Column({ nullable: true })
  service_area: string;

  @Column({ default: false })
  is_remote: boolean;

  @Column({ nullable: true })
  experience_years: number;

  @Column({ type: 'text', nullable: true })
  certifications: string;

  @CreateDateColumn()
  created_at: Date;
}
