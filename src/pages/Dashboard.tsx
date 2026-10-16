import type { UserInfo } from '../App';
import { detectionTasks, nonConformingRecords, qualityTrendData, defectParetoData } from '../data/mockData';
import ReactECharts from 'echarts-for-react';

interface DashboardProps {
  user: UserInfo;
}

export default function Dashboard({ user }: DashboardProps) {
  const pendingTasks = detectionTasks.filter(t => t.status === '待检测' || t.status === '待派工').length;
  const inProgressTasks = detectionTasks.filter(t => t.status === '检测中').length;
  const pendingApproval = nonConformingRecords.filter(n => n.status === '待审核' || n.status === '待处理').length;
  const avgPassRate = (qualityTrendData.reduce((sum, d) => sum + d.passRate, 0) / qualityTrendData.length).toFixed(1);

  const trendOption = {
    tooltip: { trigger: 'axis' as const },
    legend: { data: ['合格率', '目标值'], top: 0 },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category' as const, data: qualityTrendData.map(d => d.date) },
    yAxis: { type: 'value' as const, min: 94, max: 100, axisLabel: { formatter: '{value}%' } },
    series: [
      { name: '合格率', type: 'line', data: qualityTrendData.map(d => d.passRate), smooth: true, itemStyle: { color: '#3b82f6' }, areaStyle: { color: 'rgba(59,130,246,0.1)' } },
      { name: '目标值', type: 'line', data: qualityTrendData.map(d => d.targetRate), lineStyle: { type: 'dashed' as const }, itemStyle: { color: '#ef4444' } },
    ],
  };

  const paretoOption = {
    tooltip: { trigger: 'axis' as const },
    grid: { left: '3%', right: '8%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category' as const, data: defectParetoData.map(d => d.name), axisLabel: { rotate: 30 } },
    yAxis: [
      { type: 'value' as const, name: '频次' },
      { type: 'value' as const, name: '累计%', max: 100, axisLabel: { formatter: '{value}%' } },
    ],
    series: [
      { name: '不良频次', type: 'bar', data: defectParetoData.map(d => d.value), itemStyle: { color: '#3b82f6' } },
      { name: '累计百分比', type: 'line', yAxisIndex: 1, data: (() => { const total = defectParetoData.reduce((s, d) => s + d.value, 0); let cum = 0; return defectParetoData.map(d => { cum += d.value; return Math.round(cum / total * 100); }); })(), itemStyle: { color: '#ef4444' } },
    ],
  };

  const getRoleGreeting = () => {
    switch (user.role) {
      case 'admin': return '系统管理';
      case 'supervisor': return '质量管理';
      case 'inspector': return '检测工作';
      case 'production': return '生产送检';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h1 className="text-xl md:text-2xl font-bold">欢迎回来，{user.realName}</h1>
        <p className="text-blue-100 mt-1">今天是您负责{getRoleGreeting()}的一天，以下是当前工作概览</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">待处理任务</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{pendingTasks}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">📋</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">检测中任务</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{inProgressTasks}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">🔬</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">待审不合格品</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{pendingApproval}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-xl">⚠️</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">本月合格率</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{avgPassRate}%</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">✅</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">一次交验合格率趋势</h3>
          <ReactECharts option={trendOption} style={{ height: '280px' }} />
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">不良项柏拉图</h3>
          <ReactECharts option={paretoOption} style={{ height: '280px' }} />
        </div>
      </div>

      {/* Recent Tasks & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">最近检测任务</h3>
          <div className="space-y-3">
            {detectionTasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{task.taskCode}</p>
                  <p className="text-xs text-gray-500">{task.productName} · {task.batchNo}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.status === '已完成' ? 'bg-green-100 text-green-700' :
                  task.status === '检测中' ? 'bg-blue-100 text-blue-700' :
                  task.status === '待审核' ? 'bg-yellow-100 text-yellow-700' :
                  task.status === '已终止' ? 'bg-gray-100 text-gray-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">待办事项</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <span className="text-red-500 mt-0.5">●</span>
              <div>
                <p className="text-sm font-medium text-gray-800">不合格品NC-2026-0004待审核</p>
                <p className="text-xs text-gray-500">豪华款C · 接地电阻不合格 · 2026-03-07</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <span className="text-orange-500 mt-0.5">●</span>
              <div>
                <p className="text-sm font-medium text-gray-800">任务DT-2026-0004超期提醒</p>
                <p className="text-xs text-gray-500">旗舰款D · 型式试验 · 已超过计划时间</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <span className="text-yellow-500 mt-0.5">●</span>
              <div>
                <p className="text-sm font-medium text-gray-800">设备检定到期提醒</p>
                <p className="text-xs text-gray-500">泄漏电流测试仪DC-003 · 有效期至2026-03-20</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-500 mt-0.5">●</span>
              <div>
                <p className="text-sm font-medium text-gray-800">GB/T 34549—2024新标准实施</p>
                <p className="text-xs text-gray-500">2026年4月1日起正式实施，请及时更新检测方案</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
