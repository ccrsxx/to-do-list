import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from './common/useLocalStorage';
import { Navbar, Sidebar, Content } from './components';

export function App() {
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 'inbox');
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    'isSidebarOpen',
    true
  );
  const [isProjectsOpen, setIsProjectsOpen] = useLocalStorage(
    'isProjectsOpen',
    false
  );

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 800);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen && isSidebarOpen) setIsSidebarOpen(false);
    else if (!isSmallScreen && !isSidebarOpen) setIsSidebarOpen(true);
  }, [isSmallScreen]);

  useEffect(() => {
    const projects = document.getElementById('projects') as HTMLElement;

    if (isProjectsOpen) projects.style.height = `${projects.scrollHeight}px`;
    else projects.style.height = '0px';
  }, [isProjectsOpen]);

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

  const todaysDate = useMemo(
    () => new Date().toLocaleDateString('en-gb').slice(0, 2),
    []
  );

  return (
    <>
      <Navbar
        handleSidebarClick={handleSidebarClick}
        handleCurrentPage={handleCurrentPage}
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
    </>
  );
}
