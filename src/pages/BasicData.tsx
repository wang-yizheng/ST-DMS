import { useState } from 'react';
import { productModels, detectionItems } from '../data/mockData';

type TabKey = 'products' | 'items' | 'standards' | 'equipment';

export default function BasicData() {
  const [activeTab, setActiveTab] = useState<TabKey>('products');

  const tabs = [
    { key: 'products' as TabKey, label: '产品型号' },
    { key: 'items' as TabKey, label: '检测项目' },
    { key: 'standards' as TabKey, label: '检测标准' },
    { key: 'equipment' as TabKey, label: '检测设备' },
  ];

  const mockEquipment = [
    { id: 1, code: 'DC-001', name: '泄漏电流测试仪', model: 'RK2672AX', status: '正常', validUntil: '2026-08-15', responsible: '李明' },
    { id: 2, code: 'DC-002', name: '电气强度测试仪', model: 'RK2674AX', status: '正常', validUntil: '2026-09-20', responsible: '李明' },
    { id: 3, code: 'DC-003', name: '接地电阻测试仪', model: 'RK2678B', status: '即将到期', validUntil: '2026-03-20', responsible: '王芳' },
    { id: 4, code: 'DC-004', name: '噪音计', model: 'AWA5688', status: '正常', validUntil: '2026-12-01', responsible: '王芳' },
    { id: 5, code: 'DC-005', name: '功率计', model: 'WT333E', status: '正常', validUntil: '2027-01-15', responsible: '李明' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
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
          {/* Product Models */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">管理产品型号信息，为不同型号绑定检测方案</p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">+ 新增型号</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productModels.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{product.modelName}</h4>
                        <p className="text-xs text-gray-500 mt-1">{product.modelCode}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {product.status === 'active' ? '在售' : '停产'}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><span className="text-gray-400">分类：</span>{product.category}</p>
                      <p className="text-xs text-gray-600"><span className="text-gray-400">供应商：</span>{product.supplier}</p>
                      <p className="text-xs text-gray-600"><span className="text-gray-400">描述：</span>{product.description}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                      <button className="text-xs text-blue-600 hover:text-blue-800">配置方案</button>
                      <button className="text-xs text-gray-600 hover:text-gray-800">编辑</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detection Items */}
          {activeTab === 'items' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">配置检测项目库，设定标准值与判定规则</p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">+ 新增项目</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 font-medium text-gray-600">编号</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">项目名称</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">分类</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">单位</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">标准值</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">上限</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">下限</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detectionItems.map(item => (
                      <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600">{item.itemCode}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{item.itemName}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">{item.category}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{item.unit}</td>
                        <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{item.standardValue}</td>
                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{item.upperLimit}</td>
                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{item.lowerLimit}</td>
                        <td className="px-4 py-3">
                          <button className="text-xs text-blue-600 hover:text-blue-800">编辑</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Detection Standards */}
          {activeTab === 'standards' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">管理检测标准文件，支持版本控制与变更记录</p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">+ 上传标准</button>
              </div>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">GB/T 34549—2024 卫生洁具 智能坐便器</h4>
                      <p className="text-xs text-gray-500 mt-1">发布单位：国家市场监督管理总局 | 实施日期：2024-10-01</p>
                      <p className="text-xs text-gray-500 mt-1">替代标准：GB/T 34549—2017</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">现行有效</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">GB 4706.1—2024 家用和类似用途电器的安全</h4>
                      <p className="text-xs text-gray-500 mt-1">发布单位：国家标准化管理委员会 | 实施日期：2025-01-01</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">现行有效</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">GB/T 6952—2015 卫生陶瓷</h4>
                      <p className="text-xs text-gray-500 mt-1">发布单位：国家标准化管理委员会 | 实施日期：2016-01-01</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">即将替代</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Equipment */}
          {activeTab === 'equipment' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">管理检测设备信息，跟踪检定有效期</p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">+ 新增设备</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 font-medium text-gray-600">设备编号</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">设备名称</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">型号</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">检定有效期</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">责任人</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEquipment.map(eq => (
                      <tr key={eq.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800">{eq.code}</td>
                        <td className="px-4 py-3 text-gray-800">{eq.name}</td>
                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{eq.model}</td>
                        <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{eq.validUntil}</td>
                        <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{eq.responsible}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            eq.status === '正常' ? 'bg-green-100 text-green-700' :
                            eq.status === '即将到期' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>{eq.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
