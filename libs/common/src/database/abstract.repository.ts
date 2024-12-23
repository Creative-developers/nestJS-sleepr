import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import {
  EntityManager,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const entity = await this.entityRepository.findOne({ where, relations });

    if (!entity) {
      this.logger.warn('Entity was not found with where', where);
      throw new NotFoundException('Entity was not found');
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const UpdateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );
    if (!UpdateResult.affected) {
      this.logger.warn('Entity was not found with where', where);
      throw new NotFoundException('Entity was not found');
    }

    return this.findOne(where);
  }

  async find(
    where?: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T[]> {
    return this.entityRepository.find({ where, relations });
  }

  async findOneAndDelete(where: FindOptionsWhere<T>): Promise<boolean> {
    const result = await this.entityRepository.delete(where);
    return result.affected > 0;
  }

  async deleteMany(where?: FindOptionsWhere<T>): Promise<boolean> {
    const result = await this.entityRepository.delete(where || {}); //DELETE ALL RECORDS eg: DELETE FROM TABLE
    return result.affected > 0;
  }
}
