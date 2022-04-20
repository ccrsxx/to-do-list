import { createContext } from 'react';

interface ContentContextProps {
  toggleCompleted: (targetId: number) => () => void;
  editTask: (targetId: number) => (e: React.MouseEvent) => void;
  removeTask: (targetId: number) => (e: React.MouseEvent) => void;
}

export const ContentContext = createContext<
  ContentContextProps | Record<string, never>
>({});
