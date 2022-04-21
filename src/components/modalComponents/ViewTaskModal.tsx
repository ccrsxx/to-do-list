import { useContext } from 'react';
import { getDate, ModalContext } from '../../common';
import { TaskType } from '../../types';

interface ViewTaskModalProps {
  closeModal: () => void;
}

export function ViewTaskModal({ closeModal }: ViewTaskModalProps) {
  const { allTasks, selectedTaskId } = useContext(ModalContext);
  const { title, description, date, priority } = allTasks.find(
    ({ id }) => id === selectedTaskId
  ) as TaskType;

  return (
    <>
      <div className='flex flex-col gap-4 children:flex children:flex-col children:gap-2'>
        <div className='children:flex children:flex-col children:gap-1'>
          <div>
            <h3 className='font-bold'>Title</h3>
            <p className='rounded border border-gray-300 p-2'>{title}</p>
          </div>
          <div>
            <h3 className='font-bold'>Description</h3>
            <textarea
              className='resize-none rounded border border-gray-300 p-2'
              rows={4}
              disabled
            >
              {description}
            </textarea>
          </div>
        </div>
        <div className='children:flex children:flex-col children:gap-1'>
          <div>
            <h3 className='font-bold'>Due date</h3>
            <p>{getDate(date)}</p>
          </div>
          <div>
            <h3 className='font-bold'>Priority</h3>
            <p className='capitalize'>{priority}</p>
          </div>
        </div>
      </div>
      <div
        className='mt-4 flex justify-end gap-2 
                   children:rounded-md children:border-2 children:px-4
                   children:py-2 children:text-sm
                   children:transition-colors children:duration-300'
      >
        <button
          className='border-transparent bg-green-500 text-white hover:bg-green-400'
          type='button'
          onClick={closeModal}
        >
          Okay
        </button>
      </div>
    </>
  );
}
