import {
  Arg,
  Ctx,
  Int,
  Mutation,
  PubSub,
  Publisher,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql'
import Notification from '../entities/notification'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { MyContext } from '../apollo/createApolloServer'

@Resolver(Notification)
export class NotificationResolver {
  @Query(() => [Notification], {
    description: '세션에 해당되는 유저의 모든 알림을 가져옴',
  })
  @UseMiddleware(isAuthenticated)
  async notifications(
    @Ctx() { verifiedUser }: MyContext,
  ): Promise<Notification[]> {
    const notifications = await Notification.find({
      where: { userId: verifiedUser.userId },
      order: { createdAt: 'DESC' },
    })
    return notifications
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Notification)
  async createNotification(
    @Arg('userId', () => Int) userId: number,
    @Arg('text') text: string,
    @PubSub('NOTIFICATION_CREATED') publish: Publisher<Notification>,
  ): Promise<Notification> {
    const newNoti = await Notification.create({
      text,
      userId,
    }).save()
    await publish(newNoti)
    return newNoti
  }
  @Subscription({
    topics: 'NOTIFICATION_CREATED',
    // 자기 자신에게 온 알림이 생성되었을 때만 실행되어야 함.
    filter: ({
      payload,
      context,
    }: ResolverFilterData<Notification, null, MyContext>) => {
      console.log('newNotification context: ', context)
      return true
      // if (payload && payload.userId === auth.userId) return true;
      // return false;
    },
  })
  newNotification(@Root() notificationPayload: Notification): Notification {
    // console.log('newNotification - ctx: ', ctx);
    return notificationPayload
  }
}
