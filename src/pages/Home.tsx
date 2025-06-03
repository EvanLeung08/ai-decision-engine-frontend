import { useState } from 'react';
import { motion } from 'framer-motion';
import { RadarChart, Radar, PolarAngleAxis, PolarGrid, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import InputPanel from '@/components/InputPanel';
import RoutingDisplay from '@/components/RoutingDisplay';
import ResultDisplay from '@/components/ResultDisplay';
import { inputMock, routingMock, resultMock } from '@/mock/data';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'structured' | 'natural'>('natural');
  const [developerMode, setDeveloperMode] = useState(false);
  const [inputData, setInputData] = useState(inputMock);
  const [routingData, setRoutingData] = useState(routingMock);
  const [resultData, setResultData] = useState(resultMock);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* 混合输入面板 */}
          <InputPanel 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            inputData={inputData}
            setInputData={setInputData}
          />

          {/* 智能路由展示区 */}
          <RoutingDisplay 
            routingData={routingData}
            developerMode={developerMode}
            setDeveloperMode={setDeveloperMode}
          />

          {/* 结果展示区 */}
          <ResultDisplay 
            resultData={resultData}
            developerMode={developerMode}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}