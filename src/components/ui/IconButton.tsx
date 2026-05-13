import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import './IconButton.css';

interface IconButtonProps {
  id?: string;
  icon: LucideIcon;
  label?: string;
  onClick?: () => void;
  variant?: 'ghost' | 'glass' | 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  badge?: number | string;
  disabled?: boolean;
  className?: string;
}

export default function IconButton({
  id, icon: IconComp, label, onClick, variant = 'ghost',
  size = 'md', active = false, badge, disabled = false, className = '',
}: IconButtonProps) {
  return (
    <motion.button
      id={id}
      className={`icon-btn icon-btn-${variant} icon-btn-${size} ${active ? 'active' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      aria-label={label}
    >
      <IconComp size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />
      {label && <span className="icon-btn-label">{label}</span>}
      {badge != null && <span className="icon-btn-badge">{badge}</span>}
    </motion.button>
  );
}
