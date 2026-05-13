import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';
import type { Character, BodyParts } from '../../types';
import './BodyPartStatus.css';

const bodyPartLabels: { key: keyof BodyParts; label: string }[] = [
  { key: 'mouth', label: '口腔' },
  { key: 'hands', label: '手' },
  { key: 'feet', label: '脚' },
  { key: 'vagina', label: '小穴' },
  { key: 'anus', label: '肛门' },
  { key: 'breasts', label: '乳房' },
];

function getStatusColor(status: string): string {
  if (status === '正常') return 'var(--color-success)';
  if (status === '—') return 'var(--text-muted)';
  return 'var(--color-warning)';
}

interface Props { character: Character; }

export default function BodyPartStatus({ character }: Props) {
  return (
    <div className="body-parts-grid">
      {bodyPartLabels.map(({ key, label }, i) => {
        const status = character.bodyParts[key];
        const color = getStatusColor(status);

        return (
          <motion.div
            key={key}
            id={`bodypart-${key}`}
            className="body-part-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <div className="bp-indicator">
              <Circle size={12} fill={color} color={color} />
              {status !== '正常' && status !== '—' && (
                <span className="bp-pulse" style={{ background: color }} />
              )}
            </div>
            <span className="bp-label">{label}</span>
            <span className="bp-status" style={{ color }}>
              {status}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
