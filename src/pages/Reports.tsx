import { useState } from 'react';
import { detectionTasks, detectionRecords } from '../data/mockData';

type ReportsTab = 'reports' | 'trace';

export default function Reports() {
  const [activeTab, setActiveTab] = useState<ReportsTab>('reports');
  const [traceQuery, setTraceQuery] = useState('');
  const [showPreview, setShowPreview] = useState<number | null>(null);

  const completedTasks = detectionTasks.filter(t => t.status === '已完成');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            检验报告
          </button>
          <button
            onClick={() => setActiveTab('trace')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'trace' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            质量追溯
          </button>
        </div>

        <div className="p-4 md:p-6">
          {activeTab === 'reports' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <p className="text-sm text-gray-500">按批次自动生成检验报告，支持在线预览与导出</p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">📄 批量导出</button>
              </div>
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-800">{task.taskCode}</h4>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                            {task.taskType}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{task.productName} · 批次号：{task.batchNo}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>检测数量：{task.quantity}台</span>
                          <span>合格率：{task.passRate}%</span>
                          <span>检测员：{task.assignee}</span>
                          <span>完成日期：{task.deadline}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setShowPreview(task.id)} className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">预览</button>
                        <button className="px-3 py-1.5 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200">导出Excel</button>
                        <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">打印</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'trace' && (
            <div>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">输入产品序列号或批次号进行正反向追溯</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={traceQuery}
                    onChange={(e) => setTraceQuery(e.target.value)}
                    placeholder="请输入序列号或批次号，如：SN001 或 B20260301"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 whitespace-nowrap">追溯查询</button>
                </div>
              </div>

              {/* Trace Result */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">追溯结果 — 批次 B20260301</h4>

                {/* Forward Trace */}
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-blue-600 mb-3">📍 正向追溯（物料 → 检测 → 成品）</h5>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">产品信息</p>
                      <p className="text-sm font-medium">智能马桶 基础款A (ST-1001A) · 批次B20260301 · 200台</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">检测记录</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <span>冲洗性能：5.8L ✅</span>
                        <span>泄漏电流：0.2mA ✅</span>
                        <span>座圈温度：37.5℃ ✅</span>
                        <span>整机噪音：58dB ❌</span>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">操作人员</p>
                      <p className="text-sm">检测员：李明 · 审核人：张伟 · 生产日期：2026-03-01</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">检验结论</p>
                      <p className="text-sm font-medium text-purple-700">合格率：97.5% · 存在2项不合格（冲洗性能、整机噪音）· 已发起返工处置</p>
                    </div>
                  </div>
                </div>

                {/* Backward Trace */}
                <div>
                  <h5 className="text-sm font-medium text-orange-600 mb-3">📍 反向追溯（成品 → 流向追踪）</h5>
                  <div className="space-y-3">
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">产品流向</p>
                      <div className="text-sm space-y-1">
                        <p>• 成品入库：2026-03-02 → 成品仓A区</p>
                        <p>• 出库发货：2026-03-04 → 华东经销商（150台）</p>
                        <p>• 出库发货：2026-03-05 → 华南经销商（48台）</p>
                        <p>• 留样备查：2台</p>
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">关联不合格品记录</p>
                      <p className="text-sm">NC-2026-0001（冲洗性能）· NC-2026-0002（整机噪音）→ 均已返工完成</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPreview(null)}>
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">出厂检验报告预览</h3>
              <button onClick={() => setShowPreview(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            {/* Report Content */}
            <div className="border border-gray-300 p-6 bg-white">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold">出厂检验报告</h2>
                <p className="text-sm text-gray-500 mt-1">报告编号：RPT-2026-0001</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div><span className="text-gray-500">产品名称：</span>智能马桶 基础款A</div>
                <div><span className="text-gray-500">产品型号：</span>ST-1001A</div>
                <div><span className="text-gray-500">批次号：</span>B20260301</div>
                <div><span className="text-gray-500">检测数量：</span>200台</div>
                <div><span className="text-gray-500">检测类型：</span>出厂检验</div>
                <div><span className="text-gray-500">检测依据：</span>GB/T 34549—2024</div>
                <div><span className="text-gray-500">检测员：</span>李明</div>
                <div><span className="text-gray-500">审核人：</span>张伟</div>
              </div>
              <table className="w-full text-sm border-collapse mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">检测项目</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">标准值</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">实测值</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">判定</th>
                  </tr>
                </thead>
                <tbody>
                  {detectionRecords.filter(r => r.taskCode === 'DT-2026-0001').map(r => (
                    <tr key={r.id}>
                      <td className="border border-gray-300 px-3 py-2">{r.itemName}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{r.standardValue}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{r.measuredValue}</td>
                      <td className={`border border-gray-300 px-3 py-2 text-center ${r.result === '不合格' ? 'text-red-600 font-medium' : ''}`}>{r.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-green-700">检验结论：合格率 97.5%，判定为合格批次</p>
              </div>
              <div className="mt-6 flex justify-between text-sm text-gray-500">
                <span>检测员签字：________</span>
                <span>审核人签字：________</span>
                <span>日期：2026-03-02</span>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowPreview(null)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg">关闭</button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">导出PDF</button>
              <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">打印</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
