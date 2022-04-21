import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ContentContext,
  ModalContext,
  newProjectDefault,
  newTaskDefault,
  useLocalStorage
} from './common';
import { Content, Modal, Navbar, Sidebar } from './components';
import { ProjectType, TaskType, ModalType } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 'inbox');

  const [allProjects, setAllProjects] = useLocalStorage<ProjectType[]>(
    'allProjects',
    []
  );

  const [allTasks, setAllTasks] = useLocalStorage<TaskType[]>('allTasks', []);
  const [selectedTaskId, setSelectedTaskId] = useState<null | number>(null);
  const [modalMode, setModalMode] = useState<ModalType>('add');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  const formMethods = useForm<TaskType | ProjectType>({
    defaultValues: newTaskDefault
  });

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
  }, [isProjectsOpen, modalMode === 'project']);

  const addProject = () => {
    formMethods.reset(newProjectDefault);
    setModalMode('project');
    setIsModalOpen(true);
  };

  const viewTask = (targetId: number) => () => {
    setModalMode('view');
    setIsModalOpen(true);
    setSelectedTaskId(targetId);
  };

  const editTask = (targetId: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    formMethods.reset(
      allTasks.find((task) => task.id === targetId) as TaskType
    );
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const removeTask = (targetId?: number) => (e: React.MouseEvent) => {
    if (targetId) {
      e.stopPropagation();
      setModalMode('remove');
      setIsModalOpen(true);
      setSelectedTaskId(targetId);
    } else if (selectedTaskId) {
      setAllTasks(allTasks.filter((task) => task.id !== selectedTaskId));
      setIsModalOpen(false);
      resetForm();
    }
  };

  const onSubmit = (currentTask: TaskType | ProjectType) => {
    if (modalMode === 'add') {
      setAllTasks([
        { ...currentTask, id: Date.now() } as TaskType,
        ...allTasks
      ]);
    } else if (modalMode === 'edit') {
      setAllTasks(
        allTasks.map((task) =>
          task.id === currentTask.id ? currentTask : task
        ) as TaskType[]
      );
    } else if (modalMode === 'project') {
      let { title } = currentTask;

      title = title.trim();

      if (
        allProjects.find(({ title: projectTitle }) => projectTitle === title)
      ) {
        formMethods.setError('title', {
          type: 'custom',
          message: `Project with title "${title}" already exists!`
        });
        return;
      }

      setAllProjects([...allProjects, { id: Date.now(), title }]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTimeout(() => {
      setModalMode('add');
      setSelectedTaskId(null);
      formMethods.reset(newTaskDefault);
    }, 300);
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

    if (modalMode !== 'add') {
      resetForm();
    }
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
        allProjects={allProjects}
        isSidebarOpen={isSidebarOpen}
        isProjectsOpen={isProjectsOpen}
        todaysDate={todaysDate}
        addProject={addProject}
        handleCurrentPage={handleCurrentPage}
        handleProjectsClickOpen={handleProjectsClick}
      />
      <ContentContext.Provider
        value={{ toggleCompleted, viewTask, editTask, removeTask }}
      >
        <Content isSidebarOpen={isSidebarOpen} allTasks={allTasks} />
      </ContentContext.Provider>
      <ModalContext.Provider
        value={{ allProjects, allTasks, selectedTaskId, removeTask }}
      >
        <FormProvider {...formMethods}>
          <Modal
            modalMode={modalMode}
            isModalOpen={isModalOpen}
            onSubmit={onSubmit}
            closeModal={closeModal}
          />
        </FormProvider>
      </ModalContext.Provider>
    </>
  );
}
