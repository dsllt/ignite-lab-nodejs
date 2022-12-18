import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService 
  extends ServerKafka 
  implements OnModuleDestroy 
{
  constructor(){
    super({
      client: {
        clientId: 'notifications',
        brokers: ['assuring-pug-6896-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'YXNzdXJpbmctcHVnLTY4OTYkZmtnyHFCaY2GCyoDcMbGSKzBMaqZ-fCtuVys6C4',
          password: '26GFQpOXFSWwQ_zLkk-U0hhpSbZYfgXGjB3jU23c6E09PJ131Pkxwqe7SK9smpKqt3zX2g==',
        },
        ssl: true,
      },
    });
  }
  
  async onModuleDestroy() {
    await this.close();
  }
}