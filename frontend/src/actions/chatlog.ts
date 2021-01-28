import {
  Message,
  SET_CHATLOG,
  SEND_MESSAGE,
  ChatActionTypes,
} from "../types/chatlog";

export function setChatlog(chatlog: Message[]): ChatActionTypes {
  return {
    type: SET_CHATLOG,
    payload: chatlog,
  };
}

export function sendMessage(message: Message): ChatActionTypes {
  return {
    type: SEND_MESSAGE,
    payload: message,
  };
}
