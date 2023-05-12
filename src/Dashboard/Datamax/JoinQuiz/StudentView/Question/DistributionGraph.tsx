import { useEffect, useRef } from "react";
import { DataElement, DataElementGenerator } from "../../../DatamaxTypes";

const DistributionGraph = ({ value, min, max, mean, std, generator }: DataElement) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const drawHeight = height / 3;
    const strokeWidth = 3;
    const markerHeight = 30;

    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(0, drawHeight - strokeWidth / 2, width, strokeWidth);

    if (generator === DataElementGenerator.NORMAL) {
      if (!mean || !std) return;
      ctx.fillStyle = "black";
      
      // draw the mean and std lines
      const meanX = width / 2;
      const stdLen = (width / 2) * (4 / 5) * (1 / 2);
      for (let i = -2; i <= 2; i++) {
        const stdX = meanX + i * stdLen;
        ctx.fillRect(stdX, drawHeight - markerHeight / 2, strokeWidth, markerHeight);
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${mean + std * i}`, stdX, height);
      }

      // draw the value circle
      let valueX;
      if (value < mean - 2 * std) {
        valueX = markerHeight;
      } else if (value > mean + 2 * std) {
        valueX = width - markerHeight;
      } else {
        valueX = (value - mean) / std * stdLen + meanX;
      }
      ctx.beginPath();
      ctx.arc(valueX, drawHeight, markerHeight/2, 0, 2 * Math.PI);
      ctx.fillStyle = "#14b8a6";
      ctx.fill();
    }
    else if (generator === DataElementGenerator.UNIFORM) {
      // draw the min and max lines
      ctx.fillRect(
        0, drawHeight - markerHeight / 2, 
        strokeWidth, markerHeight
      );

      ctx.fillRect(
        width - strokeWidth, drawHeight - markerHeight / 2,
        strokeWidth, markerHeight
      );

      // write text for the min and max
      ctx.font = "24px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`${min}`, 0, height);
      ctx.textAlign = "right";
      ctx.fillText(`${max}`, width, height);

      // draw the value circle
      if (
        (typeof min === 'undefined') 
        || (typeof max === 'undefined')
      ){ return; }
      const valueX = (value - min) / (max - min) * width;
      ctx.beginPath();
      ctx.arc(valueX, drawHeight, markerHeight/2, 0, 2 * Math.PI);
      ctx.fillStyle = "#14b8a6";
      ctx.fill();
    }
  });


  return (
    <canvas 
      ref={canvasRef} 
      height="80" 
      width="700"
      className="w-full"
    >
    </canvas>
  )
}

export default DistributionGraph;