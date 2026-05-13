import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Server, Cpu, Shield, Monitor, Type, Volume2, Save, Info, Skull } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import GlassPanel from '../ui/GlassPanel';
import IconButton from '../ui/IconButton';
import './SettingsScreen.css';

export default function SettingsScreen() {
  const { state, dispatch } = useGame();
  const { settings } = state;

  const update = (partial: Partial<typeof settings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: partial });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type: 'success', title: '已保存', message: '设置已更新' } });
  };

  return (
    <div id="settings-screen" className="settings-screen">
      <motion.div
        className="settings-grid"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* API 设置 */}
        <GlassPanel id="settings-api" className="settings-card" variant="strong">
          <div className="settings-section-header">
            <Key size={18} className="section-icon" />
            <h3>API 设置</h3>
          </div>
          <div className="settings-field">
            <label htmlFor="setting-apikey">API Key</label>
            <input
              id="setting-apikey"
              type="password"
              value={settings.apiKey}
              onChange={(e) => update({ apiKey: e.target.value })}
              placeholder="sk-..."
            />
          </div>
          <div className="settings-field">
            <label htmlFor="setting-apiurl">
              <Server size={13} /> API 地址
            </label>
            <input
              id="setting-apiurl"
              value={settings.apiUrl}
              onChange={(e) => update({ apiUrl: e.target.value })}
            />
          </div>
          <div className="settings-field">
            <label htmlFor="setting-model">
              <Cpu size={13} /> 模型
            </label>
            <input
              id="setting-model"
              value={settings.model}
              onChange={(e) => update({ model: e.target.value })}
            />
          </div>
        </GlassPanel>

        {/* 游戏设置 */}
        <GlassPanel id="settings-game" className="settings-card" variant="strong">
          <div className="settings-section-header">
            <Shield size={18} className="section-icon" />
            <h3>游戏设置</h3>
          </div>
          <div className="settings-field">
            <label htmlFor="setting-difficulty">难度</label>
            <select
              id="setting-difficulty"
              value={settings.difficulty}
              onChange={(e) => update({ difficulty: e.target.value as any })}
            >
              <option>简单</option>
              <option>普通</option>
              <option>困难</option>
              <option>噩梦</option>
            </select>
          </div>
          <div className="settings-field">
            <label htmlFor="setting-autosave">
              <Save size={13} /> 自动存档
            </label>
            <button
              id="setting-autosave"
              className={`toggle-btn ${settings.autoSave ? 'on' : ''}`}
              onClick={() => update({ autoSave: !settings.autoSave })}
              role="switch"
              aria-checked={settings.autoSave}
            >
              <span className="toggle-thumb" />
            </button>
          </div>
        </GlassPanel>

        {/* 显示设置 */}
        <GlassPanel id="settings-display" className="settings-card" variant="strong">
          <div className="settings-section-header">
            <Monitor size={18} className="section-icon" />
            <h3>显示设置</h3>
          </div>
          <div className="settings-field">
            <label htmlFor="setting-fontsize">
              <Type size={13} /> 字体大小
            </label>
            <div className="font-size-group">
              {(['小', '中', '大'] as const).map((s) => (
                <button
                  key={s}
                  id={`fontsize-${s}`}
                  className={`fs-btn ${settings.fontSize === s ? 'active' : ''}`}
                  onClick={() => update({ fontSize: s })}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="settings-field">
            <label htmlFor="setting-sound">
              <Volume2 size={13} /> 音效
            </label>
            <button
              id="setting-sound"
              className={`toggle-btn ${settings.soundEnabled ? 'on' : ''}`}
              onClick={() => update({ soundEnabled: !settings.soundEnabled })}
              role="switch"
              aria-checked={settings.soundEnabled}
            >
              <span className="toggle-thumb" />
            </button>
          </div>
        </GlassPanel>

        {/* 关于 */}
        <GlassPanel id="settings-about" className="settings-card" variant="strong">
          <div className="settings-section-header">
            <Info size={18} className="section-icon" />
            <h3>关于</h3>
          </div>
          <div className="about-content">
            <div className="about-logo">
              <Skull size={32} className="text-accent" />
            </div>
            <h4 className="about-title">末日生存</h4>
            <p className="about-sub">Doomsday Survival v1.0</p>
            <p className="about-text">
              以 LLM 为核心的开放世界末日生存游戏前端原型。
              <br />
              生化危机背景 | 多角色系统 | 动态地图 | AI 叙事
            </p>
            <div className="about-meta">
              <span>React 18 + TypeScript</span>
              <span>Framer Motion</span>
              <span>Lucide Icons</span>
              <span>IndexedDB</span>
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
