import { connect, connection } from 'mongoose';
import { green, yellow, red } from 'chalk';
import * as dotenv from 'dotenv';
import { Chat } from '../interfaces/chat-interface';
import { ChatModel } from '../models/chat-model';
dotenv.config();

export class DatabaseService {
  constructor() {
    this.onInit();
  }

  private onInit(): void {
    connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }).then(
      (mongoose) =>
        console.log(
          green('Mongoose default connection is open to', process.env.DB_URI)
        ),
      (error) => console.log(red(error))
    );

    connection.on('disconnected', () =>
      console.log(yellow('Mongoose default connection is disconnected'))
    );
  }

  async saveChat(chatData: Chat): Promise<Chat> {
    const chat = new ChatModel(chatData);
    await chat.save();
    return chatData;
  }

  async deleteChat(chat: Chat): Promise<Chat> {
    return ChatModel.findOneAndDelete({ id: chat.id });
  }
}
