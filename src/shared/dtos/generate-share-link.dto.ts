import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateShareLinkDto {
  @IsNotEmpty()
  @IsString()
  flashcardId: string;
}
