import React, { useContext, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChatlog, sendMessage } from "../actions/chatlog";
import { Message } from "../types/chatlog";
import io from "socket.io-client";
import axios from "axios";

export interface ChildProps {
  children: React.ReactNode;
}

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

  useEffect(() => {
    socket.on("connect", () => {
      axios
        .get("http://localhost:3001/room/1")
        .then((result) =>
          result.data.map((message: Message) => {
            message.date = new Date(message.date);
            return message;
          })
        )
        .then((chatlog) => dispatch(setChatlog(chatlog)))
        .catch((error) => console.log(error));
    });

    socket.on("get-message", (message: Message) => {
      dispatch(sendMessage(message));
    });
  }, [dispatch]);

  const handleSendMessage = (message: Message) => {
    dispatch(sendMessage(message));
    socket.emit("send-message", message);
  };

  return (
    <WebSocketContext.Provider value={{ socket: socket, handleSendMessage }}>
      <>{children}</>
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;

export const useWebSocketContext = () => useContext(WebSocketContext);
