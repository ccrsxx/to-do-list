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
        className='fixed inset-0 z-30 overflow-y-auto'
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
                ['addTask', 'editTask'].includes(modalMode)
                  ? 'max-w-3xl'
                  : ['viewTask', 'removeTask', 'removeProject'].includes(
                      modalMode
                    )
                  ? 'max-w-md'
                  : 'max-w-lg'
              } my-8 inline-block w-full transform overflow-hidden rounded-xl bg-white
              p-6 text-left align-middle shadow-xl transition-all sm:my-0`}
            >
              {modalMode === 'viewTask' ? (
                <ViewTaskModal closeModal={closeModal} />
              ) : ['removeTask', 'removeProject'].includes(modalMode) ? (
                <RemoveModal modalMode={modalMode} closeModal={closeModal} />
              ) : (
                <>
                  <div className='flex justify-between border-b-2 pb-2'>
                    <Dialog.Title className='text-lg font-medium leading-6 text-gray-900'>
                      {`${
                        ['addTask', 'addProject'].includes(modalMode)
                          ? 'New'
                          : 'Edit'
                      } ${
                        ['addProject', 'editProject'].includes(modalMode)
                          ? 'Project'
                          : 'Task'
                      }`}
                    </Dialog.Title>
                    <button
                      type='button'
                      className='btn-focus rounded-full p-1 text-xl transition-colors duration-300
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
                    {['addTask', 'editTask'].includes(modalMode) ? (
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
                        className='btn-focus hover:bg-gray-500 hover:text-white 
                                 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button
                        type='submit'
                        className='border-transparent bg-nav-bg text-white hover:bg-red-400 focus:outline-none
                                   focus-visible:ring-2 focus-visible:ring-nav-bg focus-visible:ring-offset-2'
                      >
                        {`${modalMode === 'editTask' ? 'Update' : 'Add'} ${
                          ['addProject', 'editProject'].includes(modalMode)
                            ? 'Project'
                            : 'Task'
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
