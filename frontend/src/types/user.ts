export const SET_USER = "SET_USER";
export const SET_ROOM = "SET_ROOM";

interface Username {
  username: string;
}

interface Color {
  color: string;
}

export type User = Username & Color;

export interface Room {
  room: string;
}

interface SetUserAction {
  type: typeof SET_USER;
  fieldname: string;
  payload: string;
}

interface SetRoomAction {
  type: typeof SET_ROOM;
  payload: string;
}

export type UserDetailActionTypes = SetUserAction | SetRoomAction;
