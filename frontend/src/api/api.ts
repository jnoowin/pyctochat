import axios from "axios";
import { Message } from "../types/chatlog";

export function getChatlog(room: string) {
  return axios
    .get(`/api/room/${room}`)
    .then((result) =>
      result.data.map((message: Message) => {
        message.date = new Date(message.date);
        return message;
      })
    )
    .then((chatlog: Message[]) => {
      return chatlog;
    })
    .catch((error) => {
      console.log("Unable to retrieve chat", error);
      return [];
    });
}

export function createRoom(room: string) {
  return axios.post("/api/room/", { _id: room }).catch((error) => error.response);
}

export function checkRoom(room: string) {
  return axios
    .get("/api/room/", { params: { _id: room } })
    .catch((error) => error.response);
}
