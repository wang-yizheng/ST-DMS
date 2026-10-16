import { useState } from 'react';
import type { UserInfo } from '../App';
import { announcements, notifications } from '../data/mockData';

interface AnnouncementsProps {
  user: UserInfo;
}

export default function Announcements({ user }: AnnouncementsProps) {
  const [activeTab, setActiveTab] = useState<'announcements' | 'notifications'>('announcements');
  const [showCreate, setShowCreate] = useState(false);

  const typeColors: Record<string, string> = {
    '质量公告': 'bg-blue-100 text-blue-700',
    '标准变更': 'bg-purple-100 text-purple-700',
    '整改要求': 'bg-red-100 text-red-700',
    '系统通知': 'bg-gray-100 text-gray-700',
  };

  const notificationTypeIcons: Record<string, string> = {
    'task': '📋',
    'defect': '⚠️',
    'equipment': '🔧',
    'system': '💻',
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'announcements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            📢 公告管理
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🔔 消息通知
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="absolute top-3 ml-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </button>
        </div>

        <div className="p-4 md:p-6">
          {activeTab === 'announcements' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">发布质量公告、标准变更通知与整改要求</p>
                {(user.role === 'admin' || user.role === 'supervisor') && (
                  <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">+ 发布公告</button>
                )}
              </div>
              <div className="space-y-4">
                {announcements.map(ann => (
                  <div key={ann.id} className={`border rounded-lg p-5 hover:shadow-md transition-shadow ${ann.isTop ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          {ann.isTop && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">置顶</span>}
                          <span className={`px-2 py-0.5 text-xs rounded ${typeColors[ann.type]}`}>{ann.type}</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">{ann.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-3">{ann.content}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                          <span>发布人：{ann.publisher}</span>
                          <span>发布时间：{ann.publishTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">任务超期、不合格品待审核、设备检定到期等提醒</p>
                <button className="px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">全部已读</button>
              </div>
              <div className="space-y-3">
                {notifications.map(notif => (
                  <div key={notif.id} className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                    !notif.isRead ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}>
                    <span className="text-xl mt-0.5">{notificationTypeIcons[notif.type]}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-medium ${!notif.isRead ? 'text-gray-800' : 'text-gray-600'}`}>{notif.title}</h4>
                        {!notif.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{notif.content}</p>
                      <p className="text-xs text-gray-400 mt-2">{notif.createTime}</p>
                    </div>
                    {!notif.isRead && (
                      <button className="text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap">标记已读</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Announcement Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold mb-4">发布公告</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">公告标题</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="请输入公告标题" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">公告类型</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>质量公告</option>
                  <option>标准变更</option>
                  <option>整改要求</option>
                  <option>系统通知</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">公告内容</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm h-32 resize-none" placeholder="请输入公告内容"></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isTop" className="rounded" />
                <label htmlFor="isTop" className="text-sm text-gray-600">置顶显示</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">发布</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
