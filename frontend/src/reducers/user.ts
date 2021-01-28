import {
  SET_USER,
  SET_ROOM,
  User,
  Room,
  UserDetailActionTypes,
} from "../types/user";
import { nanoid } from "nanoid";

const initialState: User & Room = {
  username: "",
  color: "gray",
  room: nanoid(8),
};

export default function user(
  state = initialState,
  action: UserDetailActionTypes
): User & Room {
  switch (action.type) {
    case SET_USER:
      return { ...state, [action.fieldname]: action.payload };
    case SET_ROOM:
      return { ...state, room: action.payload };
    default:
      return state;
  }
}
