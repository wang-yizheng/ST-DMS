import { useState } from 'react';
import type { UserInfo } from '../App';
import { detectionRecords, detectionItems } from '../data/mockData';

interface DataCollectionProps {
  user: UserInfo;
}

export default function DataCollection({ user }: DataCollectionProps) {
  const [selectedTask, setSelectedTask] = useState('DT-2026-0002');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    serialNo: '',
    itemId: '',
    measuredValue: '',
  });

  const taskRecords = detectionRecords.filter(r => r.taskCode === selectedTask);
  const passCount = taskRecords.filter(r => r.result === '合格').length;
  const failCount = taskRecords.filter(r => r.result === '不合格').length;

  const handleAutoJudge = (measured: number, item: typeof detectionItems[0]): '合格' | '不合格' => {
    if (item.judgmentRule === '上限判定') {
      return measured <= item.upperLimit ? '合格' : '不合格';
    } else if (item.judgmentRule === '下限判定') {
      return measured >= item.lowerLimit ? '合格' : '不合格';
    } else {
      return measured >= item.lowerLimit && measured <= item.upperLimit ? '合格' : '不合格';
    }
  };

  return (
    <div className="space-y-6">
      {/* Task Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">选择检测任务</label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="DT-2026-0001">DT-2026-0001 - 基础款A - B20260301</option>
              <option value="DT-2026-0002">DT-2026-0002 - 标准款B - B20260302</option>
              <option value="DT-2026-0005">DT-2026-0005 - 基础款A - B20260305</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 whitespace-nowrap"
            >
              + 录入数据
            </button>
            <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 whitespace-nowrap">
              📥 Excel导入
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{taskRecords.length}</p>
            <p className="text-xs text-gray-500">已检测项数</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{passCount}</p>
            <p className="text-xs text-gray-500">合格项数</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-red-600">{failCount}</p>
            <p className="text-xs text-gray-500">不合格项数</p>
          </div>
        </div>
      </div>

      {/* Detection Records Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h3 className="font-semibold text-gray-800 mb-4">检测记录明细</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">序列号</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">检测项目</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">标准值</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">实测值</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">范围</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">判定</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">检测员</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">时间</th>
              </tr>
            </thead>
            <tbody>
              {taskRecords.map(record => (
                <tr key={record.id} className={`border-b border-gray-50 hover:bg-gray-50 ${record.result === '不合格' ? 'bg-red-50/50' : ''}`}>
                  <td className="px-4 py-3 text-gray-800">{record.serialNo}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{record.itemName}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{record.standardValue}</td>
                  <td className={`px-4 py-3 font-medium ${record.result === '不合格' ? 'text-red-600' : 'text-gray-800'}`}>
                    {record.measuredValue}
                    {record.result === '不合格' && <span className="ml-1 text-xs">⚠️</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                    [{record.lowerLimit} ~ {record.upperLimit}]
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      record.result === '合格' ? 'bg-green-100 text-green-700' :
                      record.result === '不合格' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {record.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{record.inspector}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{record.inspectTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Entry Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">录入检测数据</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">产品序列号</label>
                <input
                  type="text"
                  value={formData.serialNo}
                  onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="如：SN202"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">检测项目</label>
                <select
                  value={formData.itemId}
                  onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">请选择检测项目</option>
                  {detectionItems.map(item => (
                    <option key={item.id} value={item.id}>{item.itemName} ({item.unit})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">实测值</label>
                <input
                  type="number"
                  value={formData.measuredValue}
                  onChange={(e) => setFormData({ ...formData, measuredValue: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="请输入实测值"
                />
              </div>
              {formData.itemId && formData.measuredValue && (
                <div className={`p-3 rounded-lg ${
                  handleAutoJudge(Number(formData.measuredValue), detectionItems.find(i => i.id === Number(formData.itemId))!) === '合格'
                    ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <p className="text-sm font-medium">
                    自动判定：{handleAutoJudge(Number(formData.measuredValue), detectionItems.find(i => i.id === Number(formData.itemId))!)}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">提交</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
