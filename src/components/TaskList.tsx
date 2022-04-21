import { useContext } from 'react';
import { TaskType } from '../types';
import { ToolTips } from './ToolTips';
import {
  BsArrowRightCircle,
  ContentContext,
  FiEdit3,
  FiFlag,
  FiTrash2
} from '../common';

interface TaskListProps {
  first: boolean;
  task: TaskType;
}

export function TaskList({
  first,
  task: { id, title, completed }
}: TaskListProps) {
  const { toggleCompleted, viewTask, editTask, removeTask } =
    useContext(ContentContext);

  return (
    <div
      className='mr-4 flex justify-between border-b border-gray-300
                 p-1 children:flex children:gap-1'
      role='button'
      tabIndex={0}
      onClick={viewTask(id)}
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
        <button
          className='group rounded p-1 hover:bg-gray-200'
          type='button'
          onClick={editTask(id)}
        >
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
          className='group rounded p-1 hover:bg-gray-200'
          type='button'
          onClick={removeTask(id)}
        >
          <FiTrash2 className='group-hover:text-black' />
          <ToolTips tips='Delete' first={first} />
        </button>
      </div>
    </div>
  );
}
