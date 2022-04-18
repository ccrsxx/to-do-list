import { createContext } from 'react';

interface ContentContextProps {
  toggleCompleted: (targetId: number) => () => void;
}

export const ContentContext = createContext<
  ContentContextProps | Record<string, never>
>({});
