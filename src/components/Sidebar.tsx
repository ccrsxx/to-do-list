import {
  VscAdd,
  VscInbox,
  VscChevronUp,
  BsCalendar3,
  BsCalendar4
} from '../common';

interface SidebarProps {
  currentPage: string;
  isProjectsOpen: boolean;
  isSidebarOpen: boolean;
  todaysDate: string;
  handleCurrentPage: (page: string) => () => void;
  handleProjectsClickOpen: () => void;
}

export function Sidebar({
  currentPage,
  isProjectsOpen,
  isSidebarOpen,
  todaysDate,
  handleCurrentPage,
  handleProjectsClickOpen
}: SidebarProps) {
  return (
    <aside
      className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed z-10 h-full w-[300px] flex-col bg-sidebar-bg pl-9 pt-5 
        transition-transform duration-300 children:mb-2 children:mr-2 children:flex
        children:cursor-pointer children:select-none children:items-center children:gap-4
        children:rounded children:p-2 children:transition-colors `}
    >
      <a
        className={`${
          currentPage === 'inbox' && '!bg-gray-200 font-bold'
        } hover:bg-white`}
        role='button'
        tabIndex={0}
        onClick={handleCurrentPage('inbox')}
      >
        <VscInbox className='text-xl text-blue-500' /> Inbox
      </a>
      <a
        className={`${
          currentPage === 'today' && '!bg-gray-200 font-bold'
        } before:absolute before:text-[10px] before:font-normal before:text-green-500 hover:bg-white 
          before:content-['${todaysDate}'] before:[transform:translate(4px,3px)] hover:bg-white`}
        role='button'
        tabIndex={0}
        onClick={handleCurrentPage('today')}
      >
        <BsCalendar4 className='text-xl text-green-500' />
        Today
      </a>
      <a
        className={`${
          !['inbox', 'today'].includes(currentPage) && '!bg-gray-200'
        } !mb-0 hover:bg-white`}
        role='button'
        tabIndex={0}
        onClick={handleProjectsClickOpen}
      >
        <BsCalendar3 className='text-xl text-purple-500' />
        Projects
        <VscChevronUp
          className={`${
            isProjectsOpen ? 'rotate-180' : 'rotate-0'
          } ml-auto text-xl transition-transform duration-300`}
        />
      </a>
      <div
        id='projects'
        className='ml-10 mt-2 flex flex-col !gap-1 overflow-hidden !p-0 !transition-height !duration-300
                   children:w-full children:rounded children:p-1 children:text-sm
                   children:transition-colors'
      >
        <a
          className={`${
            currentPage === 'homework' && '!bg-gray-200 font-bold'
          } hover:bg-white`}
          role='button'
          tabIndex={0}
          onClick={handleCurrentPage('homework')}
        >
          Homework
        </a>
        <a
          className={`${
            currentPage === 'learnreact' && '!bg-gray-200 font-bold'
          } hover:bg-white`}
          role='button'
          tabIndex={0}
          onClick={handleCurrentPage('learnreact')}
        >
          Learn React
        </a>
        <a
          className={`${
            currentPage === 'tailwindcss' && '!bg-gray-200 font-bold'
          } hover:bg-white`}
          role='button'
          tabIndex={0}
          onClick={handleCurrentPage('tailwindcss')}
        >
          Tailwindcss
        </a>
        <button
          type='button'
          className='group flex items-center gap-2 hover:text-red-500'
        >
          <i className='rounded-full p-1 transition-colors duration-300 group-hover:bg-red-500'>
            <VscAdd className='transition-colors duration-300 group-hover:text-white' />{' '}
          </i>
          New project
        </button>
      </div>
    </aside>
  );
}
