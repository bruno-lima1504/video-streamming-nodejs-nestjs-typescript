import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from '@sharedModule/persistence/typeorm/entity/default.entity';
import { PlanInterval } from '@billingModule/core/enum/plan-interval.enum';
import { Subscription } from '@billingModule/persistence/entity/subscription.entity';

@Entity({ name: 'Plan' })
export class Plan extends DefaultEntity<Plan> {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string | null;

  @Column({ type: 'numeric', nullable: false })
  amount: string;

  @Column({ type: 'varchar', length: 3, nullable: false })
  currency: string;

  @Column({ type: 'enum', enum: PlanInterval, nullable: false })
  interval: PlanInterval;

  @Column({ type: 'integer', nullable: true })
  trialPeriod: number | null;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
