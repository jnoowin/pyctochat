import {
  SET_USER,
  SET_ROOM,
  User,
  Room,
  UserDetailActionTypes,
} from "../types/user";

const storedDetails: string | null = localStorage.getItem("user");
console.log(storedDetails);

let storedUser;
if (storedDetails) {
  storedUser = JSON.parse(storedDetails);
}

const initialState: User & Room = {
  username: storedUser ? storedUser.username : "",
  color: storedUser ? storedUser.color : "gray",
  room: "",
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
