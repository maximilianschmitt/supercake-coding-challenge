import * as Toggle from '@radix-ui/react-toggle';
import React, { JSX } from 'react';

export default function ToggleButtons({
  children,
  icon,
  onPressedChange,
  pressed,
}: {
  pressed: boolean;
  children: React.ReactNode;
  icon?: JSX.Element;
  onPressedChange: (pressed: boolean) => void;
}) {
  return (
    <Toggle.Root
      className="justify-center px-[12px] py-2 rounded-full border-2 border-gray-300 bg-white text-gray-600 font-medium shadow-sm
                 data-[state=on]:border-blue-600 data-[state=on]:bg-blue-600 data-[state=on]:text-white h-[29px] leading-[0px]"
      aria-label="Toggle Button"
      onPressedChange={onPressedChange}
      pressed={pressed}
    >
      {icon ? (
        <>
          <span className="inline-flex pr-1 relative bottom-0.5">{icon}</span>
          <span className="inline-flex pr-1 relative bottom-1">{children}</span>
        </>
      ) : (
        children
      )}
    </Toggle.Root>
  );
}
