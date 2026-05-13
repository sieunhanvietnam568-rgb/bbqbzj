import { motion } from 'framer-motion';
import './PillBadge.css';

interface PillBadgeProps {
  text: string;
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  icon?: React.ElementType;
  pulse?: boolean;
}

const variantStyles = {
  info: { bg: 'rgba(126,200,227,0.15)', color: 'var(--color-primary)', border: 'rgba(126,200,227,0.25)' },
  success: { bg: 'rgba(105,219,124,0.15)', color: 'var(--color-success)', border: 'rgba(105,219,124,0.25)' },
  warning: { bg: 'rgba(255,230,109,0.15)', color: 'var(--color-warning)', border: 'rgba(255,230,109,0.25)' },
  danger: { bg: 'rgba(255,107,107,0.15)', color: 'var(--color-danger)', border: 'rgba(255,107,107,0.25)' },
  ghost: { bg: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: 'rgba(255,255,255,0.08)' },
};

export default function PillBadge({ text, variant = 'info', size = 'sm', icon: Icon, pulse = false }: PillBadgeProps) {
  const s = variantStyles[variant];
  return (
    <motion.span
      className={`pill-badge pill-${size} ${pulse ? 'pill-pulse' : ''}`}
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
      whileHover={{ scale: 1.04 }}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : 14} />}
      {text}
    </motion.span>
  );
}
