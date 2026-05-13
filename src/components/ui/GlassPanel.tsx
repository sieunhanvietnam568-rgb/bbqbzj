import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'strong' | 'subtle';
  glow?: boolean;
}

export default function GlassPanel({ variant = 'default', glow = false, className = '', style, children, ...rest }: GlassPanelProps) {
  const bgMap = {
    default: 'var(--bg-glass)',
    strong: 'var(--bg-glass-strong)',
    subtle: 'rgba(17, 25, 34, 0.4)',
  };

  return (
    <motion.div
      className={`glass-panel ${className}`}
      style={{
        background: bgMap[variant],
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: 'var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: glow ? 'var(--shadow-glow)' : 'var(--shadow-glass)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
