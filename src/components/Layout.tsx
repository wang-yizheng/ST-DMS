import { useState } from 'react';
import type { UserInfo, PageKey } from '../App';
import { notifications } from '../data/mockData';

interface LayoutProps {
  currentUser: UserInfo;
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  onLogout: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  children: React.ReactNode;
}

interface MenuItem {
  key: PageKey;
  label: string;
  icon: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { key: 'dashboard', label: '工作台', icon: '📊', roles: ['admin', 'supervisor', 'inspector', 'production'] },
  { key: 'system', label: '系统管理', icon: '⚙️', roles: ['admin'] },
  { key: 'basic-data', label: '基础数据', icon: '📋', roles: ['admin', 'supervisor'] },
  { key: 'tasks', label: '检测任务', icon: '📝', roles: ['admin', 'supervisor', 'inspector', 'production'] },
  { key: 'data-collection', label: '数据采集', icon: '📥', roles: ['admin', 'supervisor', 'inspector'] },
  { key: 'non-conforming', label: '不合格品', icon: '⚠️', roles: ['admin', 'supervisor', 'inspector', 'production'] },
  { key: 'quality-analysis', label: '质量分析', icon: '📈', roles: ['admin', 'supervisor'] },
  { key: 'reports', label: '报表追溯', icon: '📄', roles: ['admin', 'supervisor', 'inspector'] },
  { key: 'ai-chat', label: 'AI智能问答', icon: '🤖', roles: ['admin', 'supervisor', 'inspector'] },
  { key: 'announcements', label: '公告通知', icon: '📢', roles: ['admin', 'supervisor', 'inspector', 'production'] },
  { key: 'backend', label: '后端架构', icon: '🖥️', roles: ['admin', 'supervisor'] },
  { key: 'design-docs', label: '设计文档', icon: '📐', roles: ['admin', 'supervisor'] },
  { key: 'testing', label: '测试验收', icon: '🧪', roles: ['admin', 'supervisor'] },
];

export default function Layout({ currentUser, currentPage, onNavigate, onLogout, sidebarCollapsed, onToggleSidebar, children }: LayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredMenus = menuItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col
        ${sidebarCollapsed ? 'w-16' : 'w-60'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className={`h-16 flex items-center border-b border-white/10 ${sidebarCollapsed ? 'justify-center px-2' : 'px-4'}`}>
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">Q</div>
              <span className="font-semibold text-sm whitespace-nowrap">智能马桶检测系统</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">Q</div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {filteredMenus.map(item => (
            <button
              key={item.key}
              onClick={() => { onNavigate(item.key); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all
                ${currentPage === item.key ? 'bg-blue-600/30 text-blue-300 border-r-2 border-blue-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'}
                ${sidebarCollapsed ? 'justify-center px-2' : ''}
              `}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info at bottom */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center text-xs">
                {currentUser.realName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.realName}</p>
                <p className="text-xs text-gray-400">{currentUser.roleName}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Collapse button */}
            <button onClick={onToggleSidebar} className="hidden lg:block p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
              </svg>
            </button>
            {/* Breadcrumb */}
            <h2 className="text-lg font-semibold text-gray-800 hidden sm:block">
              {menuItems.find(m => m.key === currentPage)?.label || '工作台'}
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100 font-medium text-sm">消息通知</div>
                  {notifications.slice(0, 5).map(n => (
                    <div key={n.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                      <p className="text-sm font-medium text-gray-800">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.content}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.createTime}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {currentUser.realName[0]}
                </div>
                <span className="text-sm text-gray-700 hidden md:block">{currentUser.realName}</span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium">{currentUser.realName}</p>
                    <p className="text-xs text-gray-500">{currentUser.roleName} · {currentUser.department}</p>
                  </div>
                  <button onClick={onLogout} className="w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 text-left flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    退出登录
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
