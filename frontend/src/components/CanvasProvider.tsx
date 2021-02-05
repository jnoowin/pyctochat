import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { ChildProps } from "../types/interfaces";

interface CanvasProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  initCanvas: () => void;
  startDrawing: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  finishDrawing: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  draw: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  clearCanvas: () => void;
  cleared: boolean;
  handleTyping: (e: KeyboardEvent | { key: string }) => void;
}

const CanvasContext = React.createContext<CanvasProps | null>(null);

const CanvasProvider: React.FC<ChildProps> = ({ children }: ChildProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const typingRef = useRef({
    text: "",
    textWidth: 120,
    offset: { x: 120, y: 0 },
    textArr: new Array<{ textWidth: number; text: string }>(),
  });
  const [drawing, setDrawing] = useState(false);
  const [cleared, setCleared] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const canvasElem = document.getElementById("canvas");
      if (canvasRef && canvasRef.current && canvasElem) {
        canvasRef.current.width = canvasElem.scrollWidth;
        drawLines();
      }
    });
  }, []);

  const initCanvas = () => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 650;
      canvas.height = 200;
      const context = canvas.getContext("2d");
      if (context) {
        drawLines(context);
        context.scale(1, 1);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        context.font = "2rem Arial";
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
        context.fillStyle = "black";
        drawLines();

        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        context.font = "2rem Arial";

        typingRef.current.text = "";
        typingRef.current.textWidth = 0;

        setCleared(true);
      }
    }
  };

  const getLines = (newLine: boolean): void => {
    const ref = typingRef.current;
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (ref && context && canvas) {
      if (newLine) {
        ref.offset.x = 0;
        ref.offset.y += canvas.height / 5;
        ref.textArr.push({ text: ref.text, textWidth: ref.textWidth });
        ref.text = "";
        ref.textWidth = 0;
      } else {
        const lastLine = ref.textArr.pop();
        if (lastLine) {
          ref.offset.y -= canvas.height / 5;
          ref.text = lastLine!.text;
          ref.textWidth = lastLine!.textWidth;

          if (ref.textArr.length === 0) {
            ref.offset.x = 120;
          }
        }
      }
    }
  };

  const typingCallback = (e: KeyboardEvent | { key: string }) => {
    const ref = typingRef.current;
    const context = contextRef.current;
    const canvas = canvasRef.current;

    if (canvas && context) {
      if (ref.textArr.length < 5 && (e.key === "Space" || e.key.length === 1)) {
        if (ref.textWidth + context.measureText(e.key).width >= canvas.width)
          getLines(true);

        ref.text += e.key;
        ref.textWidth += context.measureText(e.key).width;

        context.strokeStyle = "white";
        context.strokeText(ref.text, ref.offset.x, ref.offset.y);
        context.strokeStyle = "black";
        context.fillText(ref.text, ref.offset.x, ref.offset.y);
        setCleared(false);
      } else if (e.key === "Backspace" && ref.text.length > 0) {
        context.strokeStyle = "white";
        context.strokeText(ref.text, ref.offset.x, ref.offset.y);
        context.strokeStyle = "black";

        ref.textWidth -= context.measureText(
          ref.text[ref.text.length - 1]
        ).width;
        ref.text = ref.text.substring(0, ref.text.length - 1);

        context.fillText(ref.text, ref.offset.x, ref.offset.y);

        if (ref.textWidth <= 0) getLines(false);
      } else if (e.key === "Backspace") {
        setCleared(true);
      }
    }
  };

  const handleTyping = useCallback(typingCallback, []);

  useEffect(() => {
    document.addEventListener("keydown", handleTyping, false);
    if (canvasRef && canvasRef.current)
      typingRef.current.offset.y = canvasRef.current.height / 5 - 5;
    return () => document.removeEventListener("keydown", handleTyping, false);
  }, [handleTyping]);

  const drawLines = (context?: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;

    if (canvas) {
      const height = canvas.height;
      for (let h = height / 5; h < height; h += height / 5) {
        if (context) {
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(0, h);
          context.lineTo(canvas.width, h);
          context.stroke();
          context.closePath();
        } else {
          contextRef.current!.lineWidth = 1;
          contextRef.current!.beginPath();
          contextRef.current!.moveTo(0, h);
          contextRef.current!.lineTo(canvas.width, h);
          contextRef.current!.stroke();
          contextRef.current!.closePath();
        }
      }
    }
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
        handleTyping,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;

export const useCanvasContext = () => useContext(CanvasContext);
