import {
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

export enum CouponDiscountType {
  PERCENT = 'percent',
  FLAT = 'flat',
  CASHBACK = 'cashback',
  FREEBIE = 'freebie',
}

@Entity('coupon_details')
export class CouponDetail {
  @PrimaryColumn('uuid')
  listing_id: string;

  @OneToOne(() => Listing, (listing) => listing.coupon_detail)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column()
  brand_name: string;

  @Column({ type: 'text', nullable: true })
  store_url: string;

  @Column({ length: 100 })
  coupon_code: string;

  @Column({
    type: 'enum',
    enum: CouponDiscountType,
  })
  discount_type: CouponDiscountType;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount_value: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  min_order_value: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  max_discount: number;

  @Column({ nullable: true })
  usage_limit: number;

  @Column({ default: 0 })
  used_count: number;

  @Column({ type: 'date' })
  expiry_date: Date;

  @Column({ type: 'text', nullable: true })
  terms_conditions: string;

  @CreateDateColumn()
  created_at: Date;
}
