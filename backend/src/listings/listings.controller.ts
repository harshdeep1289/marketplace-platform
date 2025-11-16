import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ListingType } from './entities/listing.entity';

@ApiTags('Listings')
@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all listings with filters' })
  @ApiQuery({ name: 'type', required: false, enum: ListingType })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('type') type?: ListingType,
    @Query('city') city?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.listingsService.findAll({ type, city, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single listing by ID' })
  async findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new listing' })
  async create(
    @Body() createListingDto: CreateListingDto,
    @GetUser() user: User,
  ) {
    return this.listingsService.create(createListingDto, user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a listing' })
  async update(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
    @GetUser() user: User,
  ) {
    return this.listingsService.update(id, updateListingDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a listing' })
  async remove(@Param('id') id: string, @GetUser() user: User) {
    return this.listingsService.remove(id, user.id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all listings by user' })
  async findByUser(@Param('userId') userId: string) {
    return this.listingsService.findByUser(userId);
  }
}
