import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Square, User, Bot } from 'lucide-react';
import { useGame, generateId } from '../../context/GameContext';
import type { ChatMessage } from '../../types';
import './ChatPanel.css';

export default function ChatPanel() {
  const { state, dispatch } = useGame();
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeSession = state.chatSessions.find((s) => s.id === state.activeSessionId);
  const messages = activeSession?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeChar = state.characters.find((c) => c.id === state.activeCharacterId);

  const handleSend = () => {
    if (!input.trim() || isGenerating) return;
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { sessionId: state.activeSessionId, message: userMsg },
    });
    setInput('');
    setIsGenerating(true);

    // 模拟 AI 回复
    const responses = [
      `你环顾四周，${state.gameMap.parentRegion.name}的废墟在${state.gameTime.period}的阳光下显得格外荒凉。风穿过破碎的窗户发出呜咽般的声音。\n\n${activeChar?.name || '同伴'}站在你身边，低声说："我们得在天黑前找到更多的补给。这附近的物资快用完了。"\n\n远处传来感染者的低吼声，但听起来还有几个街区远。你们应该抓紧时间行动。`,
      `${activeChar?.name || '同伴'}检查了一下弹药储备，眉头微皱。"只剩下三个弹匣了。我们最好避开市中心——那里的感染者太多了。"\n\n你注意到街角有家半塌的药店。虽然大部分药品可能已经过期或被人搜刮过，但抗生素和绷带永远不嫌多。\n\n不过，药店通常意味着更多的感染者和更少的逃生路线。`,
      `一阵急促的脚步声从隔壁街道传来。你们迅速躲到一辆废弃的公交车后面。\n\n三个感染者在街上漫无目的地徘徊，它们的动作僵硬而扭曲。其中一个似乎察觉到了什么，朝着你们的方向发出了一声嘶哑的吼叫。\n\n${activeChar?.name || '同伴'}握紧了武器，用眼神询问你的指示。`,
    ];
    const aiContent = responses[Math.floor(Math.random() * responses.length)];

    setTimeout(() => {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          sessionId: state.activeSessionId,
          message: {
            id: generateId(),
            role: 'assistant',
            content: aiContent,
            timestamp: Date.now(),
          },
        },
      });
      dispatch({ type: 'ADVANCE_TIME', payload: 15 + Math.floor(Math.random() * 30) });
      setIsGenerating(false);
    }, 1200 + Math.random() * 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div id="chat-panel" className="chat-panel">
      <div className="chat-messages" role="log" aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              id={`msg-${msg.id}`}
              className={`chat-msg chat-msg-${msg.role}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`msg-avatar msg-avatar-${msg.role}`}>
                {msg.role === 'user' ? <User size={14} /> : msg.role === 'assistant' ? <Bot size={14} /> : null}
              </div>
              <div className={`msg-bubble msg-bubble-${msg.role}`}>
                <p className="msg-text">{msg.content}</p>
                <span className="msg-time font-mono-stats">
                  {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isGenerating && (
          <motion.div className="chat-msg chat-msg-assistant" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="msg-avatar msg-avatar-assistant"><Bot size={14} /></div>
            <div className="msg-bubble msg-bubble-assistant msg-bubble-typing">
              <span className="typing-dots"><span>.</span><span>.</span><span>.</span></span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          ref={inputRef}
          id="chat-input"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入你的行动或对话..."
          rows={1}
          disabled={isGenerating}
          aria-label="输入消息"
        />
        <button
          id="btn-send"
          className={`chat-send-btn ${isGenerating ? 'generating' : ''}`}
          onClick={isGenerating ? () => setIsGenerating(false) : handleSend}
          disabled={!input.trim() && !isGenerating}
          aria-label={isGenerating ? '停止生成' : '发送消息'}
        >
          {isGenerating ? <Square size={16} /> : <Send size={16} />}
        </button>
      </div>
    </div>
  );
}
