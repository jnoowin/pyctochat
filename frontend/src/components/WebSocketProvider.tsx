import React, { useContext, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChatlog, sendMessage } from "../redux/action";
import { Message } from "../redux/types";
import io from "socket.io-client";
import axios from "axios";

export interface ChildProps {
  children: React.ReactNode;
}

interface WebSocketProps {
  socket: SocketIOClient.Socket;
  handleSendMessage: Function;
}

const socket: SocketIOClient.Socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
});

const WebSocketContext = createContext<WebSocketProps | null>(null);

const WebSocketProvider: React.FC<ChildProps> = ({ children }: ChildProps) => {
  const dispatch = useDispatch();

  const handleSendMessage = (message: Message) => {
    console.log("send");
    dispatch(sendMessage(message));
    socket.emit("send-message", message);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected client", socket.id);
      axios
        .get("http://localhost:3001/room/1")
        .then((chatlog) => dispatch(setChatlog(chatlog.data)))
        .catch((error) => console.log(error));
    });

    socket.on("get-message", (message: Message) => {
      console.log("receive", message);
      dispatch(sendMessage(message));
    });
  }, [dispatch]);
  return (
    <WebSocketContext.Provider value={{ socket: socket, handleSendMessage }}>
      <>{children}</>
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);

export default WebSocketProvider;
