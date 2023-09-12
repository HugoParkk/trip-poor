import { Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn('timestamp')
  @Column()
  createdAt: Date;

  @UpdateDateColumn('timestamp')
  @Column()
  updatedAt: Date;
}
