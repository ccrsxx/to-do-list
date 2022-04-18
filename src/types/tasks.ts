export type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  project: string;
  completed: boolean;
  first?: boolean;
};
