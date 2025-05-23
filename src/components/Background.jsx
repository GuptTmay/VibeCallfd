import { cn } from "@/lib/utils";
import React from "react";

export default function Background() {
  return (
    <div className="">
      <div
        className={cn(
          "-z-10",
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )} />
      {/* Radial gradient for the container to give a faded look */}
      <div className="-z-10 pointer-events-none absolute inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
    </div>
  );
}
