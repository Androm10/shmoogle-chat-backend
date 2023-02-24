import { IGenericRepository } from '../abstracts/generic-repository.abstract';
import { ChatEntity } from '../entities/chat.entity';
import { MessageEntity } from '../entities/message.entity';

export interface IChatRepository extends IGenericRepository<ChatEntity> {
  getByUserId(id: string): Promise<ChatEntity[]>;
  create(item: CreateChatData): Promise<ChatEntity>;
  addMessage(chatId: string, message: AddMessageData): Promise<MessageEntity>;
  addUserToChat(chatId: string, userId: string): Promise<ChatEntity>;
  getMessages(chatId: string, userId: string): Promise<MessageEntity[]>;
}

export interface AddMessageData {
  text: string;
  creatorId: string;
  isResponseToId?: string;
}

export interface CreateChatData {
  name: string;
  users: string[];
  isGroup: boolean;
  creatorId: string;
}