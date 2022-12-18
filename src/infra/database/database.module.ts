import { Module } from "@nestjs/common";
import { NotificationsRepository } from "src/application/repositories/notification-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationRepository } from "./prisma/repositories/prisma-notification-repository";

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository
    }
  ], 
  exports: [
    NotificationsRepository
  ]
})

export class DatabaseModule {}