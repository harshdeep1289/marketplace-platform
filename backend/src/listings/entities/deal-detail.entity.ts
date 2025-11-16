import {
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

export enum DiscountType {
  PERCENT = 'percent',
  FLAT = 'flat',
  BOGO = 'bogo',
  BUNDLE = 'bundle',
}

@Entity('deal_details')
export class DealDetail {
  @PrimaryColumn('uuid')
  listing_id: string;

  @OneToOne(() => Listing, (listing) => listing.deal_detail)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  original_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  deal_price: number;

  @Column({
    type: 'enum',
    enum: DiscountType,
  })
  discount_type: DiscountType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discount_value: number;

  @Column({ nullable: true })
  quantity_available: number;

  @Column({ default: 0 })
  quantity_sold: number;

  @Column({ type: 'date' })
  expiry_date: Date;

  @Column({ type: 'text', nullable: true })
  terms_conditions: string;

  @CreateDateColumn()
  created_at: Date;
}
