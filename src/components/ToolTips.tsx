import { TiArrowSortedDown } from '../common';
import { IconType } from '../types';

interface ToolTipsProps {
  Icon: IconType;
  tips: string;
  first: undefined | boolean;
  sidebar?: boolean;
}

export function ToolTips({ Icon, tips, first, sidebar }: ToolTipsProps) {
  return (
    <>
      <Icon
        className={
          sidebar ? 'group-sidebar-hover:text-black' : 'group-hover:text-black'
        }
      />
      <div
        style={first ? { top: sidebar ? 28 : 35 } : undefined}
        className={`${
          sidebar
            ? '-top-[28px] text-xs group-sidebar-hover:visible group-sidebar-hover:opacity-100'
            : '-top-[35px] text-sm group-hover:visible group-hover:opacity-100'
        } invisible absolute left-[50%] translate-x-[-50%] whitespace-nowrap 
          rounded bg-black px-2 py-1 text-center text-white opacity-0
          transition-opacity duration-300`}
      >
        {tips}
        <TiArrowSortedDown
          style={
            first
              ? {
                  top: sidebar ? -8 : -10,
                  transform: 'rotate(180deg) translateX(50%)'
                }
              : undefined
          }
          className={`${
            sidebar
              ? 'top-[18px] text-sm group-sidebar-hover:inline-block'
              : 'top-[20px] text-lg group-hover:inline-block'
          } absolute left-[50%] -translate-x-[50%]
            text-lg text-black`}
        />
      </div>
    </>
  );
}
