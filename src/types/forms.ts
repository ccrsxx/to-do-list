export interface TaskType {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  project: string;
  completed: boolean;
}

export interface ProjectType {
  id: number;
  title: string;
}
