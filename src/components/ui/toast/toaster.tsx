import React, { useEffect, useState } from 'react';
import { toast, Toast as ToastType } from '@utils/toast';
import { AnimatePresence } from 'framer-motion';
import ToastItem from './toast-item';

const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    return toast.subscribe((newToasts) => {
      setToasts(newToasts);
    });
  }, []);

  return (
    <div 
      className={`toast-container ${isHovered ? 'toast-container--expanded' : 'toast-container--collapsed'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        pointerEvents: toasts.length > 0 ? 'auto' : 'none',
      }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t, index) => {
          // reverseIndex: 0 is the newest toast (last in array), total - 1 is oldest
          const reverseIndex = toasts.length - 1 - index;
          return (
            <ToastItem 
              key={t.id} 
              toastData={t} 
              index={reverseIndex}
              total={toasts.length}
              isExpanded={isHovered}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toaster;
