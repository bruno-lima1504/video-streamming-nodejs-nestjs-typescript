import { SubscriptionController } from '@billingModule/http/rest/controller/subscription.controller';
import { BillingPersistenceModule } from '@billingModule/persistence/billing-persistence.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BillingPersistenceModule],
  providers: [],
  controllers: [SubscriptionController],
  exports: [],
})
export class BillingModule {}
