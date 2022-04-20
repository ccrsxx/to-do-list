import React, { createContext } from 'react';
import type { Project } from '../types';

interface ModalContextProps {
  allProjects: Project[];
  removeTask: (targetId?: number) => (e: React.MouseEvent) => void;
}

export const ModalContext = createContext<
  ModalContextProps | Record<string, never>
>({});
