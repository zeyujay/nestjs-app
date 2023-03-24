/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 00:58:20
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-24 23:48:13
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/main.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
