import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  private messages = [];

  create(messageData: any) {
    const message = {
      id: Date.now().toString(),
      ...messageData,
      createdAt: new Date().toISOString(),
    };
    this.messages.push(message);
    return { success: true, message: 'Message sent successfully' };
  }

  findAll() {
    return this.messages;
  }

  getConversation(userId: string, otherUserId: string) {
    return this.messages.filter(
      m => (m.senderId === userId && m.receiverId === otherUserId) ||
           (m.senderId === otherUserId && m.receiverId === userId)
    );
  }
}
