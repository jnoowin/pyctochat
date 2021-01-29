import { User, Room } from "../types/user";
import { Chatlog } from "../types/chatlog";

export interface RootState {
  chatlog: Chatlog;
  user: User & Room;
}
