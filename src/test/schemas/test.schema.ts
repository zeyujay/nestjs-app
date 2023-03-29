/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 10:15:30
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-30 00:33:21
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/test/schemas/test.schema.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDocument = Test & Document;

@Schema()
export class Test extends Document {
  @Prop()
  id: number;
  @Prop()
  notion_auth: string;
  @Prop({ type: 'object' })
  notion_database: object;
}

export const TestSchema = SchemaFactory.createForClass(Test);
