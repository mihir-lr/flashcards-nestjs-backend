import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ShareService } from './share.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GenerateShareLinkDto } from 'src/shared/dtos/generate-share-link.dto';

@Controller('share-links')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generateShareLink(
    @Body() generateShareLinkDto: GenerateShareLinkDto,
    @Request() req,
  ) {
    const shareLink = await this.shareService.generateShareLink(
      req.user.sub,
      generateShareLinkDto.flashcardId,
    );
    return { link: shareLink.link };
  }
  @UseGuards(JwtAuthGuard)
  @Get(':token')
  async getSharedFlashcards(@Param('token') token: string, @Request() req) {
    const userId = req.user ? req.user.sub : undefined;
    return this.shareService.getSharedFlashcards(token, userId);
  }
}
