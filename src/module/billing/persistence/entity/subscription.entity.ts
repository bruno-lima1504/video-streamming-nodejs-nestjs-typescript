import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from '@sharedModule/persistence/typeorm/entity/default.entity';
import { SubscriptionStatus } from '@billingModule/core/enum/subscription-status.enum';
import { Plan } from '@billingModule/persistence/entity/plan.entity';

@Entity({ name: 'Subscription' })
export class Subscription extends DefaultEntity<Subscription> {
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions, { nullable: false })
  @JoinColumn({ name: 'planId' })
  plan: Plan;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    nullable: false,
    default: SubscriptionStatus.Inactive,
  })
  status: SubscriptionStatus;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date | null;

  @Column({ type: 'boolean', nullable: false, default: true })
  autoRenew: boolean;
}
