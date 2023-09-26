import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { [key: string]: string | number } {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): { [key: string]: string } {
    return this.appService.getHealth();
  }
}
