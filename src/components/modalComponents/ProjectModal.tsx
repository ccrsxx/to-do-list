import { useFormContext } from 'react-hook-form';

export function ProjectModal() {
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
