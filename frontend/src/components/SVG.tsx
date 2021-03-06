import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types/interfaces";
import { useCanvasContext } from "../components/CanvasProvider";

interface SendProps {
  handleSend: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

interface ClearProps {
  handleClear: () => void;
}

export const SendButton: React.FC<SendProps> = ({ handleSend }: SendProps) => {
  return (
    <svg
      className="btn-input border-2 border-b-0 rounded-tl-md"
      onClick={handleSend}
      viewBox="0 0 80 80"
      width="80"
      height="80"
    >
      <line x1="15" y1="35" x2="27" y2="35" stroke="black"></line>
      <line x1="27" y1="35" x2="27" y2="30" stroke="black"></line>
      <polygon
        points="15,30 15,50 65,50 65,30"
        fill="none"
        stroke="black"
      ></polygon>
      <polygon
        points="35,15 35,30 45,30 45,15 50,15 39,5 30,15"
        fill="dimgray"
        stroke="white"
        strokeWidth="2"
      ></polygon>
      <line x1="35" y1="36" x2="45" y2="36" stroke="black" />
      <line x1="35" y1="43" x2="45" y2="43" stroke="black" />
      <text className="font-mono" color="dimgray" x="23" y="70">
        SEND
      </text>
    </svg>
  );
};

export const EraseButton: React.FC<ClearProps> = ({
  handleClear,
}: ClearProps) => {
  return (
    <svg
      className="btn-input border-2 border-b-0 rounded-bl-md"
      onClick={handleClear}
      viewBox="0 0 80 80"
      width="80"
      height="80"
    >
      <line x1="15" y1="35" x2="27" y2="35" stroke="black"></line>
      <line x1="27" y1="35" x2="27" y2="30" stroke="black"></line>
      <polygon
        points="15,30 15,50 65,50 65,30"
        fill="none"
        stroke="black"
      ></polygon>
      <line
        x1="40"
        y1="15"
        x2="40"
        y2="25"
        stroke="dimgray"
        strokeWidth="5"
      ></line>

      <line
        x1="50"
        y1="30"
        x2="58"
        y2="22"
        stroke="dimgray"
        strokeWidth="5"
      ></line>
      <line
        x1="55"
        y1="40"
        x2="65"
        y2="40"
        stroke="dimgray"
        strokeWidth="5"
      ></line>
      <line
        x1="50"
        y1="50"
        x2="58"
        y2="58"
        stroke="dimgray"
        strokeWidth="5"
      ></line>
      <line
        x1="40"
        y1="55"
        x2="40"
        y2="65"
        stroke="dimgray"
        strokeWidth="5"
      ></line>
      <line
        x1="22"
        y1="22"
        x2="30"
        y2="30"
        stroke="dimgray"
        strokeWidth="5"
      ></line>
      <line
        x1="15"
        y1="40"
        x2="25"
        y2="40"
        stroke="dimgray"
        strokeWidth="5"
      ></line>
      <line
        x1="30"
        y1="50"
        x2="22"
        y2="58"
        stroke="dimgray"
        strokeWidth="5"
      ></line>
    </svg>
  );
};

export const CopyButton: React.FC = () => {
  const chatlog = useSelector((state: RootState) => state.chatlog.chatlog);
  const username = useSelector((state: RootState) => state.user.username);
  const canvasRef = useCanvasContext();

  const handleClick = () => {
    if (canvasRef) canvasRef.getRecent(chatlog, username);
  };

  return (
    <svg
      className="btn-input border-2 border-b-0"
      viewBox="0 0 80 80"
      width="80"
      height="80"
      onClick={handleClick}
    >
      <g transform="translate(0, 10)">
        <line x1="15" y1="35" x2="27" y2="35" stroke="black"></line>
        <line x1="27" y1="35" x2="27" y2="30" stroke="black"></line>
        <polygon
          points="15,30 15,50 65,50 65,30"
          fill="none"
          stroke="black"
        ></polygon>
        <g transform="rotate(180, 40, 20) translate(0, -10)">
          <polygon
            points="35,15 35,30 45,30 45,15 50,15 39,5 30,15"
            fill="dimgray"
            stroke="white"
            strokeWidth="2"
          ></polygon>
          <line x1="35" y1="36" x2="45" y2="36" stroke="black" />
          <line x1="35" y1="43" x2="45" y2="43" stroke="black" />
        </g>
      </g>
    </svg>
  );
};
