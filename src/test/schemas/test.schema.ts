import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDocument = Test & Document;

@Schema()
export class Test extends Document {
  @Prop()
  instrument_name: string;

  @Prop()
  underlying_price: string;

  @Prop()
  quote_currency: string;

  @Prop()
  open_interest: string;
}

export const TestSchema = SchemaFactory.createForClass(Test);
