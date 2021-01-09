import { Chatlog, SET_CHATLOG, SEND_MESSAGE, ChatActionTypes } from "./types";

const initialState: Chatlog = {
  chatlog: [],
};

export default function reducer(
  state = initialState,
  action: ChatActionTypes
): Chatlog {
  console.log(state, action);
  switch (action.type) {
    case SET_CHATLOG:
      return { chatlog: action.payload };
    case SEND_MESSAGE:
      return { chatlog: [...state.chatlog, action.payload] };
    default:
      return state;
  }
}
