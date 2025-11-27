import { Controller, Post, Body, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() messageData: any) {
    return this.messagesService.create(messageData);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get('conversation/:userId')
  getConversation(@Body() body: { userId: string; otherUserId: string }) {
    return this.messagesService.getConversation(body.userId, body.otherUserId);
  }
}
