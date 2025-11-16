import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing, ListingType } from './entities/listing.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
  ) {}

  async findAll(filters: {
    type?: ListingType;
    city?: string;
    page?: number;
    limit?: number;
  }) {
    const { type, city, page = 1, limit = 10 } = filters;
    const query = this.listingsRepository.createQueryBuilder('listing');

    if (type) {
      query.andWhere('listing.type = :type', { type });
    }

    if (city) {
      query.andWhere('listing.city = :city', { city });
    }

    query.skip((page - 1) * limit).take(limit);

    const [listings, total] = await query.getManyAndCount();

    return {
      data: listings,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const listing = await this.listingsRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return listing;
  }

  async create(createListingDto: CreateListingDto, userId: string) {
    const listing = this.listingsRepository.create({
      ...createListingDto,
      user_id: userId,
    });

    return await this.listingsRepository.save(listing);
  }

  async update(id: string, updateListingDto: UpdateListingDto, userId: string) {
    const listing = await this.findOne(id);

    if (listing.user_id !== userId) {
      throw new ForbiddenException('You can only update your own listings');
    }

    Object.assign(listing, updateListingDto);
    return await this.listingsRepository.save(listing);
  }

  async remove(id: string, userId: string) {
    const listing = await this.findOne(id);

    if (listing.user_id !== userId) {
      throw new ForbiddenException('You can only delete your own listings');
    }

    await this.listingsRepository.remove(listing);
    return { message: 'Listing deleted successfully' };
  }

  async findByUser(userId: string) {
    return await this.listingsRepository.find({
      where: { user_id: userId },
      relations: ['images'],
    });
  }
}
