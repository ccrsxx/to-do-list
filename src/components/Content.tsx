import { useContext } from 'react';
import { ContentContext } from '../common';
import {
  FiEdit3,
  FiFlag,
  BsArrowRightCircle,
  FiTrash2,
  TiArrowSortedDown
} from '../common';
import type { Task } from '../types';

interface ContentProps {
  isSidebarOpen: boolean;
  allTasks: Task[];
}

interface ToolTipsProps {
  tips: string;
  first: undefined | boolean;
}

function ToolTips({ tips, first }: ToolTipsProps) {
  return (
    <div
      className={`z-1 invisible absolute top-[${
        first ? '35px' : '-35px'
      }] left-[50%] translate-x-[-50%] whitespace-nowrap 
         rounded bg-black px-2 py-1 text-center text-sm text-white opacity-0
         transition-opacity duration-300 group-hover:visible group-hover:opacity-100`}
    >
      {tips}
      <TiArrowSortedDown
        className={`absolute top-[${
          first ? '-20px' : '20px'
        }] left-[50%] translate-x-[-50%]
           text-lg text-black group-hover:inline-block`}
      />
    </div>
  );
}

function TaskList({
  id,
  title,
  description,
  date,
  priority,
  project,
  completed,
  first
}: Task) {
  const { toggleCompleted } = useContext(ContentContext);

  return (
    <div
      className='flex justify-between border-b border-gray-300 p-1 children:flex
                 children:gap-1'
    >
      <div>
        <input
          className='form-check-input float-left mt-[5px] mr-2 h-4 w-4 cursor-pointer
                     appearance-none rounded-sm border border-gray-300 bg-white 
                     bg-contain bg-center bg-no-repeat align-top transition duration-200 
                   checked:border-blue-500 checked:bg-blue-500 focus:outline-none'
          type='checkbox'
          checked={completed}
          onChange={toggleCompleted(id)}
        />
        <p className={`${completed && 'line-through'} inline-block`}>{title}</p>
      </div>
      <div className='children:relative children:transition-colors children:duration-300'>
        <button className='group rounded p-1 hover:bg-gray-200' type='button'>
          <FiEdit3 className='group-hover:text-black' />
          <ToolTips tips='Edit' first={first} />
        </button>
        <button className='group rounded p-1 hover:bg-gray-200' type='button'>
          <FiFlag className='group-hover:text-black' />
          <ToolTips tips='Change priority' first={first} />
        </button>
        <button className='group rounded p-1 hover:bg-gray-200' type='button'>
          <BsArrowRightCircle className='group-hover:text-black' />
          <ToolTips tips='Move project' first={first} />
        </button>
        <button
          className='group mr-4 rounded p-1 hover:bg-gray-200'
          type='button'
        >
          <FiTrash2 className='group-hover:text-black' />
          <ToolTips tips='Delete' first={first} />
        </button>
      </div>
    </div>
  );
}

export function Content({ isSidebarOpen, allTasks }: ContentProps) {
  return (
    <main
      className={`${
        isSidebarOpen && 'sm:ml-[300px]'
      } p-10 transition-all duration-300 children:mx-auto children:max-w-5xl`}
    >
      <h1 className='text-4xl font-bold'>Today</h1>
      <div className='mt-4 flex h-[75vh] flex-col gap-5 overflow-y-auto overflow-x-hidden text-lg'>
        {allTasks.map((task, index) => (
          <TaskList key={task.id} first={index === 0} {...task} />
        ))}
      </div>
    </main>
  );
}
