import { TaskList } from './TaskList';
import { TaskType } from '../types';

interface ContentProps {
  currentPage: string;
  isSidebarOpen: boolean;
  allTasks: TaskType[];
}

export function Content({
  currentPage,
  isSidebarOpen,
  allTasks
}: ContentProps) {
  const filteredTasks = allTasks.filter(({ date, project }) =>
    currentPage === 'Inbox'
      ? true
      : currentPage === 'Today'
      ? date ===
        new Date().toLocaleDateString('en-gb').split('/').reverse().join('-')
      : !['Inbox', 'Today'].includes(currentPage)
      ? project === currentPage
      : false
  );

  return (
    <main
      className={`${
        isSidebarOpen && 'sm:ml-[300px]'
      } p-10 transition-all duration-300 children:mx-auto children:max-w-5xl`}
    >
      <h1 className='text-4xl font-bold'>{currentPage}</h1>
      <div className='mt-4 flex h-[72vh] flex-col gap-4 overflow-y-auto p-1 text-lg'>
        {filteredTasks.length ? (
          filteredTasks.map((task, index) => (
            <TaskList key={task.id} first={index === 0} task={task} />
          ))
        ) : (
          <h2>Nothing here</h2>
        )}
      </div>
    </main>
  );
}
