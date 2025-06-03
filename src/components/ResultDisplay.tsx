import { useState } from 'react';


interface ResultDisplayProps {
  resultData: any;
  developerMode: boolean;
}

export default function ResultDisplay({ 
  resultData,
  developerMode
}: ResultDisplayProps) {
  const [activeTab, setActiveTab] = useState<'raw' | 'visual'>('raw');
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          <i className="fa-solid fa-chart-column mr-2 text-purple-600"></i>
          结果展示
        </h2>
        <button 
          className="text-sm text-indigo-600 hover:text-indigo-800"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '收起详情' : '展开详情'}
        </button>
      </div>

      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'raw' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('raw')}
        >
          <i className="fa-solid fa-code mr-2"></i>
          原始数据
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'visual' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('visual')}
        >
          <i className="fa-solid fa-chart-line mr-2"></i>
          可视化
        </button>
      </div>

      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
        {activeTab === 'raw' ? (

          <div className="bg-gray-50 p-4 rounded-lg">
            {developerMode ? (
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                {JSON.stringify(resultData.rawData, null, 2)}
              </pre>
            ) : (
              <div className="space-y-2">
                {Object.entries(resultData.rawData).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="w-32 font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <i className="fa-solid fa-chart-pie text-4xl text-indigo-600 mb-2"></i>
            <p className="text-indigo-800">可视化图表展示区域</p>
            {developerMode && (
              <div className="mt-4 p-2 bg-white rounded">
                <pre className="text-xs">{JSON.stringify(resultData.visualization, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}