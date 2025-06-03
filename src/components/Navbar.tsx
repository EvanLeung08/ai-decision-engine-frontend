import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-route text-2xl"></i>
          <span className="text-xl font-bold">AI路由控制台</span>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-indigo-200 transition-colors">
            <i className="fa-solid fa-home mr-1"></i> 主控台
          </Link>
          <Link to="/config" className="hover:text-indigo-200 transition-colors">
            <i className="fa-solid fa-sliders mr-1"></i> 工具配置
          </Link>
          <Link to="/admin" className="hover:text-indigo-200 transition-colors">
            <i className="fa-solid fa-gear mr-1"></i> 系统管理
          </Link>
        </div>
      </div>
    </nav>
  );
}