/* eslint-disable prettier/prettier */
import { AbstractDocument } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  @Field()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
