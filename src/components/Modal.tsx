import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { VscClose } from 'react-icons/vsc';

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Modal({ isModalOpen, closeModal, handleSubmit }: ModalProps) {
  return (
    <Transition show={isModalOpen} as={Fragment}>
      <Dialog
        as='div'
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
              className='my-8 inline-block w-full max-w-lg transform overflow-hidden rounded-xl
                       bg-white p-6 text-left align-middle shadow-xl transition-all'
            >
              <div className='flex justify-between border-b-2 pb-2'>
                <Dialog.Title className='text-lg font-medium leading-6 text-gray-900'>
                  New task
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
              <form className='mt-4' autoComplete='off' onSubmit={handleSubmit}>
                <div>
                  <div className='grid gap-2 children:flex children:flex-col children:gap-2'>
                    <div className='children:rounded children:transition-[box-shadow] children:duration-300'>
                      <label htmlFor='title'>Title</label>
                      <input type='text' className='peer' />
                      <p className='mt-2 hidden text-sm text-pink-600 peer-invalid:block'>
                        Please provide a valid email address.
                      </p>
                    </div>
                    <div className='children:rounded children:transition-[box-shadow] children:duration-300'>
                      <label htmlFor='description'>Description</label>
                      <textarea name='description' id='description' rows={4} />
                    </div>
                  </div>
                </div>
                <div
                  className='mt-4 flex justify-end gap-2 children:rounded-md 
                             children:border-2 children:px-4 children:py-2
                             children:text-sm children:transition-colors
                             children:duration-300'
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
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
