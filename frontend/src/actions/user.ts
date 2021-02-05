import { SET_USER, SET_ROOM, UserDetailActionTypes } from "../types/user";

export function setUser(
  user: string,
  fieldname: string
): UserDetailActionTypes {
  return {
    type: SET_USER,
    payload: user,
    fieldname,
  };
}

export function setRoom(room: string): UserDetailActionTypes {
  return {
    type: SET_ROOM,
    payload: room,
  };
}
