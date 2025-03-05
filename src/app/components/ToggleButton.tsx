import * as Toggle from "@radix-ui/react-toggle";
import React, { JSX } from "react";

export default function ToggleButtons({ children, icon }: { children: React.ReactNode, icon?: JSX.Element }) {
  return (
    <Toggle.Root
      className="px-4 py-2 rounded-full border-2 border-gray-300 bg-white text-gray-600 font-medium shadow-sm
                 data-[state=on]:border-blue-600 data-[state=on]:bg-blue-600 data-[state=on]:text-white h-[29px] leading-[0px]"
      aria-label="Toggle Button"
    >
      <span className="inline-flex">{icon}</span>
      {children}
    </Toggle.Root>
  );
}
