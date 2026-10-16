import { useState } from 'react';
import type { UserInfo } from '../App';
import { nonConformingRecords } from '../data/mockData';

interface NonConformingProps {
  user: UserInfo;
}

export default function NonConforming({ user }: NonConformingProps) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetail, setShowDetail] = useState<number | null>(null);

  const filteredRecords = statusFilter === 'all'
    ? nonConformingRecords
    : nonConformingRecords.filter(r => r.status === statusFilter);

  const statusColors: Record<string, string> = {
    '待处理': 'bg-red-100 text-red-700',
    '处理中': 'bg-orange-100 text-orange-700',
    '待审核': 'bg-yellow-100 text-yellow-700',
    '已完成': 'bg-green-100 text-green-700',
    '已关闭': 'bg-gray-100 text-gray-700',
  };

  const levelColors: Record<string, string> = {
    '轻微': 'bg-yellow-100 text-yellow-700',
    '一般': 'bg-orange-100 text-orange-700',
    '严重': 'bg-red-100 text-red-700',
    '致命': 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">待处理</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{nonConformingRecords.filter(r => r.status === '待处理').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">处理中</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{nonConformingRecords.filter(r => r.status === '处理中').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">待审核</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{nonConformingRecords.filter(r => r.status === '待审核').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">已完成</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{nonConformingRecords.filter(r => r.status === '已完成').length}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', '待处理', '处理中', '待审核', '已完成', '已关闭'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              statusFilter === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? '全部' : status}
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map(record => (
          <div key={record.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h4 className="font-semibold text-gray-800">{record.recordCode}</h4>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[record.status]}`}>{record.status}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${levelColors[record.defectLevel]}`}>{record.defectLevel}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{record.productName} · {record.batchNo} · {record.serialNo}</p>
                <p className="text-sm text-gray-500"><span className="font-medium">不良项目：</span>{record.defectItem}</p>
                <p className="text-sm text-gray-500 mt-1"><span className="font-medium">不良描述：</span>{record.defectDescription}</p>
                {record.causeAnalysis && record.causeAnalysis !== '待分析' && (
                  <p className="text-sm text-gray-500 mt-1"><span className="font-medium">原因分析：</span>{record.causeAnalysis}</p>
                )}
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                  <span>处置方式：{record.disposalMethod}</span>
                  <span>责任部门：{record.responsibleDept || '待指派'}</span>
                  <span>创建时间：{record.createTime}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {user.role === 'supervisor' && record.status === '待审核' && (
                  <button className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700">审批通过</button>
                )}
                {user.role === 'production' && record.status === '待处理' && (
                  <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">开始处理</button>
                )}
                <button onClick={() => setShowDetail(record.id)} className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">详情</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetail(null)}>
          <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {(() => {
              const record = nonConformingRecords.find(r => r.id === showDetail);
              if (!record) return null;
              return (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">不合格品详情</h3>
                    <button onClick={() => setShowDetail(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">记录编号</p>
                        <p className="text-sm font-medium">{record.recordCode}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">当前状态</p>
                        <p className="text-sm font-medium">{record.status}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">产品/批次</p>
                        <p className="text-sm font-medium">{record.productName}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">序列号</p>
                        <p className="text-sm font-medium">{record.serialNo}</p>
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">不良项目</p>
                      <p className="text-sm font-medium text-red-700">{record.defectItem} ({record.defectLevel})</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">不良描述</p>
                      <p className="text-sm">{record.defectDescription}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">原因分析</p>
                      <p className="text-sm">{record.causeAnalysis}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">处置方式</p>
                      <p className="text-sm font-medium text-blue-700">{record.disposalMethod}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">责任部门</p>
                      <p className="text-sm">{record.responsibleDept || '待指派'}</p>
                    </div>
                  </div>
                  {/* Flow Steps */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">处置流程</h4>
                    <div className="flex items-center gap-2 text-xs overflow-x-auto pb-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded whitespace-nowrap">✓ 不良登记</span>
                      <span className="text-gray-300">→</span>
                      <span className={`px-2 py-1 rounded whitespace-nowrap ${record.causeAnalysis !== '待分析' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {record.causeAnalysis !== '待分析' ? '✓' : '○'} 原因分析
                      </span>
                      <span className="text-gray-300">→</span>
                      <span className={`px-2 py-1 rounded whitespace-nowrap ${['处理中', '待审核', '已完成', '已关闭'].includes(record.status) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {['处理中', '待审核', '已完成', '已关闭'].includes(record.status) ? '✓' : '○'} 处置执行
                      </span>
                      <span className="text-gray-300">→</span>
                      <span className={`px-2 py-1 rounded whitespace-nowrap ${['待审核', '已完成', '已关闭'].includes(record.status) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {['待审核', '已完成', '已关闭'].includes(record.status) ? '✓' : '○'} 审核确认
                      </span>
                      <span className="text-gray-300">→</span>
                      <span className={`px-2 py-1 rounded whitespace-nowrap ${['已完成', '已关闭'].includes(record.status) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {['已完成', '已关闭'].includes(record.status) ? '✓' : '○'} 复检关闭
                      </span>
                    </div>
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
