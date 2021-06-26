import { Schema, model } from 'mongoose';
import { Chat } from '../interfaces/chat-interface';

const chatSchema = new Schema<Chat>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    username: {
      type: String,
    },
    type: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const ChatModel = model<Chat>('Chat', chatSchema);

export { ChatModel };
