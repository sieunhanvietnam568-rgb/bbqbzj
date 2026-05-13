import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
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

export default function ToastContainer() {
  const { state, dispatch } = useGame();

  return (
    <div id="toast-container" className="toast-container" aria-live="polite">
      <AnimatePresence>
        {state.notifications.map((n) => {
          const IconComp = iconMap[n.type];
          return (
            <motion.div
              key={n.id}
              id={`toast-${n.id}`}
              className={`toast toast-${n.type}`}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{ borderLeftColor: colorMap[n.type] }}
              role="alert"
            >
              <IconComp size={18} color={colorMap[n.type]} />
              <div className="toast-body">
                <span className="toast-title">{n.title}</span>
                {n.message && <span className="toast-msg">{n.message}</span>}
              </div>
              <button
                className="toast-close"
                onClick={() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: n.id })}
                aria-label="关闭通知"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
