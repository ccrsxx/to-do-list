export const newTaskDefault = {
  id: Date.now(),
  title: '',
  description: '',
  date: '',
  priority: 'normal' as 'low' | 'normal' | 'high',
  project: 'inbox'
};
