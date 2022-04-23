export const newTaskDefault = {
  id: Date.now(),
  title: '',
  description: '',
  date: '',
  priority: 'Medium' as 'low' | 'medium' | 'high',
  project: 'Inbox',
  completed: false
};

export const newProjectDefault = {
  id: Date.now(),
  title: ''
};
