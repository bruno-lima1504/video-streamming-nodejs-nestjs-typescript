import { SubscriptionController } from '@billingModule/http/rest/controller/subscription.controller';
import { BillingPersistenceModule } from '@billingModule/persistence/billing-persistence.module';
import { Module } from '@nestjs/common';
import { SubscriptionService } from '@billingModule/core/service/subscitpion.service';
import { BillingPublicApiProvider } from '@billingModule/integration/provider/billing-public-api.provider';

@Module({
  imports: [BillingPersistenceModule],
  providers: [SubscriptionService, BillingPublicApiProvider],
  controllers: [SubscriptionController],
  exports: [BillingPublicApiProvider],
})
export class BillingModule {}
