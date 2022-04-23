export interface TaskType {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  project: string;
  completed: boolean;
}

export interface ProjectType {
  id: number;
  title: string;
}
