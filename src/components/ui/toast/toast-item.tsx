import React from 'react';
import { motion } from 'framer-motion';
import { toast, Toast as ToastType } from '@utils/toast';

interface ToastItemProps {
  toastData: ToastType;
  index: number;
  total: number;
  isExpanded: boolean;
}

const ToastItem: React.FC<ToastItemProps> = ({ toastData, index, total, isExpanded }) => {
  const { id, type, title, dismissible } = toastData;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="toast-item__icon toast-item__icon--success" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" stroke="var(--success-600)" fill="var(--success-50)"></circle>
            <path d="M7 10l2 2 4-4" stroke="var(--success-600)"></path>
          </svg>
        );
      case 'error':
        return (
          <svg className="toast-item__icon toast-item__icon--error" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" stroke="var(--error-600)" fill="var(--error-50)"></circle>
            <path d="M10 7v4" stroke="var(--error-600)"></path>
            <path d="M10 13h.01" stroke="var(--error-600)"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="toast-item__icon toast-item__icon--warning" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" stroke="var(--warning-600)" fill="var(--warning-50)"></circle>
            <path d="M10 7v4" stroke="var(--warning-600)"></path>
            <path d="M10 13h.01" stroke="var(--warning-600)"></path>
          </svg>
        );
      case 'info':
        return (
          <svg className="toast-item__icon toast-item__icon--info" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" stroke="var(--brand-600)" fill="var(--brand-50)"></circle>
            <path d="M10 13v-4" stroke="var(--brand-600)"></path>
            <path d="M10 7h.01" stroke="var(--brand-600)"></path>
          </svg>
        );
      case 'loading':
        return (
          <svg className="toast-item__spinner" viewBox="0 0 24 24" fill="none">
            <circle
              className="toast-item__spinner-track"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="toast-item__spinner-head"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
    }
  };

  const isVisible = isExpanded || index < 3;
  
  // Calculate transform values for 3D stack (pushing down from top)
  const scale = isExpanded ? 1 : 1 - index * 0.05;
  const yOffset = isExpanded ? 0 : index * 8;
  const opacity = isVisible ? (isExpanded ? 1 : 1 - index * 0.2) : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ 
        opacity,
        y: yOffset,
        scale,
        zIndex: total - index
      }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 80) {
          toast.dismiss(id);
        }
      }}
      className={`toast-item toast-item--${type} ${isExpanded ? 'toast-item--expanded' : 'toast-item--collapsed'}`}
      style={{
        position: isExpanded ? 'relative' : 'absolute',
        top: 0,
        left: isExpanded ? 'auto' : 16,
        right: isExpanded ? 'auto' : 16,
      }}
      role="alert"
      aria-live={type === 'error' || type === 'warning' ? 'assertive' : 'polite'}
    >
      <div className="toast-item__content-wrap">
        {/* Icon */}
        <div className="toast-item__icon-wrap">{getIcon()}</div>

        {/* Text Body */}
        <div className="toast-item__body">
          <span className="toast-item__title">{title}</span>
        </div>
      </div>

      {/* Close button */}
      {dismissible && (
        <button
          onClick={() => toast.dismiss(id)}
          className="toast-item__close-btn"
          aria-label="Dismiss notification"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3L3 9M3 3l6 6" />
          </svg>
        </button>
      )}
    </motion.div>
  );
};

export default ToastItem;
