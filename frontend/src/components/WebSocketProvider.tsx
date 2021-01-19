import React, { useContext, createContext } from "react";
import { useDispatch } from "react-redux";
import { setChatlog } from "../redux/action";
import { Message } from "../redux/types";
import io from "socket.io-client";

export interface ChildProps {
  children: React.ReactNode;
}

const WebSocketContext = createContext<SocketIOClient.Socket | null>(null);

export const useWebSocketContext = () => useContext(WebSocketContext);

const WebSocketProvider: React.FC<ChildProps> = ({ children }: ChildProps) => {
  const dispatch = useDispatch();
  const socket: SocketIOClient.Socket = io.connect("http://localhost:3001", {
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    console.log("connected client");
  });

  // socket.on("update-chat", (chat: any) => {
  //   console.log(chat);
  //   const payload = JSON.parse(chat);
  //   dispatch(setChatlog(payload));
  // });
  // }

  return (
    <WebSocketContext.Provider value={socket}>
    <>{children}</>
    </WebSocketContext.Provider>
  );
};
export default WebSocketProvider;
