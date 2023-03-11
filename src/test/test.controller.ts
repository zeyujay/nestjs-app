import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Response,
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

  @Get()
  async findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Test> {
    return this.testService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.testService.delete(id);
  }
}
