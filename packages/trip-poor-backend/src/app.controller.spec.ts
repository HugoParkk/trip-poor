import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:[ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `./config/env/.${process.env.NODE_ENV}.env`,
      })],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return {"port": "PORT, "env": "env"}', () => {
      const result = {"port": "3003", "env": "test"};
      expect(appController.getHello()).toStrictEqual(result);
    });
  });

  describe('health', () => {
    it('should return {"status": "ok"}', () => {
      const result = {"status": "ok"};
      expect(appController.getHealth()).toStrictEqual(result);
    });
  });
});
