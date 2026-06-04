import { AuthService } from '@identityModule/core/service/authentication.service';
import { IdentityPersistenceModule } from '@identityModule/persistence/identity-persistence.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BillingSubscriptionHttpClient } from '@sharedModule/integration/client/billing-subscription-http.client';
import { BillingSubscriptionStatusApi } from '@sharedModule/integration/interface/billing-integration.interface';
import { DomainModuleIntegrationModule } from '@sharedModule/integration/domain-module-integration.module';
import { UserManagementService } from './core/service/user-management.service';
import { AuthResolver } from './http/graphql/auth.resolver';
import { UserResolver } from './http/graphql/user.resolver';
import { UserRepository } from './persistence/repository/user.repository';
import { AuthModule } from '@sharedModule/auth/auth.module';

@Module({
  imports: [
    IdentityPersistenceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    DomainModuleIntegrationModule,
    AuthModule,
  ],
  providers: [
    {
      provide: BillingSubscriptionStatusApi,
      useExisting: BillingSubscriptionHttpClient,
    },
    AuthService,
    AuthResolver,
    UserResolver,
    UserManagementService,
    UserRepository,
  ],
})
export class IdentityModule {}
