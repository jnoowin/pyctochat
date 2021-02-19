import {
  Chatlog,
  SET_CHATLOG,
  SEND_MESSAGE,
  ChatActionTypes,
} from "../types/chatlog";

const initialState: Chatlog = {
  chatlog: [],
};

export default function chatlog(
  state = initialState,
  action: ChatActionTypes
): Chatlog {
  switch (action.type) {
    case SET_CHATLOG:
      return { chatlog: action.payload };
    case SEND_MESSAGE:
      return { chatlog: [action.payload, ...state.chatlog] };
    default:
      return state;
  }
}
