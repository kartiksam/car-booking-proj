import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { sendMessageDto } from './dto/create-chat.dto';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  //   @Post()
  //   create(@Body() createChatDto: sendMessageDto) {
  //     return this.chatService.create(createChatDto);
  //   }























  //   @Get()
  //   findAll() {
  //     return this.chatService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.chatService.findOne(+id);
  //   }

  //   // @Patch(':id')
  //   // update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
  //   //   return this.chatService.update(+id, updateChatDto);
  //   // }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.chatService.remove(+id);
  //   }
}
