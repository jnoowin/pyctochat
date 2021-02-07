import React, { useContext, createContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setChatlog, sendMessage } from "../actions/chatlog";
import { Message } from "../types/chatlog";
import io from "socket.io-client";
import { getChatlog } from "../api/api";
import { ChildProps } from "../types/interfaces";
import { useLocation } from "react-router-dom";

interface WebSocketProps {
  socket: SocketIOClient.Socket;
  handleSendMessage: (message: Message) => void;
}

const WebSocketContext = createContext<WebSocketProps | null>(null);

const WebSocketProvider: React.FC<ChildProps> = ({ children }: ChildProps) => {
  const dispatch = useDispatch();
  const pathid = useLocation().pathname.split("/")[2];
  const socketRef = useRef<WebSocketProps>({
    socket: io("http://localhost:3001", {
      transports: ["websocket", "polling"],
    }),
    handleSendMessage: function () {},
  });

  useEffect(() => {
    const socket = socketRef.current.socket;

    socket.on("connect", () => {
      socket.emit("join", pathid);
      getChatlog(pathid).then((chatlog) => dispatch(setChatlog(chatlog)));
    });

    socket.on("get-message", (message: Message) => {
      dispatch(sendMessage(message));
    });

    socketRef.current.socket = socket;

    socketRef.current.handleSendMessage = (message: Message) => {
      dispatch(sendMessage(message));
      socket.emit("send-message", message);
    };
  }, [dispatch, pathid]);

  return (
    <WebSocketContext.Provider value={socketRef.current}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;

export const useWebSocketContext = () => useContext(WebSocketContext);
