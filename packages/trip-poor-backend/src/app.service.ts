import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): { [key: string]: string | number } {
    const port = this.configService.get<number>('PORT', 0);
    const env = this.configService.get<string>('NODE_ENV', '');
    const result = {
      port: port,
      env: env,
    };

    return result;
  }

  getHealth(): { [key: string]: string } {
    return {
      status: 'ok',
    };
  }
}
