/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 10:30:39
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-27 23:15:56
 * @FilePath: /nestjs-app/src/test/test.service.ts
 * @Description:
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
@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name)
    private readonly testModel: Model<TestDocument>,
  ) {}

  async create(createtestDto: CreateTestDto): Promise<Test> {
    const createdtest = await this.testModel.create(createtestDto);
    return createdtest;
  }

  async findAll(): Promise<Test[]> {
    return this.testModel.find().exec();
  }

  async findOne(id: string): Promise<Test> {
    return this.testModel.findOne({ _id: id }).exec();
  }
  async addNotionBook(id: string): Promise<string> {
    try {
      const obj = await getWeb(id);
      console.log('=============begin setItem', obj);
      if (obj?.code) {
        const result: any = await setItem(obj?.data, id);
        if (result.code && result.data.id) return result.message;
        else return result.message;
      } else {
        return obj.message;
      }
    } catch (error) {
      console.error(error.body);
      return error.body;
    }
  }
  async delete(id: string) {
    const deletedtest = await this.testModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedtest;
  }
}
