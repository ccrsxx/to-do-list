import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { ModalContext } from '../../common';

export function TaskModal() {
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
