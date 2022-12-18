import { SendNotification } from "@application/use-cases/send-notification";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { NotificationsController } from "./kafka/controllers/notification.controllers";
import { KafkaConsumerService } from "./kafka/kafka-consumer.service";

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationsController],
})

export class MessagingModule {

}