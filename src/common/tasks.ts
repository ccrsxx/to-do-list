export const newTaskDefault = {
  id: Date.now(),
  title: '',
  description: '',
  date: '',
  priority: 'medium' as 'low' | 'medium' | 'high',
  project: 'inbox',
  completed: false
};
