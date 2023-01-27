"use client"
import { useRef, useEffect } from "react";
import Scene from './3d/scene';

export default function Stage() {
  const canvas = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const scene = new Scene();
    scene.init(canvas.current);

    return () => {
      scene.destroy();
    };
  }, []);

  return <canvas ref={canvas} />
}