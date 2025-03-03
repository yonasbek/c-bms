import { Repository, FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.repository.save(data as T);
  }
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find({ ...options });
    // return this.repository.find({ ...options, relations: this.getRelations() });
  }

  async findById(id: number): Promise<T | null> {
    return this.repository.findOne({ where: { id: id } as any });
    // return this.repository.findOne({ where: { id: id } as any, relations: this.getRelations() });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    await this.repository.delete(id);
    return true;
  }

  async search(field: keyof T, value: string): Promise<T[]> {
    return this.repository.find({ where: { [field]: value } as any });
  }

  async paginate(skip: number, take: number): Promise<T[]> {
    return this.repository.find({ skip, take });
  }

  // private getRelations(): string[] {
  //   if (this.repository.metadata.relations.length > 0) {
  //     return this.repository.metadata.relations.map(rel => rel.propertyName);
  //   }
  //   return [];
  // }
}
