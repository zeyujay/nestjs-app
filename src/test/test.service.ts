import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestDto } from './dto/create-test.dto';
import { Test, TestDocument } from './schemas/test.schema';

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

  async delete(id: string) {
    const deletedtest = await this.testModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedtest;
  }
}
