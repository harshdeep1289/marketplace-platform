import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { Listing } from './entities/listing.entity';
import { DealDetail } from './entities/deal-detail.entity';
import { CouponDetail } from './entities/coupon-detail.entity';
import { ProductDetail } from './entities/product-detail.entity';
import { ServiceDetail } from './entities/service-detail.entity';
import { Image } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Listing,
      DealDetail,
      CouponDetail,
      ProductDetail,
      ServiceDetail,
      Image,
    ]),
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
