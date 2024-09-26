import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Button } from 'antd';
import { deleteTask, selectTasks } from '../redux/taskSlice';
import { Task } from '../types/task';
import dayjs from 'dayjs'; // Import dayjs for date formatting

const TaskList: React.FC<{ onEdit: (task: Task) => void }> = ({ onEdit }) => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task: Task) => (
          <List.Item
            className={`flex justify-between items-center p-4 mb-2 border rounded-md ${task.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {dayjs(task.dueDate).format('MMMM D, YYYY')} | Priority: {task.priority}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button type="primary" onClick={() => onEdit(task)}>Edit</Button>
              <Button type="danger" onClick={() => dispatch(deleteTask(task.id!))}>Delete</Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskList;
