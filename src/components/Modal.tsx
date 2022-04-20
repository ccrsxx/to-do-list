import { useContext, Fragment } from 'react';
import { FieldValue, SubmitHandler, useFormContext } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { VscClose, VscWarning } from 'react-icons/vsc';
import { ModalContext } from '../common';

interface ModalProps {
  modalMode: 'add' | 'view' | 'edit' | 'project' | 'remove';
  isModalOpen: boolean;
  onSubmit: SubmitHandler<any>;
  closeModal: () => void;
}

interface RemoveTaskProps {
  closeModal: () => void;
}

function AddTask() {
  const { allProjects } = useContext(ModalContext);
  const {
    register,
    formState: { errors, dirtyFields }
  } = useFormContext();

  return (
    <div className='flex flex-col gap-2 md:flex-row md:gap-6'>
      <div className='flex flex-1 flex-col gap-5 children:flex children:flex-col children:gap-2'>
        <div className='children:rounded children:transition-[box-shadow] children:duration-300'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            className={
              errors.title
                ? 'border-pink-600'
                : dirtyFields.title
                ? 'border-green-500'
                : undefined
            }
            type='text'
            {...register('title', { required: true })}
          />
          {errors.title && (
            <p className='text-sm text-pink-600'>Please provide a title.</p>
          )}
        </div>
        <div className='children:rounded children:transition-[box-shadow] children:duration-300'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            className={
              errors.description
                ? 'border-pink-600'
                : dirtyFields.description
                ? 'border-green-500'
                : undefined
            }
            rows={5}
            {...register('description', { required: true })}
          />
          {errors.description && (
            <p className='text-sm text-pink-600'>
              Please provide a description.
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-5 children:flex children:flex-col children:gap-2'>
        <div className='children:rounded children:transition-[box-shadow] children:duration-300'>
          <label htmlFor='date'>Due date</label>
          <input
            id='date'
            className={
              errors.date
                ? 'border-pink-600'
                : dirtyFields.date
                ? 'border-green-500'
                : undefined
            }
            type='date'
            {...register('date', { required: true })}
          />
          {errors.date && (
            <p className='text-sm text-pink-600'>Please provide a date.</p>
          )}
        </div>
        <div className='children:rounded children:transition-[box-shadow] children:duration-300'>
          <label htmlFor='priority'>Priority</label>
          <select
            id='priority'
            className={
              errors.title || dirtyFields.title ? 'border-green-500' : undefined
            }
            {...register('priority', { required: true })}
            defaultValue='medium'
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <div className='children:rounded children:transition-[box-shadow] children:duration-300'>
          <label htmlFor='project'>Project</label>
          <select
            id='project'
            className={
              errors.title || dirtyFields.title ? 'border-green-500' : undefined
            }
            {...register('project', { required: true })}
            defaultValue='inbox'
          >
            <option value='inbox'>Inbox</option>
            {allProjects.map(({ id, title }) => (
              <option key={id} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function RemoveTask({ closeModal }: RemoveTaskProps) {
  const { removeTask } = useContext(ModalContext);

  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      <i className='text-8xl text-orange-400'>
        <VscWarning />
      </i>
      <Dialog.Description className='text-lg'>
        Are you sure you want to remove this task?
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
          onClick={removeTask()}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

function AddProject() {
  const {
    register,
    formState: { errors, dirtyFields }
  } = useFormContext();

  return (
    <div
      className='flex flex-col gap-2 children:rounded children:transition-[box-shadow]
                 children:duration-300'
    >
      <label htmlFor='project'>Project</label>
      <input
        id='project'
        className={
          errors.title
            ? 'border-pink-600'
            : dirtyFields.title
            ? 'border-green-500'
            : undefined
        }
        type='text'
        {...register('title', { required: true })}
      />
      {errors.title && (
        <p className='text-sm text-pink-600'>
          {errors.title.message || 'Please provide project name.'}
        </p>
      )}
    </div>
  );
}

function ViewTask() {
  return <div></div>;
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
                  : modalMode === 'remove'
                  ? 'max-w-md'
                  : 'max-w-lg'
              } my-8 inline-block w-full transform overflow-hidden rounded-xl
              bg-white p-6 text-left align-middle shadow-xl transition-all`}
            >
              {modalMode === 'remove' ? (
                <RemoveTask closeModal={closeModal} />
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
                      <AddTask />
                    ) : (
                      <AddProject />
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
