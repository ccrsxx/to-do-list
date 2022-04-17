export type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'low' | 'normal' | 'high';
  project: string;
};
