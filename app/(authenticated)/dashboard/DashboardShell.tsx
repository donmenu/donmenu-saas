'use client';

import Sidebar from './sidebar';
import { useState } from 'react';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  // Estado local para controlar o sidebar (pode ser global/contexto se preferir)
  const [collapsed, setCollapsed] = useState(true);

  // Funções para passar para o Sidebar controlar o estado
  const handleSidebarExpand = () => setCollapsed(false);
  const handleSidebarCollapse = () => setCollapsed(true);

  // Largura do sidebar: 64px (w-16) recolhido, 256px (w-64) expandido
  const sidebarWidth = collapsed ? 64 : 256;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar
        collapsed={collapsed}
        onExpand={handleSidebarExpand}
        onCollapse={handleSidebarCollapse}
      />
      <main
        className="flex-1 overflow-y-auto transition-all duration-300"
        style={{ paddingLeft: sidebarWidth }}
      >
        {children}
      </main>
    </div>
  );
} 