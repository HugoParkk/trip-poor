import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  
  getHello(): Object {
    const port = this.configService.get<number>("PORT", 0);
    const env = this.configService.get<string>("NODE_ENV", "");
    const testval = this.configService.get<string>("TEST_VAL", "");
    const path = `${__dirname}/config/env/.${process.env.NODE_ENV}.env`;
    return {
      port,
      env,
      testval,
      path
    };
  }
}
