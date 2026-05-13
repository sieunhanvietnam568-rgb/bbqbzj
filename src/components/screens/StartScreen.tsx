import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Archive, Settings, Skull, Droplets } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import Modal from '../ui/Modal';
import './StartScreen.css';

interface Particle {
  x: number; y: number; size: number; speedX: number; speedY: number;
  opacity: number; life: number; maxLife: number;
}

export default function StartScreen() {
  const { state, dispatch } = useGame();
  const [showSettings, setShowSettings] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const spawnParticle = useCallback((): Particle => ({
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + 10,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: -(Math.random() * 0.6 + 0.2),
    opacity: Math.random() * 0.3 + 0.1,
    life: 0,
    maxLife: 300 + Math.random() * 400,
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const initial: Particle[] = Array.from({ length: 60 }, () => {
      const p = spawnParticle();
      p.y = Math.random() * window.innerHeight;
      p.life = Math.random() * p.maxLife;
      return p;
    });
    setParticles(initial);

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    let parts = [...initial];
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts = parts.map((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        return p;
      }).filter((p) => p.life < p.maxLife);

      if (parts.length < 60) parts.push(spawnParticle());

      for (const p of parts) {
        const alpha = p.opacity * (1 - p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(126,200,227,${alpha})`;
        ctx.fill();
      }

      setParticles(parts);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [spawnParticle]);

  const hasSessions = state.chatSessions.length > 0 && state.chatSessions[0].messages.length > 2;

  return (
    <motion.div
      id="start-screen"
      className="start-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.0 } }}
    >
      <canvas ref={canvasRef} className="start-canvas" />

      <div className="start-overlay" />

      {/* 雾气效果 */}
      <div className="fog-layer fog-1" />
      <div className="fog-layer fog-2" />

      <div className="start-center">
        <motion.div
          className="start-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div className="start-logo">
            <Skull size={48} className="logo-icon" />
          </div>
          <h1 className="start-title">末日生存</h1>
          <p className="start-subtitle">DOOMSDAY SURVIVAL</p>
          <div className="start-divider" />
          <p className="start-desc">
            病毒爆发后的第 47 天。城市沦为废墟，感染者在街头游荡。
            <br />
            你带领着仅存的同伴，在绝望中寻找一线生机。
          </p>
        </motion.div>

        <motion.div
          className="start-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.0 }}
        >
          <button
            id="btn-start-game"
            className="start-btn-primary"
            onClick={() => dispatch({ type: 'START_GAME' })}
          >
            <Play size={20} fill="currentColor" />
            <span>{hasSessions ? '继续游戏' : '开始游戏'}</span>
          </button>

          {hasSessions && (
            <button
              id="btn-new-game"
              className="start-btn-secondary"
              onClick={() => {
                dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'info', title: '新游戏', message: '新游戏功能将在完整版中提供' } });
              }}
            >
              <Droplets size={18} />
              <span>新游戏</span>
            </button>
          )}

          <button
            id="btn-settings"
            className="start-btn-settings"
            onClick={() => setShowSettings(true)}
          >
            <Settings size={16} />
          </button>
        </motion.div>

        <motion.p
          className="start-version"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
        >
          v1.0 · 前端原型
        </motion.p>
      </div>

      {/* 快速设置模态框 */}
      <Modal id="start-settings-modal" open={showSettings} onClose={() => setShowSettings(false)} title="快速设置">
        <div className="quick-settings">
          <div className="qs-row">
            <span>难度</span>
            <select
              id="setting-difficulty"
              value={state.settings.difficulty}
              onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { difficulty: e.target.value as any } })}
            >
              <option>简单</option><option>普通</option><option>困难</option><option>噩梦</option>
            </select>
          </div>
          <div className="qs-row">
            <span>字体大小</span>
            <select
              id="setting-fontsize"
              value={state.settings.fontSize}
              onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { fontSize: e.target.value as any } })}
            >
              <option>小</option><option>中</option><option>大</option>
            </select>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
