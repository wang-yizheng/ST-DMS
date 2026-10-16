import { useState } from 'react';
import type { UserInfo, UserRole } from '../App';

interface LoginProps {
  onLogin: (user: UserInfo) => void;
}

type LoginMethod = 'password' | 'sms' | 'qrcode';

const mockUsers: { username: string; password: string; user: UserInfo }[] = [
  { username: 'admin', password: '123456', user: { id: 1, username: 'admin', realName: '系统管理员', role: 'admin', roleName: '系统管理员', department: '信息技术部' } },
  { username: 'zhangwei', password: '123456', user: { id: 2, username: 'zhangwei', realName: '张伟', role: 'supervisor', roleName: '质检主管', department: '质量管理部' } },
  { username: 'liming', password: '123456', user: { id: 3, username: 'liming', realName: '李明', role: 'inspector', roleName: '检测员', department: '质量管理部' } },
  { username: 'liuqiang', password: '123456', user: { id: 5, username: 'liuqiang', realName: '刘强', role: 'production', roleName: '生产人员', department: '生产一部' } },
];

export default function Login({ onLogin }: LoginProps) {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordLogin = () => {
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const found = mockUsers.find(u => u.username === username && u.password === password);
      if (found) {
        onLogin(found.user);
      } else {
        setError('用户名或密码错误');
      }
      setLoading(false);
    }, 800);
  };

  const handleSendSms = () => {
    if (!phone) {
      setError('请输入手机号');
      return;
    }
    setSmsSent(true);
    setCountdown(60);
    setError('');
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSmsLogin = () => {
    if (!phone || !smsCode) {
      setError('请输入手机号和验证码');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // 模拟验证码登录 - 任意4位数字均可
      if (smsCode.length === 4) {
        const user = mockUsers[0].user; // 模拟短信登录
        onLogin(user);
      } else {
        setError('验证码格式错误');
      }
      setLoading(false);
    }, 800);
  };

  const handleQrLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin(mockUsers[2].user); // 默认以检测员身份登录
    }, 1500);
  };

  const quickLogin = (role: UserRole) => {
    const user = mockUsers.find(u => u.user.role === role);
    if (user) {
      onLogin(user.user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">智能马桶检测管理系统</h1>
          <p className="text-blue-200 mt-2 text-sm">Smart Toilet Detection Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Login Method Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => { setLoginMethod('password'); setError(''); }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${loginMethod === 'password' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              密码登录
            </button>
            <button
              onClick={() => { setLoginMethod('sms'); setError(''); }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${loginMethod === 'sms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              短信登录
            </button>
            <button
              onClick={() => { setLoginMethod('qrcode'); setError(''); }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${loginMethod === 'qrcode' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              扫码登录
            </button>
          </div>

          {/* Password Login */}
          {loginMethod === 'password' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handlePasswordLogin()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handlePasswordLogin()}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handlePasswordLogin}
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '登录中...' : '登 录'}
              </button>
            </div>
          )}

          {/* SMS Login */}
          {loginMethod === 'sms' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">验证码</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    placeholder="请输入4位验证码"
                    maxLength={4}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleSmsLogin()}
                  />
                  <button
                    onClick={handleSendSms}
                    disabled={countdown > 0}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {countdown > 0 ? `${countdown}s` : smsSent ? '重新发送' : '获取验证码'}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleSmsLogin}
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? '登录中...' : '登 录'}
              </button>
            </div>
          )}

          {/* QR Code Login */}
          {loginMethod === 'qrcode' && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <p className="text-xs text-gray-500 mt-2">请使用手机App扫码</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">打开企业App，扫描上方二维码登录</p>
              <button
                onClick={handleQrLogin}
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? '确认中...' : '模拟扫码登录'}
              </button>
            </div>
          )}

          {/* Quick Login */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3 text-center">快速体验（选择角色直接登录）</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button onClick={() => quickLogin('admin')} className="px-3 py-2 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                系统管理员
              </button>
              <button onClick={() => quickLogin('supervisor')} className="px-3 py-2 text-xs bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                质检主管
              </button>
              <button onClick={() => quickLogin('inspector')} className="px-3 py-2 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                检测员
              </button>
              <button onClick={() => quickLogin('production')} className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                生产人员
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200/60 text-xs mt-6">
          © 2026 智能马桶检测管理系统 v1.0 | 基于SpringBoot + Vue
        </p>
      </div>
    </div>
  );
}
