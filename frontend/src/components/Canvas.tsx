import React, { useEffect } from "react";
import { useCanvasContext } from "./CanvasProvider";

const Canvas: React.FC = () => {
  const canvasContext = useCanvasContext();

  useEffect(() => {
    if (canvasContext) canvasContext.initCanvas();
    console.log(canvasContext);
  }, []);

  return (
    <canvas
      className="canvas-area"
      style={{ width: "53rem" }}
      onMouseDown={canvasContext?.startDrawing}
      onMouseUp={canvasContext?.finishDrawing}
      onMouseMove={canvasContext?.draw}
      ref={canvasContext?.canvasRef}
      id="canvas"
    ></canvas>
  );
};

export default Canvas;
