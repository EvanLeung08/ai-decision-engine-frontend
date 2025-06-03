export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
      <div className="space-y-4">
        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
          <i className="fa-solid fa-bolt mr-2"></i>
          <span>快捷功能</span>
        </div>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors">
            <i className="fa-solid fa-flask mr-2 text-purple-500"></i>
            <span>实验模式</span>
          </li>
          <li className="p-2 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors">
            <i className="fa-solid fa-history mr-2 text-blue-500"></i>
            <span>历史记录</span>
          </li>
          <li className="p-2 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors">
            <i className="fa-solid fa-bookmark mr-2 text-green-500"></i>
            <span>收藏工具</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}