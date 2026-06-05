import { Module } from '@nestjs/common';
import { ConfigModule } from '@sharedModule/config/config.module';
import { HttpClientModule } from '@sharedModule/http-client/http-client.module';
import { BillingSubscriptionHttpClient } from '@sharedModule/integration/client/billing-subscription-http.client';

@Module({
  imports: [ConfigModule.forRoot(), HttpClientModule],
  providers: [BillingSubscriptionHttpClient],
  exports: [BillingSubscriptionHttpClient],
})
export class DomainModuleIntegrationModule {}
