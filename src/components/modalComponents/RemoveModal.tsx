import { useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { ModalContext, VscWarning } from '../../common';

interface RemoveModalProps {
  modalMode: string;
  closeModal: () => void;
}

export function RemoveModal({ modalMode, closeModal }: RemoveModalProps) {
  const { removeTask, removeProject } = useContext(ModalContext);

  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      <i className='text-8xl text-orange-400'>
        <VscWarning />
      </i>
      <Dialog.Description className='text-lg'>
        Are you sure you want to remove this{' '}
        {modalMode === 'removeTask' ? 'task' : 'project'}?
      </Dialog.Description>
      <div
        className='flex gap-2 self-end children:rounded-md children:border children:border-gray-300 
                   children:px-4 children:py-2 children:transition-colors children:duration-300'
      >
        <button
          className='hover:bg-gray-400 hover:text-white'
          type='button'
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className='bg-red-500 text-white hover:bg-red-400'
          type='button'
          onClick={modalMode === 'removeTask' ? removeTask() : removeProject()}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
