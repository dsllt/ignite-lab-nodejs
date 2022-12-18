import { Content } from "@application/entities/content";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { Notification } from "@application/entities/notifications"
import { makeNotification } from "@test/factories/notification-factory";
import { GetRecipientNotifications } from "./get-recipient-notificaitions";



describe('Get recipient notification', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-2'}))

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    })


    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({recipientId: 'recipient-1'}),
      expect.objectContaining({recipientId: 'recipient-1'}),
    ]));
  })

})