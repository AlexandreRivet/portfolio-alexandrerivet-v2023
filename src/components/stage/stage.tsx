"use client"
import { useRef, useEffect } from "react";
import { Stage } from './3d/stage';

export default function StageView() {
  const stage = new Stage();
  const canvas = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvas.current !== null) {
      stage.init(canvas.current);
    }

    return () => {
      stage.destroy();
    };
  }, []);

  return <canvas ref={canvas} />
}