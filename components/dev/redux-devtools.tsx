"use client";

import { useEffect, useState } from 'react';

export function ReduxDevTools() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Chỉ hiển thị trong development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black text-white p-2 rounded text-xs">
        Redux DevTools: F12 → Redux
      </div>
    </div>
  );
} 