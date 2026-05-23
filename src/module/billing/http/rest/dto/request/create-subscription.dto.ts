import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubscriptionRequestDto {
  @IsUUID()
  @IsNotEmpty()
  readonly planId: string;
}
