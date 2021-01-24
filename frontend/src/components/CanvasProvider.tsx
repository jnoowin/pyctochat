import React, { useState, useRef, useContext } from "react";
import { ChildProps } from "./WebSocketProvider";

interface CanvasProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  initCanvas: Function;
  startDrawing: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  finishDrawing: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  draw: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  clearCanvas: () => void;
  cleared: boolean;
}

const CanvasContext = React.createContext<CanvasProps | null>(null);

const CanvasProvider: React.FC<ChildProps> = ({ children }: ChildProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [cleared, setCleared] = useState(true);

  const initCanvas = () => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 848;
      canvas.height = 240;

      const context = canvas.getContext("2d");
      if (context) {
        context.scale(1, 1);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
      }
    }
  };

  const startDrawing = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef && contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setDrawing(true);
    }
    setCleared(false);
  };

  const finishDrawing = () => {
    if (contextRef && contextRef.current) {
      contextRef.current.closePath();
      setDrawing(false);
    }
  };

  const draw = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef && contextRef.current) {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setCleared(true);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        initCanvas,
        startDrawing,
        finishDrawing,
        draw,
        clearCanvas,
        cleared,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;

export const useCanvasContext = () => useContext(CanvasContext);
