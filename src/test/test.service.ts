/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 10:30:39
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-04-10 18:17:53
 * @FilePath: /note/Users/zeyu/Documents/work/nestjs-app/src/test/test.service.ts
 * @Description:1111
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestDto } from './dto/create-test.dto';
import { Test, TestDocument } from './schemas/test.schema';
import getWeb from './service/getWeb';
import setItem from './service/setItem';
import Notion from './service/notion';
@Injectable()
export class TestService {
  static status = 0;
  constructor(
    @InjectModel(Test.name)
    private readonly testModel: Model<TestDocument>,
  ) {}

  async create(createtestDto: CreateTestDto): Promise<Test> {
    const createdtest = await this.testModel.create(createtestDto);
    return createdtest;
  }

  async findAllYearGoal(): Promise<object> {
    //return this.testModel.find().exec();
    const authEntity = await this.findOne(1);
    console.log(authEntity);
    const auth = {
      auth: authEntity.notion_auth,
      databaseIdYear: authEntity.notion_database['Year'],
    };
    const notion = Notion.getInstance(auth.auth);
    try {
      const queryPageResult = await notion.queryPage(
        auth.databaseIdYear,
        'title',
        '',
      );
      if (queryPageResult?.results?.length > 0) {
        return {
          code: 0,
          message: '获取数据成功',
          data: queryPageResult.results,
        };
      } else {
        return {
          code: 1,
          message: '获取数据失败',
          data: null,
        };
      }
    } catch (error) {
      return {
        code: 1,
        message: error,
        data: null,
      };
    }
  }

  async findOne(id: number): Promise<Test> {
    return this.testModel.findOne({ id: id }).exec();
  }
  async addNotionBook(id: string): Promise<string> {
    if (TestService.status === 1) {
      console.log(TestService.status);
      return '正在操作';
    }
    TestService.status = 1;
    try {
      const obj = await getWeb(id);
      console.log('=============begin setItem', obj);
      if (obj?.code) {
        const authEntity = await this.findOne(1);
        console.log(authEntity);
        const auth = {
          auth: authEntity.notion_auth,
          databaseId: authEntity.notion_database[obj.data['类型']],
          databaseIdAll: authEntity.notion_database['All'],
          databaseIdYear: authEntity.notion_database['Year'],
        };
        const result: any = await setItem(Object.assign(obj?.data, auth), id);
        if (result.code && result.data.id) {
          TestService.status = 0;
          return result.message;
        } else {
          TestService.status = 0;
          return result.message;
        }
      } else {
        TestService.status = 0;
        return obj.message;
      }
    } catch (error) {
      console.error(error);
      TestService.status = 0;
      return error;
    }
  }
  async delete(id: string) {
    const deletedtest = await this.testModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedtest;
  }
}
