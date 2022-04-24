import { useContext } from 'react';
import { ToolTips } from './ToolTips';
import { ContentContext, FiEdit3, FiTrash2 } from '../common';
import { TaskType } from '../types';

interface TaskListProps {
  first: boolean;
  task: TaskType;
}

export function TaskList({
  first,
  task: { id, title, priority, completed }
}: TaskListProps) {
  const { viewTask, toggleCompleted, editTask, removeTask } =
    useContext(ContentContext);

  return (
    <div
      className={`${
        priority === 'High'
          ? 'border-red-400'
          : priority === 'Medium'
          ? 'border-orange-400'
          : 'border-green-400'
      } btn-focus mr-4 flex justify-between rounded-sm border-b-2 p-1 
      focus-visible:ring-blue-400 focus-visible:ring-offset-2 children:flex children:gap-1`}
      role='button'
      tabIndex={0}
      onClick={viewTask(id)}
    >
      <div>
        <button
          className='mt-[5px] ml-1 mr-2 h-4 w-4 rounded-sm transition duration-200 
                     focus:outline-none focus-visible:ring-2 
                   focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          type='button'
          onClick={toggleCompleted(id)}
        >
          <input
            className='form-check-input cursor-pointer appearance-none rounded-sm border border-gray-300
                     bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200
                     checked:bg-blue-500 marker:checked:border-blue-500 hover:bg-gray-200 focus:outline-none'
            type='checkbox'
            checked={completed}
            tabIndex={-1}
            readOnly
          />
        </button>
        <p className={`${completed && 'line-through'} inline-block break-all`}>
          {title}
        </p>
      </div>
      <div className='children:btn-focus items-start children:relative children:transition-colors children:duration-300'>
        <button
          className='group rounded p-1 hover:bg-gray-200 focus-visible:ring-blue-400'
          type='button'
          onClick={editTask(id)}
        >
          <ToolTips Icon={FiEdit3} tips='Edit' first={first} />
        </button>
        <button
          className='group rounded p-1 hover:bg-gray-200 focus-visible:ring-blue-400'
          type='button'
          onClick={removeTask(id)}
        >
          <ToolTips Icon={FiTrash2} tips='Delete' first={first} />
        </button>
      </div>
    </div>
  );
}
