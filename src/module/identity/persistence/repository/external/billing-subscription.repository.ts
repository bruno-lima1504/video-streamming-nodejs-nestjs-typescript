import { DefaultTypeOrmRepository } from '@sharedModule/persistence/typeorm/repository/default-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Subscription } from '@billingModule/persistence/entity/subscription.entity';
import { SubscriptionStatus } from '@billingModule/core/enum/subscription-status.enum';
import { BillingSubscriptionStatusApi } from '@sharedModule/integration/interface/billing-integration.interface';

@Injectable()
export class BillingSubscriptionRepository
  extends DefaultTypeOrmRepository<Subscription>
  implements BillingSubscriptionStatusApi
{
  constructor(
    @InjectDataSource('billing')
    dataSource: DataSource,
  ) {
    super(Subscription, dataSource.manager);
  }

  async isUserSubscriptionActive(userId: string): Promise<boolean> {
    try {
      const subscription = await this.findOne({
        where: {
          userId,
          status: SubscriptionStatus.Active,
        },
      });
      return !!subscription;
    } catch (error) {
      throw new Error(
        `Failed to check if user has an active subscription: ${error}`,
      );
    }
  }
}
