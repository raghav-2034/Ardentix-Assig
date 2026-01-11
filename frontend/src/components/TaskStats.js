import React from 'react';
import { CheckCircle, Clock, AlertCircle, BarChart3 } from 'lucide-react';

const TaskStats = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'High Priority',
      value: stats.high,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`card border ${stat.borderColor} ${stat.bgColor} transition-all duration-200 hover:shadow-md`}
            >
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                Overall Progress
              </h3>
              <span className="text-sm font-medium text-gray-600">
                {completionRate}% Complete
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{stats.completed} completed</span>
              <span>{stats.pending} remaining</span>
            </div>
          </div>
        </div>
      )}

      {/* Priority Breakdown */}
      {stats.total > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">
              Priority Breakdown
            </h3>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">High Priority</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats.high} tasks
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Medium Priority</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats.medium} tasks
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Low Priority</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats.low} tasks
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStats;