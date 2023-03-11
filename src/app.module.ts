import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    TestModule,
    MongooseModule.forRoot('mongodb://43.206.19.9:27017/test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
