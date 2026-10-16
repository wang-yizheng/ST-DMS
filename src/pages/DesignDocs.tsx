import { useState } from 'react';

export default function DesignDocs() {
  const [activeTab, setActiveTab] = useState<'structure' | 'dataflow' | 'er' | 'dictionary'>('structure');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📐</span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">系统设计文档</h1>
            <p className="text-indigo-100 text-sm">功能结构图、数据流程图、E-R图与数据字典</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'structure' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🏛️ 功能结构图
          </button>
          <button
            onClick={() => setActiveTab('dataflow')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'dataflow' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🔄 数据流程图
          </button>
          <button
            onClick={() => setActiveTab('er')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'er' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🔗 E-R图
          </button>
          <button
            onClick={() => setActiveTab('dictionary')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'dictionary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            📖 数据字典
          </button>
        </div>

        <div className="p-4 md:p-6">
          {/* Function Structure */}
          {activeTab === 'structure' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800 mb-4">系统功能结构图</h3>
              <div className="bg-gray-50 rounded-xl p-6 overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Root */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center shadow-lg">
                      智能马桶检测管理系统
                    </div>
                  </div>

                  {/* Level 1 */}
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                    {['系统管理', '基础数据', '检测任务', '数据采集', '不合格品'].map((mod, i) => (
                      <div key={i} className="text-center">
                        <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-medium mb-2">{mod}</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                    {['质量分析', '报表追溯', 'AI问答', '公告通知'].map((mod, i) => (
                      <div key={i} className="text-center">
                        <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-medium mb-2">{mod}</div>
                      </div>
                    ))}
                  </div>

                  {/* Level 2 - Detail */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 border-b pb-2">系统管理</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• 用户管理</li>
                        <li>• 角色管理</li>
                        <li>• 菜单权限</li>
                        <li>• 操作日志</li>
                        <li>• 数据字典</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 border-b pb-2">基础数据</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• 产品型号管理</li>
                        <li>• 检测项目库</li>
                        <li>• 检测标准库</li>
                        <li>• 检测设备管理</li>
                        <li>• 检测方案配置</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 border-b pb-2">检测任务</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• 任务生成</li>
                        <li>• 任务派工</li>
                        <li>• 任务领取</li>
                        <li>• 进度跟踪</li>
                        <li>• 超期提醒</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 border-b pb-2">数据采集</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• 单条录入</li>
                        <li>• Excel导入</li>
                        <li>• 自动判定</li>
                        <li>• 超限预警</li>
                        <li>• 图片上传</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 border-b pb-2">不合格品</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• 不良登记</li>
                        <li>• 原因分析</li>
                        <li>• 处置审批</li>
                        <li>• 复检回填</li>
                        <li>• 闭环跟踪</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 border-b pb-2">质量分析</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• 合格率趋势</li>
                        <li>• 不良柏拉图</li>
                        <li>• 型号对比</li>
                        <li>• SPC控制图</li>
                        <li>• Cpk计算</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 border-b pb-2">报表追溯</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• 检验报告生成</li>
                        <li>• 报告导出</li>
                        <li>• 正向追溯</li>
                        <li>• 反向追溯</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 border-b pb-2">AI问答</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• 知识库构建</li>
                        <li>• 条文检索</li>
                        <li>• 智能问答</li>
                        <li>• 答案溯源</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 border-b pb-2">公告通知</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• 公告发布</li>
                        <li>• 消息提醒</li>
                        <li>• 任务超期</li>
                        <li>• 设备到期</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Flow */}
          {activeTab === 'dataflow' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800 mb-4">顶层数据流程图（DFD）</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-8">
                  {/* External Entities */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-800 font-medium">外部实体</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">质检主管</p>
                    </div>
                    <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-800 font-medium">外部实体</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">检测员</p>
                    </div>
                    <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-800 font-medium">外部实体</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">生产人员</p>
                    </div>
                    <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-800 font-medium">外部实体</p>
                      <p className="text-sm font-bold text-blue-900 mt-1">系统管理员</p>
                    </div>
                  </div>

                  {/* Data Flow Arrows */}
                  <div className="text-center text-gray-500 text-sm">
                    ↓ 输入：检测标准、检测任务、检测数据、不合格品信息 ↓
                  </div>

                  {/* Main Process */}
                  <div className="bg-orange-100 border-2 border-orange-400 rounded-full p-6 text-center mx-auto max-w-md">
                    <p className="text-xs text-orange-800 font-medium">处理过程</p>
                    <p className="text-lg font-bold text-orange-900 mt-1">0. 智能马桶检测管理</p>
                  </div>

                  {/* Data Flow Arrows */}
                  <div className="text-center text-gray-500 text-sm">
                    ↓ 输出：检验报告、统计图表、质量分析、追溯信息 ↓
                  </div>

                  {/* Data Stores */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3">
                      <p className="text-xs text-green-800 font-medium">数据存储 D1</p>
                      <p className="text-sm font-bold text-green-900 mt-1">检测标准库</p>
                    </div>
                    <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3">
                      <p className="text-xs text-green-800 font-medium">数据存储 D2</p>
                      <p className="text-sm font-bold text-green-900 mt-1">检测任务表</p>
                    </div>
                    <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3">
                      <p className="text-xs text-green-800 font-medium">数据存储 D3</p>
                      <p className="text-sm font-bold text-green-900 mt-1">检测记录表</p>
                    </div>
                    <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3">
                      <p className="text-xs text-green-800 font-medium">数据存储 D4</p>
                      <p className="text-sm font-bold text-green-900 mt-1">不合格品表</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Flow */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">业务主流程图</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">基础数据配置</div>
                      <p className="text-xs text-gray-500 mt-2 text-center">产品型号<br/>检测标准<br/>检测方案</p>
                    </div>
                    <span className="text-2xl text-gray-400">→</span>
                    <div className="flex flex-col items-center">
                      <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium">检测任务生成</div>
                      <p className="text-xs text-gray-500 mt-2 text-center">生产计划<br/>任务派工<br/>检测员领取</p>
                    </div>
                    <span className="text-2xl text-gray-400">→</span>
                    <div className="flex flex-col items-center">
                      <div className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium">数据采集判定</div>
                      <p className="text-xs text-gray-500 mt-2 text-center">录入/导入<br/>自动判定<br/>超限预警</p>
                    </div>
                    <span className="text-2xl text-gray-400">→</span>
                    <div className="flex flex-col items-center">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium">不合格品处置</div>
                      <p className="text-xs text-gray-500 mt-2 text-center">不良登记<br/>处置审批<br/>复检闭环</p>
                    </div>
                    <span className="text-2xl text-gray-400">→</span>
                    <div className="flex flex-col items-center">
                      <div className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium">质量分析追溯</div>
                      <p className="text-xs text-gray-500 mt-2 text-center">统计图表<br/>检验报告<br/>全链路追溯</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* E-R Diagram */}
          {activeTab === 'er' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800 mb-4">E-R图（实体-关系图）</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Entities */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 text-center mb-3">实体（Entity）</h4>
                    {[
                      { name: '用户', color: 'blue', attrs: '用户ID, 用户名, 姓名, 角色, 部门' },
                      { name: '产品型号', color: 'green', attrs: '型号ID, 型号编码, 名称, 分类' },
                      { name: '检测项目', color: 'orange', attrs: '项目ID, 名称, 标准值, 上下限' },
                      { name: '检测任务', color: 'purple', attrs: '任务ID, 任务编号, 批次号, 状态' },
                      { name: '检测记录', color: 'red', attrs: '记录ID, 序列号, 实测值, 判定结果' },
                      { name: '不合格品', color: 'pink', attrs: '记录ID, 不良等级, 处置方式, 状态' },
                    ].map((entity, i) => (
                      <div key={i} className={`bg-${entity.color}-100 border-2 border-${entity.color}-400 rounded-lg p-3`}>
                        <p className="text-sm font-bold text-center">{entity.name}</p>
                        <p className="text-xs text-gray-600 mt-1 text-center">{entity.attrs}</p>
                      </div>
                    ))}
                  </div>

                  {/* Relationships */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 text-center mb-3">关系（Relationship）</h4>
                    {[
                      { from: '用户', to: '检测任务', rel: '执行', card: '1:N' },
                      { from: '产品型号', to: '检测任务', rel: '包含', card: '1:N' },
                      { from: '检测任务', to: '检测记录', rel: '产生', card: '1:N' },
                      { from: '检测项目', to: '检测记录', rel: '检测', card: '1:N' },
                      { from: '检测记录', to: '不合格品', rel: '触发', card: '1:0..1' },
                      { from: '检测项目', to: '产品型号', rel: '配置', card: 'M:N' },
                    ].map((rel, i) => (
                      <div key={i} className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3">
                        <p className="text-xs text-center">
                          <span className="font-medium">{rel.from}</span>
                          <span className="mx-2 text-gray-500">—{rel.rel}—</span>
                          <span className="font-medium">{rel.to}</span>
                        </p>
                        <p className="text-xs text-center text-gray-600 mt-1">基数：{rel.card}</p>
                      </div>
                    ))}
                  </div>

                  {/* Attributes */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 text-center mb-3">属性（Attribute）</h4>
                    <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-3">
                      <p className="text-xs text-gray-700">
                        <strong>用户：</strong>用户ID(PK), 用户名, 密码, 真实姓名, 手机号, 邮箱, 角色ID(FK), 部门ID(FK), 状态, 创建时间
                      </p>
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-3">
                      <p className="text-xs text-gray-700">
                        <strong>检测任务：</strong>任务ID(PK), 任务编号, 产品ID(FK), 批次号, 数量, 任务类型, 状态, 检测员ID(FK), 截止日期, 合格率
                      </p>
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-3">
                      <p className="text-xs text-gray-700">
                        <strong>检测记录：</strong>记录ID(PK), 任务ID(FK), 序列号, 项目ID(FK), 实测值, 判定结果, 检测员ID(FK), 检测时间, 图片URL
                      </p>
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-3">
                      <p className="text-xs text-gray-700">
                        <strong>不合格品：</strong>记录ID(PK), 检测记录ID(FK), 不良等级, 不良描述, 原因分析, 责任部门, 处置方式, 状态, 审批人ID(FK)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Relationship Description */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-2">关系说明</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• 一个用户可以执行多个检测任务（1:N）</li>
                  <li>• 一个产品型号可以对应多个检测任务（1:N）</li>
                  <li>• 一个检测任务可以产生多条检测记录（1:N）</li>
                  <li>• 一个检测项目可以被多条检测记录引用（1:N）</li>
                  <li>• 一条检测记录可能触发一条不合格品记录（1:0..1）</li>
                  <li>• 检测项目与产品型号为多对多关系（M:N），通过检测方案中间表关联</li>
                </ul>
              </div>
            </div>
          )}

          {/* Data Dictionary */}
          {activeTab === 'dictionary' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800 mb-4">数据字典</h3>
              <div className="space-y-4">
                {[
                  {
                    table: 'sys_user（系统用户表）',
                    fields: [
                      { name: 'id', type: 'BIGINT', pk: true, null: 'NO', default: '-', desc: '主键ID，自增' },
                      { name: 'username', type: 'VARCHAR(50)', pk: false, null: 'NO', default: '-', desc: '用户名，唯一' },
                      { name: 'password', type: 'VARCHAR(200)', pk: false, null: 'NO', default: '-', desc: '密码（BCrypt加密）' },
                      { name: 'real_name', type: 'VARCHAR(50)', pk: false, null: 'NO', default: '-', desc: '真实姓名' },
                      { name: 'phone', type: 'VARCHAR(20)', pk: false, null: 'YES', default: 'NULL', desc: '手机号' },
                      { name: 'email', type: 'VARCHAR(100)', pk: false, null: 'YES', default: 'NULL', desc: '邮箱' },
                      { name: 'role_id', type: 'BIGINT', pk: false, null: 'NO', default: '-', desc: '角色ID，外键' },
                      { name: 'dept_id', type: 'BIGINT', pk: false, null: 'YES', default: 'NULL', desc: '部门ID，外键' },
                      { name: 'status', type: 'TINYINT', pk: false, null: 'NO', default: '1', desc: '状态：0-禁用，1-启用' },
                      { name: 'create_time', type: 'DATETIME', pk: false, null: 'NO', default: 'CURRENT_TIMESTAMP', desc: '创建时间' },
                      { name: 'update_time', type: 'DATETIME', pk: false, null: 'NO', default: 'CURRENT_TIMESTAMP', desc: '更新时间' },
                      { name: 'deleted', type: 'TINYINT', pk: false, null: 'NO', default: '0', desc: '逻辑删除：0-未删除，1-已删除' },
                    ]
                  },
                  {
                    table: 'detection_task（检测任务表）',
                    fields: [
                      { name: 'id', type: 'BIGINT', pk: true, null: 'NO', default: '-', desc: '主键ID，自增' },
                      { name: 'task_code', type: 'VARCHAR(50)', pk: false, null: 'NO', default: '-', desc: '任务编号，唯一' },
                      { name: 'product_id', type: 'BIGINT', pk: false, null: 'NO', default: '-', desc: '产品ID，外键' },
                      { name: 'batch_no', type: 'VARCHAR(50)', pk: false, null: 'NO', default: '-', desc: '批次号' },
                      { name: 'quantity', type: 'INT', pk: false, null: 'NO', default: '-', desc: '检测数量' },
                      { name: 'task_type', type: 'VARCHAR(20)', pk: false, null: 'NO', default: '-', desc: '任务类型：出厂检验/过程检验/型式试验' },
                      { name: 'status', type: 'VARCHAR(20)', pk: false, null: 'NO', default: '待派工', desc: '任务状态' },
                      { name: 'assignee_id', type: 'BIGINT', pk: false, null: 'YES', default: 'NULL', desc: '检测员ID，外键' },
                      { name: 'deadline', type: 'DATETIME', pk: false, null: 'NO', default: '-', desc: '截止日期' },
                      { name: 'pass_rate', type: 'DECIMAL(5,2)', pk: false, null: 'YES', default: 'NULL', desc: '合格率（%）' },
                      { name: 'create_time', type: 'DATETIME', pk: false, null: 'NO', default: 'CURRENT_TIMESTAMP', desc: '创建时间' },
                    ]
                  },
                  {
                    table: 'detection_record（检测记录表）',
                    fields: [
                      { name: 'id', type: 'BIGINT', pk: true, null: 'NO', default: '-', desc: '主键ID，自增' },
                      { name: 'task_id', type: 'BIGINT', pk: false, null: 'NO', default: '-', desc: '任务ID，外键' },
                      { name: 'serial_no', type: 'VARCHAR(50)', pk: false, null: 'NO', default: '-', desc: '产品序列号' },
                      { name: 'item_id', type: 'BIGINT', pk: false, null: 'NO', default: '-', desc: '检测项目ID，外键' },
                      { name: 'measured_value', type: 'DECIMAL(10,4)', pk: false, null: 'NO', default: '-', desc: '实测值' },
                      { name: 'result', type: 'VARCHAR(10)', pk: false, null: 'NO', default: '-', desc: '判定结果：合格/不合格' },
                      { name: 'inspector_id', type: 'BIGINT', pk: false, null: 'NO', default: '-', desc: '检测员ID，外键' },
                      { name: 'inspect_time', type: 'DATETIME', pk: false, null: 'NO', default: 'CURRENT_TIMESTAMP', desc: '检测时间' },
                      { name: 'image_url', type: 'VARCHAR(500)', pk: false, null: 'YES', default: 'NULL', desc: '现场图片URL' },
                      { name: 'remark', type: 'VARCHAR(500)', pk: false, null: 'YES', default: 'NULL', desc: '备注' },
                    ]
                  },
                  {
                    table: 'non_conforming（不合格品记录表）',
                    fields: [
                      { name: 'id', type: 'BIGINT', pk: true, null: 'NO', default: '-', desc: '主键ID，自增' },
                      { name: 'record_code', type: 'VARCHAR(50)', pk: false, null: 'NO', default: '-', desc: '记录编号，唯一' },
                      { name: 'record_id', type: 'BIGINT', pk: false, null: 'NO', default: '-', desc: '检测记录ID，外键' },
                      { name: 'defect_level', type: 'VARCHAR(10)', pk: false, null: 'NO', default: '-', desc: '不良等级：轻微/一般/严重/致命' },
                      { name: 'defect_desc', type: 'VARCHAR(500)', pk: false, null: 'NO', default: '-', desc: '不良描述' },
                      { name: 'cause_analysis', type: 'VARCHAR(500)', pk: false, null: 'YES', default: 'NULL', desc: '原因分析' },
                      { name: 'responsible_dept', type: 'VARCHAR(50)', pk: false, null: 'YES', default: 'NULL', desc: '责任部门' },
                      { name: 'disposal_method', type: 'VARCHAR(20)', pk: false, null: 'YES', default: 'NULL', desc: '处置方式：返工/返修/让步接收/报废' },
                      { name: 'status', type: 'VARCHAR(20)', pk: false, null: 'NO', default: '待处理', desc: '状态：待处理/处理中/待审核/已完成/已关闭' },
                      { name: 'approver_id', type: 'BIGINT', pk: false, null: 'YES', default: 'NULL', desc: '审批人ID，外键' },
                      { name: 'create_time', type: 'DATETIME', pk: false, null: 'NO', default: 'CURRENT_TIMESTAMP', desc: '创建时间' },
                    ]
                  },
                ].map((dict, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-medium text-gray-800">{dict.table}</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left px-4 py-2 font-medium text-gray-600">字段名</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">数据类型</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">主键</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">允许空</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">默认值</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">说明</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dict.fields.map((field, i) => (
                            <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                              <td className="px-4 py-2 font-mono text-gray-800">{field.name}</td>
                              <td className="px-4 py-2 text-gray-600 font-mono text-xs">{field.type}</td>
                              <td className="px-4 py-2">{field.pk ? <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">PK</span> : ''}</td>
                              <td className="px-4 py-2 text-gray-600">{field.null ? 'YES' : 'NO'}</td>
                              <td className="px-4 py-2 text-gray-600 font-mono text-xs">{field.default}</td>
                              <td className="px-4 py-2 text-gray-600">{field.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
