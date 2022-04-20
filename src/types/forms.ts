export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  project: string;
  completed: boolean;
  first?: boolean;
}

export interface Project {
  id: number;
  title: string;
}
