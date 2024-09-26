import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';

const App: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />
        <TaskList onEdit={handleEditTask} />
      </div>
    </Provider>
  );
};

export default App;
