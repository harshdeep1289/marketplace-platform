import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DealDetail } from './deal-detail.entity';
import { CouponDetail } from './coupon-detail.entity';
import { ProductDetail } from './product-detail.entity';
import { ServiceDetail } from './service-detail.entity';
import { Image } from './image.entity';

export enum ListingType {
  DEAL = 'deal',
  COUPON = 'coupon',
  PRODUCT = 'product',
  SERVICE = 'service',
}

export enum ListingStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
  EXPIRED = 'expired',
  SOLD = 'sold',
}

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.listings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: ListingType,
  })
  type: ListingType;

  @Column({ length: 500 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  base_price: number;

  @Column({ length: 100, nullable: true })
  location_city: string;

  @Column({ length: 100, nullable: true })
  location_state: string;

  @Column({ length: 100, default: 'India' })
  location_country: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  location_lat: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  location_lng: number;

  @Column({ default: false })
  is_online: boolean;

  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.ACTIVE,
  })
  status: ListingStatus;

  @Column({ default: 0 })
  views_count: number;

  @Column({ default: 0 })
  favorites_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date;

  // Relations to type-specific details
  @OneToOne(() => DealDetail, (detail) => detail.listing, { eager: true })
  deal_detail: DealDetail;

  @OneToOne(() => CouponDetail, (detail) => detail.listing, { eager: true })
  coupon_detail: CouponDetail;

  @OneToOne(() => ProductDetail, (detail) => detail.listing, { eager: true })
  product_detail: ProductDetail;

  @OneToOne(() => ServiceDetail, (detail) => detail.listing, { eager: true })
  service_detail: ServiceDetail;

  @OneToMany(() => Image, (image) => image.listing, { eager: true })
  images: Image[];
}
