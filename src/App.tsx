import { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocalStorage, newTaskDefault, ContentContext } from './common';
import { Navbar, Sidebar, Content, Modal } from './components';
import type { Task } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 'inbox');
  const [modalMode, setModalMode] = useState('add');
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

  const methods = useForm<Task>({ defaultValues: newTaskDefault });

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

  const onSubmit = (task: Task) => {
    setAllTasks([{ ...task, id: Date.now() }, ...allTasks]);
    methods.reset(newTaskDefault);
    methods.clearErrors();
    setIsModalOpen(false);
  };

  const toggleCompleted = (targetId: number) => () => {
    setAllTasks(
      allTasks.map((task) =>
        task.id === targetId ? { ...task, completed: !task.completed } : task
      )
    );
  };

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

  console.log(methods);

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
      <ContentContext.Provider value={{ toggleCompleted }}>
        <Content isSidebarOpen={isSidebarOpen} allTasks={allTasks} />
      </ContentContext.Provider>
      <FormProvider {...methods}>
        <Modal
          isModalOpen={isModalOpen}
          onSubmit={onSubmit}
          closeModal={closeModal}
        />
      </FormProvider>
    </>
  );
}
