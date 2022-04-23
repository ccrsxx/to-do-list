import { createContext } from 'react';
import { TaskType } from '../types';

interface ContentContextProps {
  allTasks: TaskType[];
  viewTask: (targetId: number) => () => void;
  toggleCompleted: (targetId: number) => (e: React.MouseEvent) => void;
  editTask: (targetId: number) => (e: React.MouseEvent) => void;
  removeTask: (targetId: number) => (e: React.MouseEvent) => void;
}

export const ContentContext = createContext<
  ContentContextProps | Record<string, never>
>({});
