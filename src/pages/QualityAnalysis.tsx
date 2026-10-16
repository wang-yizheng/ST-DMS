import { useState } from 'react';
import { qualityTrendData, defectParetoData, modelPassRateData, spcData } from '../data/mockData';
import ReactECharts from 'echarts-for-react';

type AnalysisTab = 'trend' | 'pareto' | 'model' | 'spc';

export default function QualityAnalysis() {
  const [activeTab, setActiveTab] = useState<AnalysisTab>('trend');
  const [timeRange, setTimeRange] = useState('month');

  const tabs = [
    { key: 'trend' as AnalysisTab, label: '合格率趋势' },
    { key: 'pareto' as AnalysisTab, label: '不良柏拉图' },
    { key: 'model' as AnalysisTab, label: '型号对比' },
    { key: 'spc' as AnalysisTab, label: 'SPC控制图' },
  ];

  const trendOption = {
    tooltip: { trigger: 'axis' as const },
    legend: { data: ['合格率', '目标值'], top: 0 },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    dataZoom: [{ type: 'inside' }, { type: 'slider' }],
    xAxis: { type: 'category' as const, data: qualityTrendData.map(d => d.date) },
    yAxis: { type: 'value' as const, min: 94, max: 100, axisLabel: { formatter: '{value}%' } },
    series: [
      { name: '合格率', type: 'line', data: qualityTrendData.map(d => d.passRate), smooth: true, itemStyle: { color: '#3b82f6' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(59,130,246,0.3)' }, { offset: 1, color: 'rgba(59,130,246,0.05)' }] } } },
      { name: '目标值', type: 'line', data: qualityTrendData.map(d => d.targetRate), lineStyle: { type: 'dashed' as const, color: '#ef4444' }, itemStyle: { color: '#ef4444' }, symbol: 'none' },
    ],
  };

  const paretoOption = {
    tooltip: { trigger: 'axis' as const },
    grid: { left: '3%', right: '8%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category' as const, data: defectParetoData.map(d => d.name), axisLabel: { rotate: 30 } },
    yAxis: [
      { type: 'value' as const, name: '频次', minInterval: 1 },
      { type: 'value' as const, name: '累计%', max: 100, axisLabel: { formatter: '{value}%' } },
    ],
    series: [
      {
        name: '不良频次', type: 'bar', data: defectParetoData.map(d => d.value),
        itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top' as const, fontSize: 11 }
      },
      {
        name: '累计百分比', type: 'line', yAxisIndex: 1,
        data: (() => { const total = defectParetoData.reduce((s, d) => s + d.value, 0); let cum = 0; return defectParetoData.map(d => { cum += d.value; return Math.round(cum / total * 100); }); })(),
        itemStyle: { color: '#ef4444' }, symbol: 'circle', symbolSize: 8,
        label: { show: true, position: 'top' as const, formatter: '{c}%', fontSize: 10 }
      },
    ],
  };

  const modelOption = {
    tooltip: { trigger: 'axis' as const },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category' as const, data: modelPassRateData.map(d => d.name) },
    yAxis: { type: 'value' as const, min: 94, max: 100, axisLabel: { formatter: '{value}%' } },
    series: [{
      type: 'bar', data: modelPassRateData.map(d => ({
        value: d.passRate,
        itemStyle: { color: d.passRate >= 98 ? '#10b981' : d.passRate >= 96 ? '#f59e0b' : '#ef4444', borderRadius: [6, 6, 0, 0] }
      })),
      barWidth: '40%',
      label: { show: true, position: 'top' as const, formatter: '{c}%', fontSize: 12 }
    }],
  };

  const spcOption = {
    tooltip: { trigger: 'axis' as const },
    legend: { data: ['实测值', 'UCL', 'CL', 'LCL'], top: 0 },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category' as const, data: spcData.map(d => `#${d.sample}`) },
    yAxis: { type: 'value' as const, min: 4.5, max: 6.8, name: '冲洗性能(L)' },
    series: [
      { name: '实测值', type: 'line', data: spcData.map(d => d.value), itemStyle: { color: '#3b82f6' }, symbol: 'circle', symbolSize: 6 },
      { name: 'UCL', type: 'line', data: spcData.map(d => d.ucl), lineStyle: { type: 'dashed' as const, color: '#ef4444' }, itemStyle: { color: '#ef4444' }, symbol: 'none' },
      { name: 'CL', type: 'line', data: spcData.map(d => d.center), lineStyle: { type: 'solid', color: '#10b981' }, itemStyle: { color: '#10b981' }, symbol: 'none' },
      { name: 'LCL', type: 'line', data: spcData.map(d => d.lcl), lineStyle: { type: 'dashed' as const, color: '#ef4444' }, itemStyle: { color: '#ef4444' }, symbol: 'none' },
    ],
  };

  // Calculate Cpk
  const values = spcData.map(d => d.value);
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const stdDev = Math.sqrt(values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / (values.length - 1));
  const usl = 6.5, lsl = 5.0;
  const cpk = Math.min((usl - mean) / (3 * stdDev), (mean - lsl) / (3 * stdDev));

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-2">
          {[{ key: 'week', label: '本周' }, { key: 'month', label: '本月' }, { key: 'quarter', label: '本季度' }].map(item => (
            <button
              key={item.key}
              onClick={() => setTimeRange(item.key)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                timeRange === item.key ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6">
          {activeTab === 'trend' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">一次交验合格率趋势曲线</h3>
              <ReactECharts option={trendOption} style={{ height: '350px' }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">平均合格率</p>
                  <p className="text-lg font-bold text-blue-600">{(qualityTrendData.reduce((s, d) => s + d.passRate, 0) / qualityTrendData.length).toFixed(1)}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">最高合格率</p>
                  <p className="text-lg font-bold text-green-600">{Math.max(...qualityTrendData.map(d => d.passRate))}%</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">最低合格率</p>
                  <p className="text-lg font-bold text-red-600">{Math.min(...qualityTrendData.map(d => d.passRate))}%</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">达标天数</p>
                  <p className="text-lg font-bold text-yellow-600">{qualityTrendData.filter(d => d.passRate >= 98).length}/{qualityTrendData.length}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pareto' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">不良项分布柏拉图</h3>
              <ReactECharts option={paretoOption} style={{ height: '350px' }} />
              <p className="text-sm text-gray-500 mt-4">
                📊 柏拉图分析显示：冲洗性能不合格（35%）和整机噪音超标（28%）两项合计占不良总数的63%，
                根据"二八原则"，应优先解决这两项问题可显著降低不良率。
              </p>
            </div>
          )}

          {activeTab === 'model' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">各型号合格率对比</h3>
              <ReactECharts option={modelOption} style={{ height: '350px' }} />
              <p className="text-sm text-gray-500 mt-4">
                📊 旗舰款D合格率最高（99.1%），标准款B合格率相对较低（96.8%），建议对标准款B的生产工艺进行重点分析。
              </p>
            </div>
          )}

          {activeTab === 'spc' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">SPC控制图 — 冲洗性能（均值-极差图）</h3>
              <ReactECharts option={spcOption} style={{ height: '350px' }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">均值 (X̄)</p>
                  <p className="text-lg font-bold text-blue-600">{mean.toFixed(3)}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">标准差 (σ)</p>
                  <p className="text-lg font-bold text-green-600">{stdDev.toFixed(3)}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Cpk</p>
                  <p className={`text-lg font-bold ${cpk >= 1.33 ? 'text-green-600' : cpk >= 1.0 ? 'text-yellow-600' : 'text-red-600'}`}>{cpk.toFixed(2)}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">工序判定</p>
                  <p className={`text-lg font-bold ${cpk >= 1.33 ? 'text-green-600' : 'text-yellow-600'}`}>{cpk >= 1.33 ? '充分' : '需关注'}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                📊 SPC分析：所有数据点均在控制限内，无异常趋势。Cpk={cpk.toFixed(2)}，
                {cpk >= 1.33 ? '工序能力充分，过程稳定。' : '工序能力尚可但需关注，建议优化工艺参数。'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
