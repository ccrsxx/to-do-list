export const newTaskDefault = {
  id: Date.now(),
  title: '',
  description: '',
  date: '',
  priority: 'Low' as 'Low' | 'Medium' | 'High',
  project: 'Inbox',
  completed: false
};

export const newProjectDefault = {
  id: Date.now(),
  title: ''
};
