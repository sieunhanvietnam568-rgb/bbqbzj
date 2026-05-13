import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { Notification } from '../../types';
import './Toast.css';

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const colorMap = {
  info: 'var(--color-primary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-danger)',
};

function ToastItem({ notification }: { notification: Notification }) {
  const { dispatch } = useGame();
  const IconComp = iconMap[notification.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
    }, 6000);
    return () => clearTimeout(timer);
  }, [notification.id, dispatch]);

  return (
    <motion.div
      id={`toast-${notification.id}`}
      className={`toast toast-${notification.type}`}
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ borderLeftColor: colorMap[notification.type] }}
      role="alert"
    >
      <IconComp size={18} color={colorMap[notification.type]} />
      <div className="toast-body">
        <span className="toast-title">{notification.title}</span>
        {notification.message && <span className="toast-msg">{notification.message}</span>}
      </div>
      <button
        className="toast-close"
        onClick={() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })}
        aria-label="关闭通知"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default function ToastContainer() {
  const { state } = useGame();

  return (
    <div id="toast-container" className="toast-container" aria-live="polite">
      <AnimatePresence>
        {state.notifications.map((n) => (
          <ToastItem key={n.id} notification={n} />
        ))}
      </AnimatePresence>
    </div>
  );
}
