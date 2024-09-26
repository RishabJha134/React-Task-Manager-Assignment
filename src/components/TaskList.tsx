// TaskList.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Button } from 'antd';
import { deleteTask, selectTasks } from '../Redux/taskSlice';
import { Task } from '../types'; // Ensure the path is correct
import dayjs from 'dayjs'; // Import dayjs for date formatting

const TaskList: React.FC<{ onEdit: (task: Task) => void }> = ({ onEdit }) => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Task List</h2>
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task: Task) => (
          <List.Item
            className={`flex justify-between items-center p-4 mb-4 border border-gray-200 rounded-lg transition-shadow duration-200 hover:shadow-md ${task.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {dayjs(task.dueDate).format('MMMM D, YYYY')} | Priority: 
                <span className={`font-medium ${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {task.priority}
                </span>
              </p>
            </div>
            <div className="flex space-x-2">
              <Button type="primary" onClick={() => onEdit(task)}>Edit</Button>
              <Button type="default" danger onClick={() => dispatch(deleteTask(task.id!))}>Delete</Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskList;
