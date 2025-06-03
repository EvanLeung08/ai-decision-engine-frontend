export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-3 text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <span>AI路由服务 v1.0.0</span>
        </div>
        <div className="flex space-x-4">
          <span>状态: <span className="text-green-400">运行中</span></span>
          <span>最后更新: 2025-05-31</span>
        </div>
      </div>
    </footer>
  );
}