import { ToolTips } from './ToolTips';
import {
  VscAdd,
  FiEdit3,
  FiTrash2,
  VscInbox,
  VscChevronUp,
  BsCalendar3,
  BsCalendar4
} from '../common';
import { ProjectType } from '../types';

interface SidebarProps {
  currentPage: string;
  allProjects: ProjectType[];
  isProjectsOpen: boolean;
  isSidebarOpen: boolean;
  addProject: () => void;
  editProject: (targetId: number) => (e: React.MouseEvent) => void;
  removeProject: (targetId: number) => (e: React.MouseEvent) => void;
  handleCurrentPage: (page: string) => () => void;
  handleProjectsClickOpen: () => void;
}

export function Sidebar({
  currentPage,
  allProjects,
  isProjectsOpen,
  isSidebarOpen,
  addProject,
  editProject,
  removeProject,
  handleCurrentPage,
  handleProjectsClickOpen
}: SidebarProps) {
  return (
    <aside
      className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } children:btn-focus fixed z-20 h-full w-[75vw] flex-col bg-sidebar-bg pl-4 pt-4 transition-transform
        duration-300 children:mb-2 children:mr-2 children:flex children:cursor-pointer children:select-none
        children:items-center children:gap-4 children:rounded children:p-2 children:transition children:duration-300
        sm:w-[300px] sm:pl-9 sm:pt-5`}
    >
      <a
        className={`${
          currentPage === 'Inbox' && '!bg-gray-200 font-bold'
        } hover:bg-white focus-visible:ring-blue-400`}
        role='button'
        tabIndex={0}
        onClick={handleCurrentPage('Inbox')}
      >
        <VscInbox className='text-xl text-blue-500' /> Inbox
      </a>
      <a
        className={`${
          currentPage === 'Today' && '!bg-gray-200 font-bold'
        } btn-today before:absolute before:text-[10px] before:font-normal 
        before:text-green-500 before:[transform:translate(4.5px,3px)]
        hover:bg-white focus-visible:ring-blue-400`}
        role='button'
        tabIndex={0}
        onClick={handleCurrentPage('Today')}
      >
        <BsCalendar4 className='text-xl text-green-500' />
        Today
      </a>
      <a
        className={`${
          !['Inbox', 'Today'].includes(currentPage) && '!bg-gray-200'
        } !mb-0 hover:bg-white focus-visible:ring-blue-400`}
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
        className='children:btn-focus ml-9 mt-1 flex flex-col !gap-2 overflow-hidden
                   !p-0 !transition-height children:w-[calc(100%-6px)]
                   children:rounded children:p-1'
      >
        {allProjects.map(({ id, title }, index) => (
          <a
            key={id}
            className={`${
              currentPage === title && '!bg-gray-200 font-bold'
            } group flex items-center justify-between text-sm transition-colors 
            first:mt-1 hover:bg-white focus-visible:ring-blue-300`}
            role='button'
            tabIndex={0}
            onClick={handleCurrentPage(title)}
          >
            <p className='break-all'>📌 {title}</p>
            <div
              className='children:btn-focus invisible ml-1 flex gap-1 self-start
                         opacity-0 transition-opacity duration-300 
                         group-hover:visible group-hover:opacity-100 children:rounded children:p-1'
            >
              <button
                className='group-sidebar relative hover:bg-gray-100'
                type='button'
                onClick={editProject(id)}
              >
                <ToolTips
                  Icon={FiEdit3}
                  tips='Edit'
                  first={index === 0}
                  sidebar
                />
              </button>
              <button
                className='group-sidebar relative mr-2 hover:bg-gray-100'
                type='button'
                onClick={removeProject(id)}
              >
                <ToolTips
                  Icon={FiTrash2}
                  tips='Delete'
                  first={index === 0}
                  sidebar
                />
              </button>
            </div>
          </a>
        ))}
        <button
          className={`${
            !allProjects.length && 'mt-1'
          } group flex items-center gap-2 hover:text-red-500`}
          type='button'
          onClick={addProject}
        >
          <i className='rounded-full p-1 transition-colors duration-300 group-hover:bg-red-500'>
            <VscAdd className='transition-colors duration-300 group-hover:text-white' />{' '}
          </i>
          New Project
        </button>
      </div>
    </aside>
  );
}
