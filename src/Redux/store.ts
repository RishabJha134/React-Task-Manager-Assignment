// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice'; // Make sure this matches your folder structure
 // Ensure this matches your actual filename

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
