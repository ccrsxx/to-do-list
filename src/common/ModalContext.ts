import React, { createContext } from 'react';
import { ProjectType, TaskType } from '../types';

interface ModalContextProps {
  currentPage: string;
  allProjects: ProjectType[];
  allTasks: TaskType[];
  selectedTaskId: null | number;
  removeTask: (targetId?: number) => (e: React.MouseEvent) => void;
  removeProject: (targetId?: number) => (e: React.MouseEvent) => void;
}

export const ModalContext = createContext<
  ModalContextProps | Record<string, never>
>({});
