import { TaskList } from './TaskList';
import { TaskType } from '../types';

interface ContentProps {
  currentPage: string;
  allTasks: TaskType[];
  isMobile: boolean;
  isSidebarOpen: boolean;
  handleSidebarClick: () => void;
}

export function Content({
  currentPage,
  allTasks,
  isMobile,
  isSidebarOpen,
  handleSidebarClick
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
      } relative p-5 pr-2 transition-all duration-300 
        children:mx-auto children:max-w-5xl sm:p-10 sm:pr-4`}
    >
      <div
        className={`${
          isMobile && isSidebarOpen ? 'z-10 opacity-100' : '-z-10 opacity-0'
        } absolute inset-0 bg-white-ish transition-opacity duration-300`}
        onClick={handleSidebarClick}
      />
      <h1 className='break-all text-4xl font-bold'>{currentPage}</h1>
      <div className='mt-4 flex h-[78vh] flex-col gap-4 overflow-y-auto p-1 text-lg sm:h-[72vh]'>
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
