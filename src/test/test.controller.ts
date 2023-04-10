/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 10:39:49
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-04-10 18:21:38
 * @FilePath: /note/Users/zeyu/Documents/work/nestjs-app/src/test/test.controller.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './schemas/test.schema';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    await this.testService.create(createTestDto);
  }
  @Get('goal')
  async findAllYearGoal(): Promise<object> {
    return this.testService.findAllYearGoal();
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.testService.delete(id);
  }
  @Get(':id')
  async addNotionBook(@Param('id') id: string): Promise<string> {
    return this.testService.addNotionBook(id);
  }
}
