import { motion } from 'framer-motion';
import { MapPin, Clock, Thermometer, Heart, Drumstick, Droplets } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import ChatPanel from '../panels/ChatPanel';
import StatBar from '../ui/StatBar';
import GlassPanel from '../ui/GlassPanel';
import PillBadge from '../ui/PillBadge';
import type { GameTime } from '../../types';
import './MainPage.css';

function getWeather(period: GameTime['period']): string {
  const map: Record<string, string> = { '清晨': '薄雾', '上午': '多云', '下午': '阴', '傍晚': '微风', '深夜': '寒冷' };
  return map[period] || '阴';
}

export default function MainPage() {
  const { state, dispatch } = useGame();
  const activeChar = state.characters.find((c) => c.id === state.activeCharacterId);
  if (!activeChar) return null;

  const currentRegion = state.gameMap.parentRegion.id === state.gameMap.currentLocation
    ? state.gameMap.parentRegion
    : state.gameMap.subRegions.find((r) => r.id === state.gameMap.currentLocation) || state.gameMap.parentRegion;

  const weather = getWeather(state.gameTime.period);

  return (
    <div id="main-page" className="main-page">
      <div className="main-chat-area">
        {/* 场景描述头 */}
        <motion.div
          className="scene-header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="scene-location">
            <MapPin size={16} className="scene-icon" />
            <span className="scene-name">{currentRegion.name}</span>
            <PillBadge text={`危险 Lv.${currentRegion.dangerLevel}`} variant={currentRegion.dangerLevel >= 4 ? 'danger' : 'warning'} size="sm" />
          </div>
          <div className="scene-meta">
            <span className="scene-meta-item">
              <Clock size={13} />
              第{state.gameTime.day}天 {String(state.gameTime.hour).padStart(2, '0')}:{String(state.gameTime.minute).padStart(2, '0')} {state.gameTime.period}
            </span>
            <span className="scene-meta-item">
              <Thermometer size={13} />
              {weather}
            </span>
          </div>
        </motion.div>

        <ChatPanel />
      </div>

      {/* 右侧快捷状态栏 */}
      <aside className="main-sidebar">
        <GlassPanel className="sidebar-card" variant="strong">
          <div className="sidebar-char-header">
            <div className="sidebar-avatar" style={{ background: activeChar.avatarGradient }}>
              {activeChar.avatar}
            </div>
            <div>
              <div className="sidebar-char-name">{activeChar.name}</div>
              <div className="sidebar-char-desc">{activeChar.gender} · {activeChar.age}岁</div>
            </div>
          </div>

          <div className="sidebar-stats">
            <StatBar label="好感度" value={activeChar.stats.affection} icon={Heart} size="sm" />
            <StatBar label="饥饿值" value={activeChar.stats.hunger} icon={Drumstick} size="sm" />
            <StatBar label="饥渴值" value={activeChar.stats.thirst} icon={Droplets} size="sm" />
          </div>

          <div className="sidebar-detail-row">
            <span className="sidebar-label">性欲</span>
            <span className="sidebar-val">{activeChar.stats.lust}/100</span>
          </div>
          <div className="sidebar-detail-row">
            <span className="sidebar-label">厌恶</span>
            <span className="sidebar-val">{activeChar.stats.disgust}/100</span>
          </div>
          <div className="sidebar-detail-row">
            <span className="sidebar-label">理智</span>
            <span className={`sidebar-val ${activeChar.stats.sanity < 60 ? 'text-danger' : ''}`}>
              {activeChar.stats.sanity}/100
            </span>
          </div>

          <button
            id="btn-goto-characters"
            className="sidebar-link-btn"
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'characters' })}
          >
            查看完整角色信息
          </button>
        </GlassPanel>
      </aside>
    </div>
  );
}
