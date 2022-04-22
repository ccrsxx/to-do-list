import { createContext } from 'react';
import { ProjectType } from '../types';

interface ContentContextProps {
  allProjects: ProjectType[];
  viewTask: (targetId: number) => () => void;
  toggleCompleted: (targetId: number) => (e: React.MouseEvent) => void;
  editTask: (targetId: number) => (e: React.MouseEvent) => void;
  removeTask: (targetId: number) => (e: React.MouseEvent) => void;
}

export const ContentContext = createContext<
  ContentContextProps | Record<string, never>
>({});
