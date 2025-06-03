import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RadarChart, Radar, PolarAngleAxis, PolarGrid, ResponsiveContainer } from 'recharts';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

// 工具配置数据mock
const toolMock = {
  id: 'weather_api_v3',
  name: '天气API V3',
  type: 'rest',
  config: {
    endpoint: 'https://api.weather.com/v3',
    authType: 'apiKey',
    parameters: ['location', 'days']
  },
  capabilities: {
    dimensions: ['准确性', '响应速度', '覆盖率', '稳定性', '成本'],
    scores: [90, 85, 80, 88, 70]
  }
};

// 表单验证schema
const toolSchema = z.object({
  name: z.string().min(2, '名称至少需要2个字符'),
  type: z.enum(['rest', 'grpc', 'graphql', 'local']),
  endpoint: z.string().url('请输入有效的URL').optional(),
  authType: z.enum(['none', 'apiKey', 'oauth']).optional(),
  parameters: z.array(z.string()).optional()
});

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
  const [toolData, setToolData] = useState(toolMock);
  const [code, setCode] = useState('// 在此处编写工具逻辑\nfunction process(input) {\n  // 实现你的处理逻辑\n  return input;\n}');

  const radarData = toolData.capabilities.dimensions.map((dimension, index) => ({
    subject: dimension,
    A: toolData.capabilities.scores[index]
  }));

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toolSchema.parse(toolData.config);
      toast.success('配置验证通过');
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      }
    }
  };

  const handleAdvancedSubmit = () => {
    try {
      // 简单模拟代码执行
      new Function(code);
      toast.success('代码验证通过');
    } catch (err) {
      toast.error('代码存在错误: ' + (err as Error).message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              <i className="fa-solid fa-sliders mr-2 text-purple-600"></i>
              工具配置中心
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
                className={`px-6 py-3 font-medium ${activeTab === 'basic' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('basic')}
              >
                <i className="fa-solid fa-table-cells-large mr-2"></i>
                基础配置
              </button>
              <button
                className={`px-6 py-3 font-medium ${activeTab === 'advanced' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('advanced')}
              >
                <i className="fa-solid fa-code mr-2"></i>
                高级扩展
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'basic' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">工具元数据</h2>
                    <form onSubmit={handleBasicSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">工具名称</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                          value={toolData.name}
                          onChange={(e) => setToolData({...toolData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">工具类型</label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                          value={toolData.type}
                          onChange={(e) => setToolData({...toolData, type: e.target.value})}
                        >
                          <option value="rest">REST API</option>
                          <option value="grpc">gRPC</option>
                          <option value="graphql">GraphQL</option>
                          <option value="local">本地方法</option>
                        </select>
                      </div>
                      {toolData.type === 'rest' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">端点URL</label>
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                              value={toolData.config.endpoint}
                              onChange={(e) => setToolData({
                                ...toolData,
                                config: {...toolData.config, endpoint: e.target.value}
                              })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">认证类型</label>
                            <select
                              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                              value={toolData.config.authType}
                              onChange={(e) => setToolData({
                                ...toolData,
                                config: {...toolData.config, authType: e.target.value}
                              })}
                            >
                              <option value="none">无认证</option>
                              <option value="apiKey">API Key</option>
                              <option value="oauth">OAuth</option>
                            </select>
                          </div>
                        </>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">参数列表</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                          value={toolData.config.parameters?.join(', ') || ''}
                          onChange={(e) => setToolData({
                            ...toolData,
                            config: {...toolData.config, parameters: e.target.value.split(',').map(p => p.trim())}
                          })}
                          placeholder="用逗号分隔参数，例如: location, days"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                        保存配置
                      </button>
                    </form>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">能力矩阵</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <Radar
                            name="能力评分"
                            dataKey="A"
                            stroke="#6366F1"
                            fill="#6366F1"
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      {toolData.capabilities.dimensions.map((dimension, index) => (
                        <div key={dimension} className="flex items-center">
                          <span className="w-32 text-sm text-gray-700">{dimension}:</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={toolData.capabilities.scores[index]}
                            onChange={(e) => {
                              const newScores = [...toolData.capabilities.scores];
                              newScores[index] = Number(e.target.value);
                              setToolData({
                                ...toolData,
                                capabilities: {
                                  ...toolData.capabilities,
                                  scores: newScores
                                }
                              });
                            }}
                            className="flex-1"
                          />
                          <span className="ml-2 text-sm font-medium w-8">{toolData.capabilities.scores[index]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">代码编辑器</h2>
                    <textarea
                      className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      spellCheck="false"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        try {
                          new Function(code);
                          toast.success('代码验证通过');
                        } catch (err) {
                          toast.error('代码存在错误: ' + (err as Error).message);
                        }
                      }}
                      className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
                    >
                      <i className="fa-solid fa-check mr-2"></i>
                      验证代码
                    </button>
                    <button
                      onClick={handleAdvancedSubmit}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <i className="fa-solid fa-upload mr-2"></i>
                      注册工具
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
