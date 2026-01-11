import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskStats from '../components/TaskStats';
import LoadingSpinner from '../components/LoadingSpinner';
import { Plus, Filter } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('-createdAt');

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.append('completed', filter === 'completed');
      }
      params.append('sort', sortBy);

      const response = await axios.get(`/api/tasks?${params}`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  // Fetch task statistics
  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/tasks/stats/summary');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, [filter, sortBy]);

  // Handle task creation
  const handleTaskCreated = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    setShowTaskForm(false);
    fetchStats(); // Refresh stats
    toast.success('Task created successfully!');
  };

  // Handle task update
  const handleTaskUpdated = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    setEditingTask(null);
    fetchStats(); // Refresh stats
    toast.success('Task updated successfully!');
  };

  // Handle task deletion
  const handleTaskDeleted = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      fetchStats(); // Refresh stats
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  // Handle task completion toggle
  const handleTaskToggle = async (taskId, completed) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, { completed });
      setTasks(prev => prev.map(task => 
        task._id === taskId ? response.data.task : task
      ));
      fetchStats(); // Refresh stats
      toast.success(completed ? 'Task completed!' : 'Task marked as pending');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" text="Loading your tasks..." />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your tasks and stay productive
          </p>
        </div>
        <button
          onClick={() => setShowTaskForm(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>

      {/* Task Statistics */}
      {stats && <TaskStats stats={stats} />}

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input w-auto"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="title">Title A-Z</option>
            <option value="-title">Title Z-A</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} found
        </div>
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={handleTaskDeleted}
        onToggle={handleTaskToggle}
      />

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleTaskUpdated : handleTaskCreated}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;