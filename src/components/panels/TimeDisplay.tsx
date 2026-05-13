import { motion } from 'framer-motion';
import { Clock, Sun, Moon, Sunrise, Sunset, CloudSun } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { GameTime } from '../../types';
import './TimeDisplay.css';

const periodIcon: Record<GameTime['period'], React.ElementType> = {
  '清晨': Sunrise,
  '上午': CloudSun,
  '下午': Sun,
  '傍晚': Sunset,
  '深夜': Moon,
};

const periodColor: Record<GameTime['period'], string> = {
  '清晨': '#FFE66D',
  '上午': '#7EC8E3',
  '下午': '#FFD93D',
  '傍晚': '#FF6B6B',
  '深夜': '#7C8BFF',
};

export default function TimeDisplay() {
  const { state } = useGame();
  const { gameTime } = state;
  const IconComp = periodIcon[gameTime.period];
  const color = periodColor[gameTime.period];

  return (
    <motion.div
      id="time-display"
      className="time-display"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="time-icon-ring" style={{ borderColor: `${color}40` }}>
        <IconComp size={28} color={color} />
      </div>
      <div className="time-info">
        <div className="time-main font-mono-stats">
          第 <span className="time-day">{gameTime.day}</span> 天
        </div>
        <div className="time-clock font-mono-stats" style={{ color }}>
          {String(gameTime.hour).padStart(2, '0')}:{String(gameTime.minute).padStart(2, '0')}
        </div>
        <div className="time-period" style={{ color }}>
          {gameTime.period}
        </div>
      </div>
    </motion.div>
  );
}
