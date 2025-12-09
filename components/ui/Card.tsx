import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, action, noPadding = false }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-stone-200/60 overflow-hidden transition-all hover:shadow-md ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/30">
          {title && <h3 className="font-serif text-lg font-semibold text-indaia-green tracking-wide">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};
