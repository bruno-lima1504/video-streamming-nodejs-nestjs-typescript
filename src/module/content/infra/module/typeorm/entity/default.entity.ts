import { randomUUID } from 'crypto';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
/**
 * Do not extend TypeORM's BaseEntity to avoid coupling with TypeORM
 */
export abstract class DefaultEntity<T> {
  constructor(data: Partial<T>) {
    Object.assign(this, data);
    this.id = this.id || randomUUID();
  }

  @BeforeInsert()
  beforInsert(): void {
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate(): void {
    this.updatedAt = new Date();
  }

  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  //TODO add soft remove
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
