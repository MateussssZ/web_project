import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: 'Dashboard',
    },
    {
      href: '/admin/articles',
      icon: <FileText className="h-5 w-5" />,
      label: 'Articles',
    },
    {
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
    },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">Articles Platform</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1 bg-white">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span
                  className={`mr-3 ${
                    pathname === item.href
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Admin avatar"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin</p>
              <button className="text-xs font-medium text-gray-500 hover:text-gray-700">
                View profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;