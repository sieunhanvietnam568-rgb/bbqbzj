import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Shirt, BarChart3, Activity, Brain, Edit3 } from 'lucide-react';
import type { Character } from '../../types';
import GlassPanel from '../ui/GlassPanel';
import StatBar from '../ui/StatBar';
import IconButton from '../ui/IconButton';
import PillBadge from '../ui/PillBadge';
import ClothingEditor from './ClothingEditor';
import BodyPartStatus from './BodyPartStatus';
import './CharacterDetail.css';

type TabId = 'info' | 'clothing' | 'stats' | 'body' | 'psyche';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'info', label: '基本信息', icon: Info },
  { id: 'clothing', label: '着装', icon: Shirt },
  { id: 'stats', label: '状态数值', icon: BarChart3 },
  { id: 'body', label: '部位', icon: Activity },
  { id: 'psyche', label: '心理', icon: Brain },
];

interface Props { character: Character; }

export default function CharacterDetail({ character }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('info');

  return (
    <GlassPanel id="character-detail" className="char-detail-panel" variant="strong">
      {/* 角色头像 + 名称头 */}
      <div className="cd-header">
        <div className="cd-avatar-lg" style={{ background: character.avatarGradient }}>
          {character.avatar}
        </div>
        <div className="cd-header-info">
          <h2 className="cd-name">{character.name}</h2>
          <div className="cd-badges">
            <PillBadge text={character.gender} variant="info" size="sm" />
            <PillBadge text={`${character.age}岁`} variant="ghost" size="sm" />
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="cd-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`cd-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 标签页内容 */}
      <div className="cd-content" role="tabpanel">
        <AnimatePresence mode="wait">
          {activeTab === 'info' && (
            <motion.div key="info" className="cd-tab-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7 }}>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">姓名</span>
                  <span className="info-value">{character.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">性别</span>
                  <span className="info-value">{character.gender}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">年龄</span>
                  <span className="info-value">{character.age} 岁</span>
                </div>
              </div>
              <div className="info-desc">
                <span className="info-label">背景描述</span>
                <p className="info-desc-text">{character.description}</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'clothing' && (
            <motion.div key="clothing" className="cd-tab-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7 }}>
              <ClothingEditor character={character} />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div key="stats" className="cd-tab-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7 }}>
              <div className="stats-grid">
                <StatBar label="好感度" value={character.stats.affection} size="lg" />
                <StatBar label="饥饿值" value={character.stats.hunger} size="lg" />
                <StatBar label="饥渴值" value={character.stats.thirst} size="lg" />
                <StatBar label="性欲" value={character.stats.lust} size="lg" />
                <StatBar label="厌恶值" value={character.stats.disgust} size="lg" />
                <StatBar label="理智值" value={character.stats.sanity} size="lg" />
              </div>
            </motion.div>
          )}

          {activeTab === 'body' && (
            <motion.div key="body" className="cd-tab-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7 }}>
              <BodyPartStatus character={character} />
            </motion.div>
          )}

          {activeTab === 'psyche' && (
            <motion.div key="psyche" className="cd-tab-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7 }}>
              <div className="psyche-box">
                <div className="psyche-header">
                  <Brain size={18} className="text-accent" />
                  <span className="psyche-title">心理状态</span>
                </div>
                <p className="psyche-text">{character.psychologyState}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
}
