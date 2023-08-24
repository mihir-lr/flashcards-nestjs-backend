import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFlashcardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class UpdateFlashcardDto {
  title: string;
  question: string;
  answer: string;
}
