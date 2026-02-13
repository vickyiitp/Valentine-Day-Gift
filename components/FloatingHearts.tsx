import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    // Generate static hearts on mount to avoid re-render flicker
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position
      delay: Math.random() * 5, // Random animation delay
      size: Math.random() * 1.5 + 0.5, // Random size
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-300 opacity-30 animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: `${heart.size}rem`,
            animation: `float ${3 + Math.random() * 4}s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤️
        </div>
      ))}
      <div className="absolute top-10 left-[10%] text-4xl opacity-20 animate-bounce">💖</div>
      <div className="absolute top-40 right-[15%] text-2xl opacity-20 animate-pulse">💘</div>
      <div className="absolute bottom-20 left-[20%] text-3xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>💗</div>
    </div>
  );
};

export default FloatingHearts;