import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from '../database';

@Entity()
export class Role extends AbstractEntity<Role> {
  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
