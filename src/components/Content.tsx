import { TaskList } from './TaskList';
import { TaskType } from '../types';

interface ContentProps {
  isSidebarOpen: boolean;
  allTasks: TaskType[];
}

export function Content({ isSidebarOpen, allTasks }: ContentProps) {
  return (
    <main
      className={`${
        isSidebarOpen && 'sm:ml-[300px]'
      } p-10 transition-all duration-300 children:mx-auto children:max-w-5xl`}
    >
      <h1 className='text-4xl font-bold'>Today</h1>
      <div className='mt-4 flex h-[72vh] flex-col gap-4 overflow-y-auto p-1 text-lg'>
        {allTasks.map((task, index) => (
          <TaskList key={task.id} first={index === 0} task={task} />
        ))}
      </div>
    </main>
  );
}
