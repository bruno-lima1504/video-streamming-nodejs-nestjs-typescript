import { Inject, Injectable } from '@nestjs/common';
import { DefaultTypeOrmRepository } from '@sharedModule/persistence/typeorm/repository/default-typeorm.repository';
import { Plan } from '../entity/plan.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PlanRepository extends DefaultTypeOrmRepository<Plan> {
  constructor(@Inject('billing') dataSource: DataSource) {
    super(Plan, dataSource.manager);
  }
}
