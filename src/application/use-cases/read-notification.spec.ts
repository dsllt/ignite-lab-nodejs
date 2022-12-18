import { Content } from "@application/entities/content";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { ReadNotification } from "./read-notification";
import { Notification } from "@application/entities/notifications"
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";



describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
  })

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);


    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id'
      });
    }).rejects.toThrow(NotificationNotFound)
  })
})