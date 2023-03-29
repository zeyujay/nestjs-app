/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 00:58:20
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-30 04:48:33
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/main.ts
 * @Description:1111
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
async function bootstrap() {
  console.log(process.env.NODE_ENV);
  const httpsOptions =
    process.env.NODE_ENV === 'development'
      ? null
      : {
          key: fs.readFileSync('/tls/zeyujay.xyz.key'),
          cert: fs.readFileSync('/tls/zeyujay.xyz.crt'),
        };
  const app =
    process.env.NODE_ENV === 'development'
      ? await NestFactory.create(AppModule)
      : await NestFactory.create(AppModule, {
          httpsOptions,
        });

  app.enableCors();
  await app.listen(3002);
}
bootstrap();
