import { useState } from 'react';
import { users } from '../data/mockData';

type TabKey = 'users' | 'roles' | 'menus' | 'logs';

export default function SystemManagement() {
  const [activeTab, setActiveTab] = useState<TabKey>('users');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredUsers = users.filter(u =>
    u.realName.includes(searchText) || u.username.includes(searchText) || u.roleName.includes(searchText)
  );

  const tabs = [
    { key: 'users' as TabKey, label: '用户管理' },
    { key: 'roles' as TabKey, label: '角色管理' },
    { key: 'menus' as TabKey, label: '菜单权限' },
    { key: 'logs' as TabKey, label: '操作日志' },
  ];

  const mockRoles = [
    { id: 1, name: '系统管理员', code: 'admin', description: '拥有系统所有权限', userCount: 1 },
    { id: 2, name: '质检主管', code: 'supervisor', description: '负责检测标准维护、任务派发与审核', userCount: 1 },
    { id: 3, name: '检测员', code: 'inspector', description: '负责检测任务执行与数据录入', userCount: 3 },
    { id: 4, name: '生产人员', code: 'production', description: '负责送检申请与返工处理', userCount: 1 },
  ];

  const mockLogs = [
    { id: 1, user: '张伟', action: '审核通过', module: '不合格品管理', detail: '审核通过NC-2026-0001处置方案', time: '2026-03-10 14:30', ip: '192.168.1.100' },
    { id: 2, user: '李明', action: '数据录入', module: '检测数据采集', detail: '录入DT-2026-0002批次检测数据', time: '2026-03-10 10:15', ip: '192.168.1.101' },
    { id: 3, user: '系统管理员', action: '用户修改', module: '系统管理', detail: '禁用用户chenxi账号', time: '2026-03-09 16:00', ip: '192.168.1.1' },
    { id: 4, user: '张伟', action: '任务派发', module: '检测任务', detail: '派发DT-2026-0004型式试验任务', time: '2026-03-09 09:30', ip: '192.168.1.100' },
    { id: 5, user: '王芳', action: '数据录入', module: '检测数据采集', detail: '录入DT-2026-0005批次检测数据', time: '2026-03-08 15:20', ip: '192.168.1.102' },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
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
          {/* User Management */}
          {activeTab === 'users' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  placeholder="搜索用户名/姓名/角色"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  + 新增用户
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 font-medium text-gray-600">用户名</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">姓名</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">角色</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">部门</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">手机号</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">状态</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800">{user.username}</td>
                        <td className="px-4 py-3 text-gray-800">{user.realName}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'admin' ? 'bg-red-100 text-red-700' :
                            user.role === 'supervisor' ? 'bg-orange-100 text-orange-700' :
                            user.role === 'inspector' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>{user.roleName}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{user.department}</td>
                        <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{user.phone}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {user.status === 'active' ? '启用' : '禁用'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 text-xs">编辑</button>
                            <button className="text-gray-600 hover:text-gray-800 text-xs">重置密码</button>
                            <button className="text-red-600 hover:text-red-800 text-xs">{user.status === 'active' ? '禁用' : '启用'}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Role Management */}
          {activeTab === 'roles' && (
            <div>
              <div className="flex justify-end mb-4">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">+ 新增角色</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockRoles.map(role => (
                  <div key={role.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{role.name}</h4>
                      <span className="text-xs text-gray-500">{role.userCount}人</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{role.description}</p>
                    <div className="flex gap-2">
                      <button className="text-xs text-blue-600 hover:text-blue-800">配置权限</button>
                      <button className="text-xs text-gray-600 hover:text-gray-800">编辑</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Menu Management */}
          {activeTab === 'menus' && (
            <div>
              <p className="text-sm text-gray-500 mb-4">配置系统菜单与按钮级权限，支持树形结构管理</p>
              <div className="space-y-2">
                {['工作台', '系统管理', '基础数据', '检测任务', '数据采集', '不合格品管理', '质量统计分析', '报表追溯', 'AI智能问答', '公告通知'].map((menu, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">{'│'.repeat(i > 0 ? 1 : 0)}</span>
                      <span className="text-sm font-medium text-gray-700">{menu}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-400">/system/{menu}</span>
                      <button className="text-xs text-blue-600">编辑</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operation Logs */}
          {activeTab === 'logs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-medium text-gray-600">操作人</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">操作类型</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">所属模块</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">操作详情</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">操作时间</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">IP地址</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLogs.map(log => (
                    <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{log.user}</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">{log.action}</span></td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{log.module}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{log.detail}</td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{log.time}</td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">新增用户</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">用户名</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="请输入用户名" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">姓名</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="请输入姓名" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">角色</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>系统管理员</option>
                  <option>质检主管</option>
                  <option>检测员</option>
                  <option>生产人员</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">部门</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="请输入部门" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
