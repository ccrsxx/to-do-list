import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage, newTaskDefault } from './common';
import { Navbar, Sidebar, Content, Modal } from './components';
import type { Task } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 'inbox');
  const [allTasks, setAllTasks] = useLocalStorage<Task[]>('allTasks', []);
  const [newTask, setNewTask] = useLocalStorage<Task>(
    'newTask',
    newTaskDefault
  );

  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isSidebarOpen) setIsSidebarOpen(false);
    else if (!isMobile && !isSidebarOpen) setIsSidebarOpen(true);
  }, [isMobile]);

  useEffect(() => {
    const projects = document.getElementById('projects') as HTMLElement;
    if (isProjectsOpen) projects.style.height = `${projects.scrollHeight}px`;
    else projects.style.height = '0px';
  }, [isProjectsOpen]);

  const handleChange =
    (targetId?: number) =>
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { name, type, checked, value } = target;
      const inputValue = type === 'checkbox' ? checked : value;

      if (targetId) {
        setAllTasks(
          allTasks.map((task) =>
            task.id === targetId ? { ...task, [name]: inputValue } : task
          )
        );
        setSelectedTask({ ...selectedTask, [name]: inputValue } as Task);
      } else {
        setNewTask({ ...newTask, [name]: inputValue });
      }
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAllTasks([...allTasks, { ...newTask, id: Date.now() }]);
    setNewTask(newTaskDefault);
    setIsModalOpen(false);
  };

  // const handleModal =
  //   (mode: 'add' | 'edit' | 'delete') =>
  //   (
  //     e:
  //       | React.FormEvent<HTMLFormElement>
  //       | React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  //   ) => {
  //     if (e.type === 'submit') e.preventDefault();

  //     setIsModalOpen(false);

  //     if (mode !== 'add') {
  //       setTimeout(() => {
  //         setSelectedTask(null);
  //         // setModalMode('add');
  //       }, 300);
  //     }
  //   };

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCurrentPage = (page: string) => () => {
    if (currentPage === page) return;
    setCurrentPage(page);
  };

  const handleProjectsClick = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const todaysDate = useMemo(
    () => new Date().toLocaleDateString('en-gb').slice(0, 2),
    []
  );

  return (
    <>
      <Navbar
        handleSidebarClick={handleSidebarClick}
        handleCurrentPage={handleCurrentPage}
        openModal={openModal}
      />
      <Sidebar
        currentPage={currentPage}
        isSidebarOpen={isSidebarOpen}
        isProjectsOpen={isProjectsOpen}
        todaysDate={todaysDate}
        handleCurrentPage={handleCurrentPage}
        handleProjectsClickOpen={handleProjectsClick}
      />
      <Content isSidebarOpen={isSidebarOpen} />
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
