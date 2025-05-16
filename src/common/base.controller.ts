import { BaseService } from './base.service';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

export class BaseController<T> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Post()
  @ApiBody({ type: Object })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: Object })
  async create(@Body() data: T): Promise<T> {
    return this.baseService.create(data);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of records.', type: [Object] })
  async findAll(): Promise<T[]> {
    return this.baseService.findAll();
  }

  @Get()
  async findAllPaginated(@Query('skip') skip = 0, @Query('take') take = 10): Promise<T[]> {
    return this.baseService.paginate(Number(skip), Number(take));
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully retrieved.', type: Object })
  async findById(@Param('id') id: number): Promise<T> {
    return this.baseService.findById(id);
  }

  @Put(':id')
  @ApiBody({ type: Object })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.', type: Object })
  async update(@Param('id') id: number, @Body() data: T): Promise<T> {
    return this.baseService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.baseService.delete(id);
  }

  @Get('search/:field/:value')
  async search(@Param('field') field: keyof T, @Param('value') value: string): Promise<T[]> {
    return this.baseService.search(field, value);
  }
  @Post('filter')
  async filter(@Body() filter: any): Promise<T[]> {
    return this.baseService.filter(filter);
  }

}
