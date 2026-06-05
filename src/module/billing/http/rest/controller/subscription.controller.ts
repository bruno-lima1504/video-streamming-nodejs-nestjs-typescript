import { NotFoundDomainException } from '@sharedLibs/core/exception/not-found-domain.exception';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { SubscriptionService } from '@billingModule/core/service/subscitpion.service';
import { CreateSubscriptionRequestDto } from '@billingModule/http/rest/dto/request/create-subscription.dto';
import { SubscriptionResponseDto } from '@billingModule/http/rest/dto/response/subscription-response.dto';
import { plainToInstance } from 'class-transformer';
import { BillingApiUserSubscriptionActiveResponseDto } from '@sharedModule/integration/http/dto/response/billing-api-subscription-status-response.dto';
import { UserSubscriptionActiveResponseDto } from '../dto/response/user-subscription-active-response.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async createSubscription(
    @Body() createSubscriptionRequest: CreateSubscriptionRequestDto,
  ): Promise<SubscriptionResponseDto> {
    try {
      const createdSubscription =
        await this.subscriptionService.createSubscription(
          createSubscriptionRequest,
        );
      return plainToInstance(
        SubscriptionResponseDto,
        { ...createdSubscription, ...{ plan: createdSubscription.plan } },
        { excludeExtraneousValues: true },
      );
    } catch (error) {
      if (error instanceof NotFoundDomainException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Get('/user/:userId/active')
  async isUserSubscriptionActive(
    userId: string,
  ): Promise<UserSubscriptionActiveResponseDto> {
    const isActive = this.subscriptionService.isUserSubscriptionActive(userId);
    return plainToInstance(
      BillingApiUserSubscriptionActiveResponseDto,
      { isActive },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
