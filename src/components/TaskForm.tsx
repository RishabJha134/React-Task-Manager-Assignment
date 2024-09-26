import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { addTask, updateTask } from '../Redux/taskSlice';
import { Task } from '../types';
import dayjs from 'dayjs';

const TaskForm: React.FC<{ editingTask: Task | null; setEditingTask: (task: Task | null) => void }> = ({ editingTask, setEditingTask }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: dayjs(editingTask.dueDate),
        priority: editingTask.priority,
      });
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  const onFinish = (values: any) => {
    if (editingTask) {
      dispatch(updateTask({ ...editingTask, ...values }));
      setEditingTask(null);
    } else {
      dispatch(addTask(values));
    }
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" className="p-8 bg-red-400 shadow-lg rounded-lg">
      <h2 className="text-white text-2xl font-semibold mb-4">{editingTask ? 'Update Task' : 'Add New Task'}</h2>
      
      <Form.Item name="title" label="Task Title" rules={[{ required: true, message: 'Please input the task title!' }]}>
        <Input className="border border-gray-600 bg-gray-200 text-black rounded-md p-3 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Enter task title" />
      </Form.Item>
      
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
        <Input.TextArea className="border border-gray-600 bg-gray-200 text-black rounded-md p-3 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Enter task description" />
      </Form.Item>
      
      <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Please select a due date!' }]}>
        <DatePicker className="border border-gray-600 bg-gray-200 text-black rounded-md w-full p-3 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Select due date" />
      </Form.Item>
      
      <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Please select a priority!' }]}>
        <Select className="bg-gray-200 text-white rounded-md p-3" dropdownClassName="bg-gray-200 text-black hover:bg-gray-700" bordered={false}>
          <Select.Option value="low">Low</Select.Option>
          <Select.Option value="medium">Medium</Select.Option>
          <Select.Option value="high">High</Select.Option>
        </Select>
      </Form.Item>

      <Button 
        type="primary"
        htmlType="submit"
        className="bg-blue-600 text-white font-bold py-3 px-6 rounded"
      >
        {editingTask ? 'Update Task' : 'Add Task'}
      </Button>
    </Form>
  );
};

export default TaskForm;