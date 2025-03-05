import React from 'react';

export function Button({ children, onClick, color = 'gray' }) {
  const colors = {
    gray: 'bg-gray-300 text-black',
    blue: 'bg-blue-500 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${colors[color]} hover:opacity-80 transition`}
    >
      {children}
    </button>
  );
}
