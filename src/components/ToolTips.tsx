import { useContext } from 'react';
import { ContentContext, TiArrowSortedDown } from '../common';
import { IconType } from '../types';

interface ToolTipsProps {
  Icon: IconType;
  tips: string;
  first: undefined | boolean;
  popup?: undefined | 'priority' | 'project';
}

export function ToolTips({ Icon, tips, first, popup }: ToolTipsProps) {
  const allProjects =
    popup === 'project' ? useContext(ContentContext).allProjects : null;

  return (
    <>
      <Icon className='group-hover:text-black' />
      {popup && (
        <div
          className='absolute -top-1 right-8 flex 
                     flex-col gap-1 rounded border
                     border-gray-300 bg-white p-2 text-sm'
        >
          {popup === 'project'
            ? allProjects!.map(({ id, title }) => (
                <button
                  className='w-full whitespace-nowrap rounded p-1
                           hover:bg-nav-bg hover:text-white'
                  key={id}
                  type='button'
                >
                  {title}
                </button>
              ))
            : undefined}
        </div>
      )}
      <div
        style={first ? { top: 35 } : undefined}
        className='invisible absolute -top-[35px] left-[50%] translate-x-[-50%] whitespace-nowrap 
                   rounded bg-black px-2 py-1 text-center text-sm text-white opacity-0
                   transition-opacity duration-300 group-hover:visible group-hover:opacity-100'
      >
        {tips}
        <TiArrowSortedDown
          style={
            first
              ? { top: -10, transform: 'rotate(180deg) translateX(50%)' }
              : undefined
          }
          className='absolute top-[20px] left-[50%] -translate-x-[50%]
                     text-lg text-black group-hover:inline-block'
        />
      </div>
    </>
  );
}
