import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shirt, Edit3, Check, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { Character, Clothing } from '../../types';
import './ClothingEditor.css';

const clothingLabels: { key: keyof Clothing; label: string; icon: React.ElementType }[] = [
  { key: 'top', label: '上装', icon: Shirt },
  { key: 'bottom', label: '下装', icon: Shirt },
  { key: 'underwear', label: '内衣', icon: Shirt },
  { key: 'socks', label: '袜子', icon: Shirt },
  { key: 'shoes', label: '鞋子', icon: Shirt },
  { key: 'accessories', label: '饰品', icon: Shirt },
];

interface Props { character: Character; }

export default function ClothingEditor({ character }: Props) {
  const { dispatch } = useGame();
  const [editingKey, setEditingKey] = useState<keyof Clothing | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (key: keyof Clothing) => {
    setEditingKey(key);
    setEditValue(character.clothing[key]);
  };

  const saveEdit = () => {
    if (!editingKey) return;
    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: {
        ...character,
        clothing: { ...character.clothing, [editingKey]: editValue },
      },
    });
    setEditingKey(null);
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { type: 'success', title: '已更新', message: `着装已更新` },
    });
  };

  const cancelEdit = () => {
    setEditingKey(null);
  };

  return (
    <div className="clothing-editor">
      {clothingLabels.map(({ key, label }, i) => (
        <motion.div
          key={key}
          id={`clothing-${key}`}
          className="clothing-row"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <span className="clothing-label">{label}</span>

          {editingKey === key ? (
            <div className="clothing-edit-group">
              <input
                id={`clothing-input-${key}`}
                className="clothing-input"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit(); }}
              />
              <button id={`clothing-save-${key}`} className="clothing-action save" onClick={saveEdit} aria-label="保存">
                <Check size={14} />
              </button>
              <button id={`clothing-cancel-${key}`} className="clothing-action cancel" onClick={cancelEdit} aria-label="取消">
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="clothing-value-row">
              <span className="clothing-value">{character.clothing[key]}</span>
              <button
                id={`clothing-edit-${key}`}
                className="clothing-edit-btn"
                onClick={() => startEdit(key)}
                aria-label={`编辑${label}`}
              >
                <Edit3 size={12} />
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
