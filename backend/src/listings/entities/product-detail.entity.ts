import {
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

export enum ProductCondition {
  NEW = 'new',
  USED = 'used',
  REFURBISHED = 'refurbished',
}

@Entity('product_details')
export class ProductDetail {
  @PrimaryColumn('uuid')
  listing_id: string;

  @OneToOne(() => Listing, (listing) => listing.product_detail)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column({ length: 100 })
  category: string;

  @Column({ length: 100, nullable: true })
  subcategory: string;

  @Column({ length: 100, nullable: true })
  brand: string;

  @Column({
    type: 'enum',
    enum: ProductCondition,
  })
  condition: ProductCondition;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: true })
  is_negotiable: boolean;

  @Column({ nullable: true })
  warranty_months: number;

  @CreateDateColumn()
  created_at: Date;
}
