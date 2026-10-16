import { useState } from 'react';
import type { UserInfo } from '../App';
import { detectionTasks } from '../data/mockData';

interface TaskManagementProps {
  user: UserInfo;
}

export default function TaskManagement({ user }: TaskManagementProps) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetail, setShowDetail] = useState<number | null>(null);

  const filteredTasks = statusFilter === 'all'
    ? detectionTasks
    : detectionTasks.filter(t => t.status === statusFilter);

  // 生产人员只能看到自己相关的任务
  const visibleTasks = user.role === 'production'
    ? filteredTasks.filter(t => t.taskType === '出厂检验')
    : filteredTasks;

  const statusOptions = ['all', '待派工', '待检测', '检测中', '待审核', '已完成', '已终止'];
  const statusColors: Record<string, string> = {
    '待派工': 'bg-gray-100 text-gray-700',
    '待检测': 'bg-orange-100 text-orange-700',
    '检测中': 'bg-blue-100 text-blue-700',
    '待审核': 'bg-yellow-100 text-yellow-700',
    '已完成': 'bg-green-100 text-green-700',
    '已终止': 'bg-red-100 text-red-700',
  };

  const statusCounts = {
    all: detectionTasks.length,
    '待派工': detectionTasks.filter(t => t.status === '待派工').length,
    '待检测': detectionTasks.filter(t => t.status === '待检测').length,
    '检测中': detectionTasks.filter(t => t.status === '检测中').length,
    '待审核': detectionTasks.filter(t => t.status === '待审核').length,
    '已完成': detectionTasks.filter(t => t.status === '已完成').length,
    '已终止': detectionTasks.filter(t => t.status === '已终止').length,
  };

  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              statusFilter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? '全部' : status}
            <span className="ml-1 text-xs opacity-70">({statusCounts[status as keyof typeof statusCounts]})</span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleTasks.map(task => (
          <div key={task.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowDetail(task.id)}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">{task.taskCode}</h4>
                <p className="text-sm text-gray-500 mt-1">{task.productName}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
                {task.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">批次号：</span>
                <span className="text-gray-700">{task.batchNo}</span>
              </div>
              <div>
                <span className="text-gray-400">数量：</span>
                <span className="text-gray-700">{task.quantity}台</span>
              </div>
              <div>
                <span className="text-gray-400">类型：</span>
                <span className="text-gray-700">{task.taskType}</span>
              </div>
              <div>
                <span className="text-gray-400">检测员：</span>
                <span className="text-gray-700">{task.assignee || '未分配'}</span>
              </div>
              <div>
                <span className="text-gray-400">创建时间：</span>
                <span className="text-gray-700">{task.createTime}</span>
              </div>
              <div>
                <span className="text-gray-400">截止日期：</span>
                <span className="text-gray-700">{task.deadline}</span>
              </div>
            </div>
            {task.passRate !== null && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">合格率</span>
                  <span className={`text-lg font-bold ${task.passRate >= 98 ? 'text-green-600' : task.passRate >= 95 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {task.passRate}%
                  </span>
                </div>
              </div>
            )}
            {/* Action buttons based on role */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
              {user.role === 'supervisor' && task.status === '待派工' && (
                <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">派发任务</button>
              )}
              {user.role === 'inspector' && task.status === '待检测' && (
                <button className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700">开始检测</button>
              )}
              {user.role === 'supervisor' && task.status === '待审核' && (
                <button className="px-3 py-1.5 text-xs bg-orange-600 text-white rounded-lg hover:bg-orange-700">审核</button>
              )}
              {task.status === '检测中' && (
                <button className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">录入数据</button>
              )}
              <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">查看详情</button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetail(null)}>
          <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {(() => {
              const task = detectionTasks.find(t => t.id === showDetail);
              if (!task) return null;
              return (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">任务详情</h3>
                    <button onClick={() => setShowDetail(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">任务编号</p>
                        <p className="text-sm font-medium">{task.taskCode}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">状态</p>
                        <p className="text-sm font-medium">{task.status}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">产品名称</p>
                        <p className="text-sm font-medium">{task.productName}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">产品型号</p>
                        <p className="text-sm font-medium">{task.modelCode}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">批次号</p>
                        <p className="text-sm font-medium">{task.batchNo}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">检测数量</p>
                        <p className="text-sm font-medium">{task.quantity}台</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">检测类型</p>
                        <p className="text-sm font-medium">{task.taskType}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">检测员</p>
                        <p className="text-sm font-medium">{task.assignee || '未分配'}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">创建时间</p>
                      <p className="text-sm font-medium">{task.createTime}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">截止日期</p>
                      <p className="text-sm font-medium">{task.deadline}</p>
                    </div>
                    {task.passRate !== null && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">一次交验合格率</p>
                        <p className="text-2xl font-bold text-green-600">{task.passRate}%</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
