import { motion } from 'framer-motion';
import { Heart, Drumstick, Brain } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import GlassPanel from '../ui/GlassPanel';
import PillBadge from '../ui/PillBadge';
import './CharacterList.css';

export default function CharacterList() {
  const { state, dispatch } = useGame();

  return (
    <GlassPanel id="character-list" className="char-list-panel" variant="strong">
      <h3 className="char-list-title">角色列表</h3>
      <div className="char-list-items">
        {state.characters.map((char, i) => (
          <motion.button
            key={char.id}
            id={`char-item-${char.id}`}
            className={`char-list-item ${char.id === state.activeCharacterId ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_CHARACTER', payload: char.id })}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="cli-avatar" style={{ background: char.avatarGradient }}>
              {char.avatar}
            </div>
            <div className="cli-info">
              <div className="cli-name">{char.name}</div>
              <div className="cli-meta">{char.gender} · {char.age}岁</div>
              <div className="cli-quick-stats">
                <span title="好感度"><Heart size={10} /> {char.stats.affection}</span>
                <span title="饥饿值"><Drumstick size={10} /> {char.stats.hunger}</span>
                <span title="理智值"><Brain size={10} /> {char.stats.sanity}</span>
              </div>
            </div>
            {char.id === state.activeCharacterId && (
              <PillBadge text="当前" variant="info" size="sm" />
            )}
          </motion.button>
        ))}
      </div>
    </GlassPanel>
  );
}
