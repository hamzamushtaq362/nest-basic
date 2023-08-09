import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkerDocument = HydratedDocument<Worker>;

@Schema()
export class Worker {
  @Prop()
  name: string;

  @Prop({ required: true })
  age: number;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);