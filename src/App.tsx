import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Content, Modal, Navbar, Sidebar } from './components';
import {
  ContentContext,
  ModalContext,
  newProjectDefault,
  newTaskDefault,
  useLocalStorage
} from './common';
import { ProjectType, TaskType, ModalType } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 'Inbox');
  const [allTasks, setAllTasks] = useLocalStorage<TaskType[]>('allTasks', []);
  const [allProjects, setAllProjects] = useLocalStorage<ProjectType[]>(
    'allProjects',
    []
  );
  const [isProjectsOpen, setIsProjectsOpen] = useLocalStorage(
    'isProjectOpen',
    true
  );

  const [selectedTaskId, setSelectedTaskId] = useState<null | number>(null);
  const [modalMode, setModalMode] = useState<ModalType>('addTask');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 800);

  const formMethods = useForm<TaskType | ProjectType>({
    defaultValues: newTaskDefault
  });

  useEffect(() => {
    const handleContainerHeight = () => {
      const mainContainer = document.querySelector(
        '#root > nav'
      ) as HTMLDivElement;
      return window.innerHeight - mainContainer.clientHeight - 1;
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
      document.documentElement.style.setProperty(
        '--main-container-height',
        `${handleContainerHeight()}px`
      );
    };
    const todaysDate = new Date().toLocaleDateString('en-gb').slice(0, 2);

    if (parseInt(todaysDate, 10) < 10)
      document.documentElement.style.setProperty('--date-spacing', '7px');

    document.documentElement.style.setProperty('--todays-date', todaysDate);
    document.documentElement.style.setProperty(
      '--main-container-height',
      `${handleContainerHeight()}px`
    );
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isSidebarOpen) setIsSidebarOpen(false);
    else if (!isMobile && !isSidebarOpen) setIsSidebarOpen(true);
  }, [isMobile]);

  useEffect(() => {
    const projects = document.getElementById('projects') as HTMLElement;
    if (isProjectsOpen)
      projects.style.height = `${projects.scrollHeight + 16}px`;
    else projects.style.height = '0px';
  }, [isProjectsOpen, allProjects]);

  useEffect(() => {
    if (currentPage === 'Today') formMethods.setValue('project', 'Inbox');
    else if (currentPage !== 'Today')
      formMethods.setValue('project', currentPage);
  }, [currentPage, modalMode]);

  const addTask = () => {
    if (modalMode !== 'addTask') formMethods.reset(newTaskDefault);

    setModalMode('addTask');
    setIsModalOpen(true);
  };

  const addProject = () => {
    if (modalMode !== 'addProject') formMethods.reset(newProjectDefault);

    setModalMode('addProject');
    setIsModalOpen(true);
  };

  const editTask = (targetId: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    formMethods.reset(allTasks.find(({ id }) => id === targetId) as TaskType);
    setSelectedTaskId(targetId);
    setModalMode('editTask');
    setIsModalOpen(true);
  };

  const editProject = (targetId: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const project = allProjects.find(({ id }) => id === targetId);
    formMethods.reset(project);
    setSelectedTaskId(targetId);
    setModalMode('editProject');
    setIsModalOpen(true);
  };

  const removeTask = (targetId?: number) => (e: React.MouseEvent) => {
    if (targetId) {
      e.stopPropagation();
      setSelectedTaskId(targetId);
      setModalMode('removeTask');
      setIsModalOpen(true);
    } else if (selectedTaskId) {
      setAllTasks(allTasks.filter(({ id }) => id !== selectedTaskId));
      setIsModalOpen(false);
      setSelectedTaskId(null);
    }
  };

  const removeProject = (targetId?: number) => (e: React.MouseEvent) => {
    if (targetId) {
      e.stopPropagation();
      setSelectedTaskId(targetId);
      setModalMode('removeProject');
      setIsModalOpen(true);
    } else if (selectedTaskId) {
      const { title: prevProjectTitle } = allProjects.find(
        ({ id }) => id === selectedTaskId
      ) as ProjectType;

      setAllTasks(
        allTasks.filter(({ project }) => project !== prevProjectTitle)
      );

      setAllProjects(allProjects.filter(({ id }) => id !== selectedTaskId));
      setIsModalOpen(false);
      setSelectedTaskId(null);

      if (currentPage === prevProjectTitle) setCurrentPage('Inbox');
    }
  };

  const viewTask = (targetId: number) => () => {
    setSelectedTaskId(targetId);
    setModalMode('viewTask');
    setIsModalOpen(true);
  };

  const onSubmit = (currentTask: TaskType | ProjectType) => {
    if (modalMode === 'addTask') {
      setAllTasks([
        { ...currentTask, id: Date.now() } as TaskType,
        ...allTasks
      ]);
      setTimeout(() => {
        formMethods.reset(newTaskDefault);
      }, 250);
    } else if (modalMode === 'editTask') {
      setAllTasks(
        allTasks.map((task) =>
          task.id === currentTask.id ? currentTask : task
        ) as TaskType[]
      );
    } else if (['addProject', 'editProject'].includes(modalMode)) {
      let { title } = currentTask;

      title = title.trim();

      if (
        allProjects.find(({ title: projectTitle }) => projectTitle === title)
      ) {
        formMethods.setError('title', {
          type: 'custom',
          message: `Project with title '${title}' already exists!`
        });
        return;
      }

      if (modalMode === 'addProject') {
        setAllProjects([...allProjects, { id: Date.now(), title }]);
        formMethods.reset();
      } else {
        const { title: prevProjectTitle } = allProjects.find(
          ({ id }) => id === selectedTaskId
        ) as ProjectType;

        setAllTasks(
          allTasks.map((task) =>
            task.project === prevProjectTitle
              ? { ...task, project: title }
              : task
          )
        );

        setAllProjects(
          allProjects.map((project) =>
            project.id === currentTask.id ? { ...project, title } : project
          )
        );

        if (currentPage === prevProjectTitle) setCurrentPage(title);

        setSelectedTaskId(null);
      }
    }

    setIsModalOpen(false);
  };

  const toggleCompleted = (targetId: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setAllTasks(
      allTasks.map((task) =>
        task.id === targetId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCurrentPage = (targetPage: string) => () => {
    if (currentPage === targetPage) return;
    setCurrentPage(targetPage);
  };

  const handleProjectsClick = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar
        handleSidebarClick={handleSidebarClick}
        handleCurrentPage={handleCurrentPage}
        addTask={addTask}
      />
      <Sidebar
        currentPage={currentPage}
        allProjects={allProjects}
        isSidebarOpen={isSidebarOpen}
        isProjectsOpen={isProjectsOpen}
        addProject={addProject}
        editProject={editProject}
        removeProject={removeProject}
        handleCurrentPage={handleCurrentPage}
        handleProjectsClickOpen={handleProjectsClick}
      />
      <ContentContext.Provider
        value={{
          allTasks,
          viewTask,
          toggleCompleted,
          editTask,
          removeTask
        }}
      >
        <Content
          currentPage={currentPage}
          allTasks={allTasks}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          handleSidebarClick={handleSidebarClick}
        />
      </ContentContext.Provider>
      <ModalContext.Provider
        value={{
          currentPage,
          allProjects,
          allTasks,
          selectedTaskId,
          removeTask,
          removeProject
        }}
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
