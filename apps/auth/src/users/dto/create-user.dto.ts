import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Field(() => [String], { nullable: true })
  roles?: string[];
}
