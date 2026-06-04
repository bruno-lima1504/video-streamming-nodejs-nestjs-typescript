import { ContentModule } from '@contentModule/content.module';
import { IdentityModule } from '@identityModule/identity.module';
import { Module } from '@nestjs/common';
import { BillingModule } from '@billingModule/billing.module';

@Module({
  imports: [ContentModule, IdentityModule, BillingModule],
})
export class AppModule {}
