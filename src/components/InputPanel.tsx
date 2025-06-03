import { useState } from 'react';
import { motion } from 'framer-motion';

interface InputPanelProps {
  activeTab: 'structured' | 'natural';
  setActiveTab: (tab: 'structured' | 'natural') => void;
  inputData: any;
  setInputData: (data: any) => void;
}

export default function InputPanel({ 
  activeTab, 
  setActiveTab,
  inputData,
  setInputData
}: InputPanelProps) {
  const [inputText, setInputText] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6 mb-6"
    >
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'natural' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('natural')}
        >
          <i className="fa-solid fa-comment-dots mr-2"></i>
          自然语言输入
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'structured' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('structured')}
        >
          <i className="fa-solid fa-table-list mr-2"></i>
          结构化输入
        </button>
      </div>

      {activeTab === 'natural' ? (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              rows={5}
              placeholder="输入您的需求，例如：'查询北京近一周的天气数据'"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute right-2 bottom-2 text-xs text-gray-400">
              语法检查中...
            </div>
          </div>
          <button 
            className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            onClick={() => setInputData({...inputData, content: inputText, processed: true})}
          >
            <i className="fa-solid fa-paper-plane mr-2"></i>
            提交分析
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">API名称</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="例如: weather_api"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">参数</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="例如: location=Beijing"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">请求体</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              placeholder="JSON格式请求体"
            />
          </div>
          <button className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
            <i className="fa-solid fa-paper-plane mr-2"></i>
            提交请求
          </button>
        </div>
      )}
    </motion.div>
  );
}