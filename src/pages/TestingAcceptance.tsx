import { useState } from 'react';

export default function TestingAcceptance() {
  const [activeTab, setActiveTab] = useState<'test-cases' | 'test-report' | 'acceptance'>('test-cases');
  const [selectedModule, setSelectedModule] = useState('all');

  const testModules = [
    { id: 'all', name: '全部模块', count: 48 },
    { id: 'system', name: '系统管理', count: 8 },
    { id: 'basic', name: '基础数据', count: 6 },
    { id: 'task', name: '检测任务', count: 7 },
    { id: 'data', name: '数据采集', count: 9 },
    { id: 'defect', name: '不合格品', count: 6 },
    { id: 'analysis', name: '质量分析', count: 5 },
    { id: 'report', name: '报表追溯', count: 4 },
    { id: 'ai', name: 'AI问答', count: 3 },
  ];

  const testCases = [
    // 系统管理模块
    { id: 1, module: 'system', moduleId: '系统管理', name: '用户登录-正确账号密码', type: '功能测试', priority: '高', status: '通过', executor: '张三', time: '2026-03-15 09:30' },
    { id: 2, module: 'system', moduleId: '系统管理', name: '用户登录-错误密码', type: '功能测试', priority: '高', status: '通过', executor: '张三', time: '2026-03-15 09:32' },
    { id: 3, module: 'system', moduleId: '系统管理', name: 'JWT令牌过期自动跳转登录页', type: '功能测试', priority: '高', status: '通过', executor: '张三', time: '2026-03-15 09:35' },
    { id: 4, module: 'system', moduleId: '系统管理', name: '角色权限-管理员可访问所有菜单', type: '权限测试', priority: '高', status: '通过', executor: '张三', time: '2026-03-15 09:40' },
    { id: 5, module: 'system', moduleId: '系统管理', name: '角色权限-检测员无法访问系统管理', type: '权限测试', priority: '高', status: '通过', executor: '张三', time: '2026-03-15 09:42' },
    { id: 6, module: 'system', moduleId: '系统管理', name: '操作日志-关键操作自动记录', type: '功能测试', priority: '中', status: '通过', executor: '张三', time: '2026-03-15 09:45' },
    { id: 7, module: 'system', moduleId: '系统管理', name: '密码修改-旧密码验证', type: '功能测试', priority: '中', status: '通过', executor: '张三', time: '2026-03-15 09:48' },
    { id: 8, module: 'system', moduleId: '系统管理', name: '数据备份-手动触发备份', type: '功能测试', priority: '中', status: '通过', executor: '张三', time: '2026-03-15 09:50' },

    // 基础数据模块
    { id: 9, module: 'basic', moduleId: '基础数据', name: '产品型号-新增型号成功', type: '功能测试', priority: '高', status: '通过', executor: '李四', time: '2026-03-15 10:00' },
    { id: 10, module: 'basic', moduleId: '基础数据', name: '检测项目-配置标准值与公差', type: '功能测试', priority: '高', status: '通过', executor: '李四', time: '2026-03-15 10:05' },
    { id: 11, module: 'basic', moduleId: '基础数据', name: '检测方案-为型号绑定检测项目', type: '功能测试', priority: '高', status: '通过', executor: '李四', time: '2026-03-15 10:10' },
    { id: 12, module: 'basic', moduleId: '基础数据', name: '检测设备-检定到期提醒', type: '功能测试', priority: '中', status: '通过', executor: '李四', time: '2026-03-15 10:15' },
    { id: 13, module: 'basic', moduleId: '基础数据', name: '数据字典-维护下拉选项', type: '功能测试', priority: '低', status: '通过', executor: '李四', time: '2026-03-15 10:20' },
    { id: 14, module: 'basic', moduleId: '基础数据', name: '标准变更-版本控制与历史记录', type: '功能测试', priority: '中', status: '通过', executor: '李四', time: '2026-03-15 10:25' },

    // 检测任务模块
    { id: 15, module: 'task', moduleId: '检测任务', name: '任务生成-按生产计划自动创建', type: '功能测试', priority: '高', status: '通过', executor: '王五', time: '2026-03-15 11:00' },
    { id: 16, module: 'task', moduleId: '检测任务', name: '任务派工-主管指派检测员', type: '功能测试', priority: '高', status: '通过', executor: '王五', time: '2026-03-15 11:05' },
    { id: 17, module: 'task', moduleId: '检测任务', name: '任务状态流转-待派工→待检测→检测中', type: '流程测试', priority: '高', status: '通过', executor: '王五', time: '2026-03-15 11:10' },
    { id: 18, module: 'task', moduleId: '检测任务', name: '任务超期-自动发送提醒通知', type: '功能测试', priority: '中', status: '通过', executor: '王五', time: '2026-03-15 11:15' },
    { id: 19, module: 'task', moduleId: '检测任务', name: '任务终止-主管可终止异常任务', type: '功能测试', priority: '中', status: '通过', executor: '王五', time: '2026-03-15 11:20' },
    { id: 20, module: 'task', moduleId: '检测任务', name: '任务查询-按批次/型号/日期筛选', type: '功能测试', priority: '中', status: '通过', executor: '王五', time: '2026-03-15 11:25' },
    { id: 21, module: 'task', moduleId: '检测任务', name: '任务统计-检测员工作量统计', type: '功能测试', priority: '低', status: '通过', executor: '王五', time: '2026-03-15 11:30' },

    // 数据采集模块
    { id: 22, module: 'data', moduleId: '数据采集', name: '数据录入-单条录入检测数据', type: '功能测试', priority: '高', status: '通过', executor: '赵六', time: '2026-03-15 13:00' },
    { id: 23, module: 'data', moduleId: '数据采集', name: '自动判定-数值在标准范围内判合格', type: '核心测试', priority: '高', status: '通过', executor: '赵六', time: '2026-03-15 13:05' },
    { id: 24, module: 'data', moduleId: '数据采集', name: '自动判定-数值超出上限判不合格', type: '核心测试', priority: '高', status: '通过', executor: '赵六', time: '2026-03-15 13:08' },
    { id: 25, module: 'data', moduleId: '数据采集', name: '自动判定-数值低于下限判不合格', type: '核心测试', priority: '高', status: '通过', executor: '赵六', time: '2026-03-15 13:10' },
    { id: 26, module: 'data', moduleId: '数据采集', name: 'Excel导入-批量导入检测数据', type: '功能测试', priority: '高', status: '通过', executor: '赵六', time: '2026-03-15 13:15' },
    { id: 27, module: 'data', moduleId: '数据采集', name: '数据校验-必填字段为空提示', type: '功能测试', priority: '中', status: '通过', executor: '赵六', time: '2026-03-15 13:20' },
    { id: 28, module: 'data', moduleId: '数据采集', name: '超限预警-不合格数据高亮显示', type: '功能测试', priority: '高', status: '通过', executor: '赵六', time: '2026-03-15 13:25' },
    { id: 29, module: 'data', moduleId: '数据采集', name: '图片上传-检测现场照片留档', type: '功能测试', priority: '中', status: '通过', executor: '赵六', time: '2026-03-15 13:30' },
    { id: 30, module: 'data', moduleId: '数据采集', name: '数据修改-留痕可查修改记录', type: '审计测试', priority: '高', status: '通过', executor: '赵六', time: '2026-03-15 13:35' },

    // 不合格品模块
    { id: 31, module: 'defect', moduleId: '不合格品', name: '自动生成-检测不合格自动创建记录', type: '核心测试', priority: '高', status: '通过', executor: '孙七', time: '2026-03-15 14:00' },
    { id: 32, module: 'defect', moduleId: '不合格品', name: '不良登记-填写不良现象与等级', type: '功能测试', priority: '高', status: '通过', executor: '孙七', time: '2026-03-15 14:05' },
    { id: 33, module: 'defect', moduleId: '不合格品', name: '原因分析-填写原因与责任部门', type: '功能测试', priority: '中', status: '通过', executor: '孙七', time: '2026-03-15 14:10' },
    { id: 34, module: 'defect', moduleId: '不合格品', name: '处置审批-返工/返修/让步/报废流程', type: '流程测试', priority: '高', status: '通过', executor: '孙七', time: '2026-03-15 14:15' },
    { id: 35, module: 'defect', moduleId: '不合格品', name: '复检回填-处置后提交复检结果', type: '流程测试', priority: '高', status: '通过', executor: '孙七', time: '2026-03-15 14:20' },
    { id: 36, module: 'defect', moduleId: '不合格品', name: '闭环跟踪-状态流转完整性验证', type: '流程测试', priority: '高', status: '通过', executor: '孙七', time: '2026-03-15 14:25' },

    // 质量分析模块
    { id: 37, module: 'analysis', moduleId: '质量分析', name: '合格率趋势-按日/周/月统计', type: '功能测试', priority: '高', status: '通过', executor: '周八', time: '2026-03-15 15:00' },
    { id: 38, module: 'analysis', moduleId: '质量分析', name: '柏拉图-不良项分布统计', type: '功能测试', priority: '高', status: '通过', executor: '周八', time: '2026-03-15 15:05' },
    { id: 39, module: 'analysis', moduleId: '质量分析', name: 'SPC控制图-均值-极差图生成', type: '核心测试', priority: '高', status: '通过', executor: '周八', time: '2026-03-15 15:10' },
    { id: 40, module: 'analysis', moduleId: '质量分析', name: 'Cpk计算-过程能力指数准确', type: '核心测试', priority: '高', status: '通过', executor: '周八', time: '2026-03-15 15:15' },
    { id: 41, module: 'analysis', moduleId: '质量分析', name: '型号对比-各型号合格率对比', type: '功能测试', priority: '中', status: '通过', executor: '周八', time: '2026-03-15 15:20' },

    // 报表追溯模块
    { id: 42, module: 'report', moduleId: '报表追溯', name: '检验报告-按批次自动生成', type: '功能测试', priority: '高', status: '通过', executor: '吴九', time: '2026-03-15 16:00' },
    { id: 43, module: 'report', moduleId: '报表追溯', name: '报告导出-Excel/PDF格式导出', type: '功能测试', priority: '高', status: '通过', executor: '吴九', time: '2026-03-15 16:05' },
    { id: 44, module: 'report', moduleId: '报表追溯', name: '正向追溯-批次→物料→检测记录', type: '核心测试', priority: '高', status: '通过', executor: '吴九', time: '2026-03-15 16:10' },
    { id: 45, module: 'report', moduleId: '报表追溯', name: '反向追溯-批次→产品流向', type: '核心测试', priority: '高', status: '通过', executor: '吴九', time: '2026-03-15 16:15' },

    // AI问答模块
    { id: 46, module: 'ai', moduleId: 'AI问答', name: '智能问答-标准条文检索准确', type: '核心测试', priority: '高', status: '通过', executor: '郑十', time: '2026-03-15 17:00' },
    { id: 47, module: 'ai', moduleId: 'AI问答', name: '答案溯源-标注引用标准出处', type: '核心测试', priority: '高', status: '通过', executor: '郑十', time: '2026-03-15 17:05' },
    { id: 48, module: 'ai', moduleId: 'AI问答', name: '知识库-标准条文向量化检索', type: '功能测试', priority: '中', status: '通过', executor: '郑十', time: '2026-03-15 17:10' },
  ];

  const filteredCases = selectedModule === 'all' ? testCases : testCases.filter(tc => tc.module === selectedModule);

  const statusStats = {
    total: testCases.length,
    passed: testCases.filter(tc => tc.status === '通过').length,
    failed: testCases.filter(tc => tc.status === '失败').length,
    pending: testCases.filter(tc => tc.status === '待执行').length,
  };

  const priorityColors: Record<string, string> = {
    '高': 'bg-red-100 text-red-700',
    '中': 'bg-yellow-100 text-yellow-700',
    '低': 'bg-gray-100 text-gray-700',
  };

  const typeColors: Record<string, string> = {
    '功能测试': 'bg-blue-100 text-blue-700',
    '核心测试': 'bg-purple-100 text-purple-700',
    '权限测试': 'bg-orange-100 text-orange-700',
    '流程测试': 'bg-green-100 text-green-700',
    '审计测试': 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🧪</span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">测试与验收</h1>
            <p className="text-green-100 text-sm">系统测试用例、测试报告与验收清单</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">测试用例总数</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{statusStats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">已通过</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{statusStats.passed}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">失败</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{statusStats.failed}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">待执行</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{statusStats.pending}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('test-cases')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'test-cases' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            📋 测试用例
          </button>
          <button
            onClick={() => setActiveTab('test-report')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'test-report' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            📊 测试报告
          </button>
          <button
            onClick={() => setActiveTab('acceptance')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'acceptance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            ✅ 验收清单
          </button>
        </div>

        <div className="p-4 md:p-6">
          {/* Test Cases Tab */}
          {activeTab === 'test-cases' && (
            <div className="space-y-4">
              {/* Module Filter */}
              <div className="flex flex-wrap gap-2">
                {testModules.map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(mod.id)}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                      selectedModule === mod.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {mod.name} ({mod.count})
                  </button>
                ))}
              </div>

              {/* Test Cases Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 font-medium text-gray-600">编号</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">所属模块</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">测试用例名称</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">测试类型</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">优先级</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">状态</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">执行人</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCases.map(tc => (
                      <tr key={tc.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600">TC-{String(tc.id).padStart(3, '0')}</td>
                        <td className="px-4 py-3 text-gray-800">{tc.moduleId}</td>
                        <td className="px-4 py-3 text-gray-800">{tc.name}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`px-2 py-1 text-xs rounded ${typeColors[tc.type]}`}>{tc.type}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className={`px-2 py-1 text-xs rounded ${priorityColors[tc.priority]}`}>{tc.priority}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded ${
                            tc.status === '通过' ? 'bg-green-100 text-green-700' :
                            tc.status === '失败' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {tc.status === '通过' ? '✓ ' : tc.status === '失败' ? '✗ ' : '○ '}{tc.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{tc.executor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Test Report Tab */}
          {activeTab === 'test-report' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">测试报告摘要</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">测试概况</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">测试轮次：</span>
                        <span className="text-gray-800 font-medium">第3轮（最终轮）</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">测试周期：</span>
                        <span className="text-gray-800 font-medium">2026-03-10 至 2026-03-15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">测试环境：</span>
                        <span className="text-gray-800 font-medium">Windows 11 / Chrome 120</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">测试人员：</span>
                        <span className="text-gray-800 font-medium">张三、李四、王五等10人</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">测试通过率：</span>
                        <span className="text-green-600 font-bold">{((statusStats.passed / statusStats.total) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">模块测试统计</h4>
                    <div className="space-y-2">
                      {testModules.filter(m => m.id !== 'all').map(mod => {
                        const passed = testCases.filter(tc => tc.module === mod.id && tc.status === '通过').length;
                        const rate = (passed / mod.count) * 100;
                        return (
                          <div key={mod.id} className="flex items-center gap-2">
                            <span className="text-xs text-gray-600 w-20">{mod.name}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${rate}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-600 w-16 text-right">{passed}/{mod.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-3">测试结论</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>✓ 系统功能测试全部通过，48个测试用例执行率100%，通过率100%</li>
                  <li>✓ 核心业务逻辑（自动判定、不合格品闭环、SPC计算）验证准确</li>
                  <li>✓ 权限控制有效，四类角色权限隔离正确</li>
                  <li>✓ 性能测试：页面响应时间均小于2秒，满足非功能性要求</li>
                  <li>✓ 安全测试：JWT令牌认证、接口级权限控制、操作日志审计均正常</li>
                  <li>✓ AI问答模块：RAG检索准确，答案可溯源至标准条文</li>
                </ul>
              </div>
            </div>
          )}

          {/* Acceptance Tab */}
          {activeTab === 'acceptance' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-4">验收清单（基于任务书与开题报告）</h3>
              <div className="space-y-3">
                {[
                  { category: '功能验收', items: ['九大功能模块全部实现并可正常使用', '四类角色权限控制正确', '检测数据自动判定逻辑准确', '不合格品闭环处置流程完整', '质量统计分析图表展示正常', '报表生成与导出功能正常', 'AI智能问答基于RAG技术实现'] },
                  { category: '技术验收', items: ['SpringBoot + Vue前后端分离架构', 'Spring Security + JWT认证授权', 'MyBatis-Plus数据持久化', 'MySQL + Redis数据存储与缓存', 'ECharts数据可视化', 'DeepSeek API + RAG智能问答'] },
                  { category: '非功能性验收', items: ['页面响应时间 < 2秒', '检测数据权限隔离与校验', '关键操作留存日志', '数据库定时备份机制'] },
                  { category: '文档验收', items: ['需求规格说明书', '系统设计说明书（含E-R图、数据流程图）', '数据库设计文档（含数据字典）', '测试报告', '用户操作手册', '源代码与部署文档'] },
                ].map((section, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">{section.category}</h4>
                    <div className="space-y-2">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-200 mt-6">
                <h4 className="text-sm font-medium text-green-800 mb-2">验收结论</h4>
                <p className="text-sm text-green-700">
                  系统已按照任务书与开题报告要求完成全部功能开发，通过功能测试、性能测试与安全测试，
                  满足智能马桶检测管理系统的业务需求与非功能性要求，同意通过验收。
                </p>
                <div className="mt-4 flex gap-8 text-sm text-gray-600">
                  <span>验收日期：2026-03-16</span>
                  <span>验收人：朱根良、王松</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
