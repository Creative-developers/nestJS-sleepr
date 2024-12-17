import {
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CardDto } from './card.dto';
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  @Field(() => CardDto)
  card: CardDto;

  @IsNumber()
  @Type(() => Number)
  @Field()
  amount: number;
}
