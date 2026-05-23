import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserManagementService } from './core/service/user-management.service';
import { AuthResolver } from './http/graphql/auth.resolver';
import { UserResolver } from './http/graphql/user.resolver';
import {
  AuthService,
  jwtConstants,
} from '@identityModule/core/service/authentication.service';
import { IdentityPersistenceModule } from './persistence/identity-persistence.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    IdentityPersistenceModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserResolver,
    UserManagementService,
  ],
})
export class IdentityModule {}
