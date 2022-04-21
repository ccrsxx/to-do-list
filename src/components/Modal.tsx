import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { VscClose } from 'react-icons/vsc';
import {
  ProjectModal,
  RemoveModal,
  TaskModal,
  ViewTaskModal
} from './modalComponents';
import { ModalType } from '../types';

interface ModalProps {
  modalMode: ModalType;
  isModalOpen: boolean;
  onSubmit: SubmitHandler<any>;
  closeModal: () => void;
}

export function Modal({
  modalMode,
  isModalOpen,
  onSubmit,
  closeModal
}: ModalProps) {
  const { handleSubmit } = useFormContext();

  return (
    <Transition show={isModalOpen} as={Fragment}>
      <Dialog
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeModal}
      >
        <div className='flex min-h-screen items-center justify-center px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-white-ish' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div
              className={`${
                ['add', 'edit'].includes(modalMode)
                  ? 'max-w-3xl'
                  : ['view', 'remove'].includes(modalMode)
                  ? 'max-w-md'
                  : 'max-w-lg'
              } my-8 inline-block w-full transform overflow-hidden rounded-xl
              bg-white p-6 text-left align-middle shadow-xl transition-all`}
            >
              {modalMode === 'view' ? (
                <ViewTaskModal closeModal={closeModal} />
              ) : modalMode === 'remove' ? (
                <RemoveModal closeModal={closeModal} />
              ) : (
                <>
                  <div className='flex justify-between border-b-2 pb-2'>
                    <Dialog.Title className='text-lg font-medium leading-6 text-gray-900'>
                      {`${
                        ['add', 'project'].includes(modalMode) ? 'New' : 'Edit'
                      } ${modalMode === 'project' ? 'Project' : 'Task'}`}
                    </Dialog.Title>
                    <button
                      type='button'
                      className='rounded-full p-1 text-xl transition-colors duration-300
                             hover:animate-spin hover:bg-red-500 hover:text-white'
                      onClick={closeModal}
                    >
                      <VscClose />
                    </button>
                  </div>
                  <form
                    className='mt-4'
                    autoComplete='off'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {['add', 'edit'].includes(modalMode) ? (
                      <TaskModal />
                    ) : (
                      <ProjectModal />
                    )}
                    <div
                      className='mt-4 flex justify-end gap-2 
                             children:rounded-md children:border-2 children:px-4
                             children:py-2 children:text-sm
                             children:transition-colors children:duration-300'
                    >
                      <button
                        type='button'
                        className='hover:bg-gray-500 hover:text-white'
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button
                        type='submit'
                        className='border-transparent bg-nav-bg text-white hover:bg-red-400 focus:outline-none
                                   focus-visible:ring-2 focus-visible:ring-nav-bg focus-visible:ring-offset-2'
                      >
                        {`${modalMode === 'edit' ? 'Update' : 'Add'} ${
                          modalMode === 'project' ? 'Project' : 'Task'
                        }`}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
