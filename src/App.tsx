import { useState, useCallback } from 'react';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SystemManagement from './pages/SystemManagement';
import BasicData from './pages/BasicData';
import AIChat from './pages/AIChat';
import TaskManagement from './pages/TaskManagement';
import DataCollection from './pages/DataCollection';
import NonConforming from './pages/NonConforming';
import QualityAnalysis from './pages/QualityAnalysis';
import Reports from './pages/Reports';
import Announcements from './pages/Announcements';
import TestingAcceptance from './pages/TestingAcceptance';

export type UserRole = 'admin' | 'supervisor' | 'inspector' | 'production';

export interface UserInfo {
  id: number;
  username: string;
  realName: string;
  role: UserRole;
  roleName: string;
  department: string;
}

export type PageKey = 'dashboard' | 'system' | 'basic-data' | 'ai-chat' | 'tasks' | 'data-collection' | 'non-conforming' | 'quality-analysis' | 'reports' | 'announcements' | 'testing';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [currentPage, setCurrentPage] = useState<PageKey>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = useCallback((user: UserInfo) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    // 根据角色设置默认页面
    if (user.role === 'production') {
      setCurrentPage('tasks');
    } else {
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('dashboard');
  }, []);

  const renderPage = () => {
    if (!currentUser) return null;
    const user = currentUser;
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'system':
        return <SystemManagement />;
      case 'basic-data':
        return <BasicData />;
      case 'ai-chat':
        return <AIChat userRole={user.role} />;
      case 'tasks':
        return <TaskManagement user={currentUser} />;
      case 'data-collection':
        return <DataCollection user={currentUser} />;
      case 'non-conforming':
        return <NonConforming user={currentUser} />;
      case 'quality-analysis':
        return <QualityAnalysis />;
      case 'reports':
        return <Reports />;
      case 'announcements':
        return <Announcements user={currentUser} />;
      case 'testing':
        return <TestingAcceptance />;
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (!currentUser) return null;

  return (
    <Layout
      currentUser={currentUser}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={handleLogout}
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
