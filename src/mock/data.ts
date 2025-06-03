export const inputMock = {
  inputType: "natural",
  content: "查询北京近一周的天气数据",
  processed: true
};

export const routingMock = {
  recommendedTool: "weather_api_v3",
  confidence: 0.92,
  alternatives: [
    { name: "weather_api_v2", score: 0.85 },
    { name: "climate_service", score: 0.78 }
  ]
};

export const resultMock = {
  rawData: {
    location: "北京",
    temperature: "22°C",
    humidity: "65%",
    wind: "东南风 3级",
    forecast: ["晴", "多云", "小雨", "晴", "晴", "多云", "晴"]
  },
  visualization: {
    type: "line_chart",
    data: {
      labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      datasets: [
        {
          label: "最高温度",
          data: [24, 26, 22, 23, 25, 24, 26],
          borderColor: "#6366F1"
        },
        {
          label: "最低温度",
          data: [18, 20, 16, 17, 19, 18, 20],
          borderColor: "#8B5CF6"
        }
      ]
    }
  }
};

export const toolsMock = [
  {
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
  },
  {
    id: 'stock_api_v2',
    name: '股票API V2',
    type: 'rest',
    config: {
      endpoint: 'https://api.stock.com/v2',
      authType: 'oauth',
      parameters: ['symbol', 'interval']
    },
    capabilities: {
      dimensions: ['准确性', '响应速度', '覆盖率', '稳定性', '成本'],
      scores: [88, 92, 75, 85, 65]
    }
  }
];

const initialKeys = [
  { id: '1', name: '全局API密钥', type: 'global', value: 'sk_******1234' },
  { id: '2', name: '天气API密钥', type: 'custom', value: 'w_******5678' },
  { id: '3', name: '股票API密钥', type: 'custom', value: 's_******9012' }
];

const initialLogs = [
  { timestamp: '2025-05-31 10:00', action: '创建密钥', user: 'admin' },
  { timestamp: '2025-05-31 09:30', action: '删除密钥', user: 'admin' },
  { timestamp: '2025-05-31 09:15', action: '更新配置', user: 'user1' },
  { timestamp: '2025-05-31 08:45', action: '查看日志', user: 'user2' }
];

export const adminMock = {
  keys: initialKeys,
  logs: initialLogs
};