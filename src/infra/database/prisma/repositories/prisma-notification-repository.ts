import { Notification } from "src/application/entities/notifications";
import { NotificationsRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mapper/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notification = await this.prisma.notification.findMany({
      where: {
        recipientId
      },
    });

    return notification.map(PrismaNotificationMapper.toDomain)
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if(!notification){
      return null
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId
      }
    })
    return count;
  }

  // async create(notification: Notification): Promise<void> {
  //   const raw = PrismaNotificationMapper.toPrisma(notification);
  //   await this.prisma.notification.create({
  //     data: raw
  //   })
  // }
  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt
      }
    })
  }
  
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw
    })
  }
}