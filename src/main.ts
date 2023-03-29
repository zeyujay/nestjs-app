/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 00:58:20
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-29 20:25:38
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/main.ts
 * @Description:1111
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/tls/zeyujay.xyz.key'),
    cert: fs.readFileSync('/tls/zeyujay.xyz.crt'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
