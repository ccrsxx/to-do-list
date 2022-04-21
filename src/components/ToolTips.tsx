import { TiArrowSortedDown } from '../common';

interface ToolTipsProps {
  tips: string;
  first: undefined | boolean;
}

export function ToolTips({ tips, first }: ToolTipsProps) {
  return (
    <div
      style={first ? { top: 35 } : undefined}
      className={`invisible absolute -top-[35px] left-[50%] translate-x-[-50%] whitespace-nowrap 
                  rounded bg-black px-2 py-1 text-center text-sm text-white opacity-0
                  transition-opacity duration-300 group-hover:visible group-hover:opacity-100`}
    >
      {tips}
      <TiArrowSortedDown
        style={
          first
            ? { top: -10, transform: 'rotate(180deg) translateX(50%)' }
            : undefined
        }
        className={`absolute top-[20px] left-[50%] -translate-x-[50%]
                    text-lg text-black group-hover:inline-block`}
      />
    </div>
  );
}
