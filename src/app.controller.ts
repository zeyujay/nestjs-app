/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 00:58:20
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-25 00:23:02
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/app.controller.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':qustion')
  getHello(@Param('qustion') qustion: string): Promise<any[]> {
    return this.appService.getHello(qustion);
  }
}
