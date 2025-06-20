import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, style, ...props }) => (
  <button
    {...props}
    style={{
      background: 'linear-gradient(90deg, #4f8cff 0%, #6366f1 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '12px 28px',
      fontWeight: 700,
      fontSize: 16,
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(60,60,120,0.08)',
      transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
      outline: 'none',
      ...style,
    }}
    onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
  >
    {children}
  </button>
);

export default Button;