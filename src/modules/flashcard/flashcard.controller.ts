import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import {
  CreateFlashcardDto,
  UpdateFlashcardDto,
} from '../../shared/dtos/flashcard.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('flashcards')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.flashcardService.findAll(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createFlashcardDto: CreateFlashcardDto, @Request() req) {
    return this.flashcardService.create(createFlashcardDto, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFlashcardDto: UpdateFlashcardDto,
  ) {
    return this.flashcardService.update(id, updateFlashcardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.flashcardService.delete(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.flashcardService.findById(id);
  }
}
