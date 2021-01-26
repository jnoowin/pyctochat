export const SET_CHATLOG = "SET_CHATLOG";
export const SEND_MESSAGE = "SEND_MESSAGE";

export interface Message {
  user: string;
  canvas: string;
  date: Date;
}

export interface Chatlog {
  chatlog: Message[];
}

interface SetChatlogAction {
  type: typeof SET_CHATLOG;
  payload: Message[];
}

interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: Message;
}

export type ChatActionTypes = SetChatlogAction | SendMessageAction;
