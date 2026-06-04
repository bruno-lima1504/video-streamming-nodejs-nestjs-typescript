import { Module } from '@nestjs/common';
import { ConfigModule } from '@sharedModule/config/config.module';
import { ConfigService } from '@sharedModule/config/service/config.service';
import { TypeOrmPersistenceModule } from '@sharedModule/persistence/typeorm/typeorm-persistence.module';
import { DataSource } from 'typeorm';
import { dataSourceOptionsFactory } from '@billingModule/persistence/typeorm-datasource.factory';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { PlanRepository } from '@billingModule/persistence/repository/plan.repository';
import { SubscriptionRepository } from '@billingModule/persistence/repository/subscription.repository';

@Module({
  imports: [
    TypeOrmPersistenceModule.forRoot({
      imports: [ConfigModule.forRoot()],
      name: 'billing',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return dataSourceOptionsFactory(configService);
      },
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource({
          name: options.name,
          dataSource: new DataSource(options),
        });
      },
    }),
  ],
  providers: [PlanRepository, SubscriptionRepository],
  exports: [PlanRepository, SubscriptionRepository],
})
export class BillingPersistenceModule {}
