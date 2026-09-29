'use client';
import React from 'react';
import { Sidebar, MobileNav } from './Navigation';
import { AIPanel, AIFloatingButton } from './AIAssistant';
import { useApp } from '@/lib/AppContext';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      <MobileNav />
      <AIPanel />
      <AIFloatingButton />
    </div>
  );
}
