import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { cardMessage } from '../types';

export class CardDto implements cardMessage {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  expMonth: number;

  @IsNumber()
  expYear: number;

  @IsCreditCard()
  number: string;
}
