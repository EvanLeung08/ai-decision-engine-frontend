import { RadarChart, Radar, PolarAngleAxis, PolarGrid, ResponsiveContainer } from 'recharts';

interface RoutingDisplayProps {
  routingData: any;
  developerMode: boolean;
  setDeveloperMode: (mode: boolean) => void;
}

export default function RoutingDisplay({ 
  routingData,
  developerMode,
  setDeveloperMode
}: RoutingDisplayProps) {
  const radarData = [
    { subject: '匹配度', A: routingData.confidence * 100 },
    { subject: '响应速度', A: 85 },
    { subject: '成本', A: 60 },
    { subject: '可靠性', A: 90 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          <i className="fa-solid fa-route mr-2 text-indigo-600"></i>
          路由决策分析
        </h2>
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={developerMode}
            onChange={() => setDeveloperMode(!developerMode)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          <span className="ml-2 text-sm font-medium text-gray-700">开发者模式</span>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-medium text-indigo-800 mb-2">推荐工具</h3>
            <p className="text-2xl font-bold text-indigo-600">
              {routingData.recommendedTool}
            </p>
            <div className="mt-2">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                置信度: {(routingData.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {developerMode && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">决策详情</h3>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                {JSON.stringify(routingData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar 
                name="评分" 
                dataKey="A" 
                stroke="#6366F1" 
                fill="#6366F1" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}