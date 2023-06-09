/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 00:58:20
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-30 04:38:19
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/app.module.ts
 * @Description:111111
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
@Module({
  imports: [
    TestModule,
    MongooseModule.forRoot('mongodb://zeyujay.xyz:27017/test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
