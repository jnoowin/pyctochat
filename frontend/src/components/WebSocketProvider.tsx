import React, { useContext, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChatlog, sendMessage } from "../actions/chatlog";
import { setRoom, setUser } from "../actions/user";
import { Message } from "../types/chatlog";
import { User } from "../types/user";
import io from "socket.io-client";
import { checkRoom, getChatlog } from "../api/api";
import { ChildProps } from "../types/interfaces";
import { useLocation, useHistory } from "react-router-dom";

interface WebSocketProps {
  socket: SocketIOClient.Socket;
  handleSendMessage: (message: Message) => void;
}

const socket: SocketIOClient.Socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
});

const WebSocketContext = createContext<WebSocketProps | null>(null);

const WebSocketProvider: React.FC<ChildProps> = ({ children }: ChildProps) => {
  const dispatch = useDispatch();
  const pathid = useLocation().pathname.split("/")[2];
  const history = useHistory();

  useEffect(() => {
    const userString: string | null = localStorage.getItem("user");
    if (userString) {
      const user: User = JSON.parse(userString);
      dispatch(setUser(user.username, "username"));
      dispatch(setUser(user.color, "color"));
    } else history.push("/");

    checkRoom(pathid).then((res) => {
      if (res && res.status !== 200) {
        history.push("/");
      }
    });
  }, [dispatch, history, pathid]);

  useEffect(() => {
    dispatch(setRoom(pathid));
    socket.on("connect", () => {
      socket.emit("join", pathid);
      getChatlog(pathid).then((chatlog) => dispatch(setChatlog(chatlog)));
    });

    socket.on("get-message", (message: Message) => {
      dispatch(sendMessage(message));
    });
  }, [dispatch, pathid]);

  const handleSendMessage = (message: Message) => {
    dispatch(sendMessage(message));
    socket.emit("send-message", message);
  };

  return (
    <WebSocketContext.Provider value={{ socket, handleSendMessage }}>
      <>{children}</>
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;

export const useWebSocketContext = () => useContext(WebSocketContext);
