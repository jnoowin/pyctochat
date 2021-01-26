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
      className="canvas-area mr-0 mb-0 w-full md:w-max"
      onMouseDown={canvasContext!.startDrawing}
      onMouseUp={canvasContext!.finishDrawing}
      onMouseMove={canvasContext!.draw}
      ref={canvasContext!.canvasRef}
      id="canvas"
    ></canvas>
  );
};

export default Canvas;
