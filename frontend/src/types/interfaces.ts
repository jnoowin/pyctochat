import { User, Room } from "../types/user";
import { Chatlog } from "../types/chatlog";

export interface ChildProps {
  children: React.ReactNode;
}

export interface RootState {
  chatlog: Chatlog;
  user: User & Room;
}
