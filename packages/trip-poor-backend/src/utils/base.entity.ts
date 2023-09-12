import { Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @CreateDateColumn('timestamp')
  createdAt: Date;

  @UpdateDateColumn('timestamp')
  updatedAt: Date;
}