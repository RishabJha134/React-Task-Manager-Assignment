import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  editingTask: Task | null;
}

const initialState: TaskState = {
  tasks: [],
  editingTask: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push({ ...action.payload, id: Date.now() });
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setEditingTask(state, action: PayloadAction<Task | null>) {
      state.editingTask = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setEditingTask } = taskSlice.actions;
export const selectTasks = (state: any) => state.tasks.tasks;
export const selectTask = (state: any) => state.tasks.editingTask;
export default taskSlice.reducer;
