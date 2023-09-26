import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): { [key: string]: string | number } {
    const port = this.configService.get<number>('PORT', 0);
    const env = this.configService.get<string>('NODE_ENV', '');
    return {
      port: port,
      env: env,
    };
  }

  getHealth(): { [key: string]: string } {
    return {
      status: 'ok',
    };
  }
}
