import { useState, useEffect } from "react";
import { clamp } from "../utils";

export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [sp, setSp] = useState(0);
  useEffect(() => {
    let id: number;
    const tick = () => {
      if (ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();
        setSp(clamp(-top / (height - window.innerHeight)));
      }
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, [ref]);
  return sp;
}
