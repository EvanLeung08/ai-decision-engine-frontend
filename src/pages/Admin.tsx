import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

// 从mock数据导入
import { adminMock } from '@/mock/data';

// 使用mock数据
const { keys: initialKeys, logs: initialLogs } = adminMock;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'keys' | 'logs'>('keys');
  const [keys, setKeys] = useState(initialKeys);
  const [logs, setLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [newKey, setNewKey] = useState({ name: '', type: 'custom', value: '' });
  const [confirmAction, setConfirmAction] = useState<{show: boolean, action: () => void}>({show: false, action: () => {}});

  // 加载本地存储数据
  useEffect(() => {
    const savedKeys = localStorage.getItem('apiKeys');
    if (savedKeys) setKeys(JSON.parse(savedKeys));

    const savedLogs = localStorage.getItem('auditLogs');
    if (savedLogs) setLogs(JSON.parse(savedLogs));
  }, []);

  // 保存数据到本地存储
  useEffect(() => {
    localStorage.setItem('apiKeys', JSON.stringify(keys));
    localStorage.setItem('auditLogs', JSON.stringify(logs));
  }, [keys, logs]);

  const addKey = () => {
    if (!newKey.name || !newKey.value) {
      toast.error('请填写完整的密钥信息');
      return;
    }
    setKeys([...keys, { ...newKey, id: Date.now().toString() }]);
    setNewKey({ name: '', type: 'custom', value: '' });
    addLog('创建密钥');
    toast.success('密钥添加成功');
  };

  const deleteKey = (id: string) => {
    setConfirmAction({
      show: true,
      action: () => {
        setKeys(keys.filter(key => key.id !== id));
        addLog('删除密钥');
        toast.success('密钥删除成功');
      }
    });
  };

  const addLog = (action: string) => {
    const newLog = {
      timestamp: new Date().toISOString(),
      action,
      user: 'admin'
    };
    setLogs([newLog, ...logs]);
  };

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const keyStrengthData = keys.map(key => ({
    name: key.name,
    strength: key.value.length * 5 // 简单模拟密钥强度
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              <i className="fa-solid fa-shield-halved mr-2 text-red-600"></i>
              系统管理
            </h1>
            <Link 
              to="/" 
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              返回主控制台
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 font-medium ${activeTab === 'keys' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('keys')}
              >
                <i className="fa-solid fa-key mr-2"></i>
                密钥管理
              </button>
              <button
                className={`px-6 py-3 font-medium ${activeTab === 'logs' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('logs')}
              >
                <i className="fa-solid fa-clipboard-list mr-2"></i>
                审计日志
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'keys' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">密钥列表</h2>
                    <div className="space-y-4">
                      {keys.map(key => (
                        <div key={key.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{key.name}</h3>
                              <p className="text-sm text-gray-500">{key.type === 'global' ? '全局密钥' : '自定义密钥'}</p>
                            </div>
                            <div className="flex space-x-2">
                              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {key.value.substring(0, 3)}...{key.value.substring(key.value.length - 4)}
                              </span>
                              {key.type === 'custom' && (
                                <button 
                                  onClick={() => deleteKey(key.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-4 text-gray-800">添加新密钥</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">密钥名称</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                            value={newKey.name}
                            onChange={(e) => setNewKey({...newKey, name: e.target.value})}
                            placeholder="例如: 天气API密钥"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">密钥类型</label>
                          <select
                            className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                            value={newKey.type}
                            onChange={(e) => setNewKey({...newKey, type: e.target.value})}
                          >
                            <option value="custom">自定义密钥</option>
                            <option value="global">全局密钥</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">密钥值</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                            value={newKey.value}
                            onChange={(e) => setNewKey({...newKey, value: e.target.value})}
                            placeholder="输入密钥值"
                          />
                        </div>
                        <button
                          onClick={addKey}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <i className="fa-solid fa-plus mr-2"></i>
                          添加密钥
                        </button>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold mb-4 text-gray-800">密钥强度分析</h2>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={keyStrengthData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="strength" fill="#6366F1" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">操作日志</h2>
                    <div className="relative">
                      <input
                        type="text"
                        className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="搜索日志..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLogs.map((log, index) => (
                          <tr key={index} className={log.action.includes('删除') ? 'bg-red-50' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {log.action}
                              {log.action.includes('删除') && (
                                <span className="ml-2 text-xs text-red-600">
                                  <i className="fa-solid fa-triangle-exclamation"></i> 敏感操作
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.user}</td>
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
      </div>
      <Footer />

      {/* 确认对话框 */}
      {confirmAction.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              <i className="fa-solid fa-triangle-exclamation text-red-500 mr-2"></i>
              确认操作
            </h3>
            <p className="text-gray-600 mb-6">此操作无法撤销，确定要执行吗？</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmAction({show: false, action: () => {}})}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  confirmAction.action();
                  setConfirmAction({show: false, action: () => {}});
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
