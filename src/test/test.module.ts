import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { Test, TestSchema } from './schemas/test.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Test.name, schema: TestSchema, collection: 'test' },
    ]),
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
