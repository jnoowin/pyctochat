import axios from "axios";
import { Chatlog } from "../redux/types";

export function getChatlog() {
  axios
    .get("http://localhost:3001/room/1")
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}
