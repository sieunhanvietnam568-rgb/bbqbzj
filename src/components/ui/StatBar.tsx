import { motion } from 'framer-motion';
import './StatBar.css';

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  icon?: React.ElementType;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorMap: Record<string, string> = {
  affection: 'linear-gradient(90deg, #FF6B6B, #FF8E8E)',
  hunger: 'linear-gradient(90deg, #FFE66D, #F0C929)',
  thirst: 'linear-gradient(90deg, #7EC8E3, #4ECDC4)',
  lust: 'linear-gradient(90deg, #E879A8, #F472B6)',
  disgust: 'linear-gradient(90deg, #8B9467, #A8B87A)',
  sanity: 'linear-gradient(90deg, #A78BFA, #C4B5FD)',
};

export default function StatBar({ label, value, max = 100, icon: Icon, color, showLabel = true, size = 'md', className = '' }: StatBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const gradient = color || colorMap[label] || 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))';

  return (
    <div id={`stat-${label}`} className={`stat-bar stat-bar-${size} ${className}`}>
      {showLabel && (
        <div className="stat-header">
          {Icon && <Icon size={14} className="stat-icon" />}
          <span className="stat-label">{label}</span>
          <span className={`stat-value font-mono-stats ${pct <= 25 ? 'danger' : pct <= 50 ? 'warning' : ''}`}>
            {value}/{max}
          </span>
        </div>
      )}
      <div className="stat-track">
        <motion.div
          className="stat-fill"
          style={{ background: gradient }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div className="stat-shine" />
      </div>
    </div>
  );
}
