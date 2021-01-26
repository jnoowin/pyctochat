import React, { useEffect } from "react";
import { useCanvasContext } from "./CanvasProvider";

const Canvas: React.FC = () => {
  const canvasContext = useCanvasContext();

  useEffect(() => {
    if (canvasContext) {
      canvasContext.initCanvas();
    }
  }, []);

  return (
    <canvas
      className="canvas-area mb-0"
      onMouseDown={canvasContext!.startDrawing}
      onMouseUp={canvasContext!.finishDrawing}
      onMouseMove={canvasContext!.draw}
      ref={canvasContext!.canvasRef}
      id="canvas"
    ></canvas>
  );
};

export default Canvas;
