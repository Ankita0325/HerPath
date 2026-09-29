'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/lib/AppContext';
import { sendMessage, getWelcomeMessage, AIMessage } from '@/services/aiService';
import { X, Send, Sparkles, Mic, Globe, ChevronRight, Loader2 } from 'lucide-react';

function renderContent(content: string) {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    // Bold text: **text**
    const rendered = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    if (line.startsWith('•') || /^\d+\./.test(line)) {
      return <div key={i} style={{ paddingLeft: '4px', marginBottom: '2px' }} dangerouslySetInnerHTML={{ __html: rendered }} />;
    }
    return <div key={i} style={{ marginBottom: line === '' ? '8px' : '2px' }} dangerouslySetInnerHTML={{ __html: rendered }} />;
  });
}

export function AIPanel() {
  const { aiPanelOpen, setAIPanelOpen, language, setLanguage } = useApp();
  const [messages, setMessages] = useState<AIMessage[]>([getWelcomeMessage()]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (aiPanelOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [aiPanelOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;
    setInput('');

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const response = await sendMessage(userText);
    setMessages(prev => [...prev, response]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!aiPanelOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: '380px',
      height: '560px',
      background: 'var(--card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 500,
      animation: 'slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9375rem', fontFamily: "'Plus Jakarta Sans'" }}>HerPath AI</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>Your personal skill assistant</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', padding: '6px 10px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 500 }}
            >
              <Globe size={13} />
              {language.slice(0, 3)}
            </button>
            {showLangMenu && (
              <div style={{ position: 'absolute', right: 0, top: '36px', background: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', zIndex: 10, minWidth: '120px' }}>
                {['English', 'Hindi', 'Marathi'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                    style={{ display: 'block', width: '100%', padding: '8px 14px', border: 'none', background: language === lang ? 'var(--accent-light)' : 'transparent', color: language === lang ? 'var(--primary)' : 'var(--text)', cursor: 'pointer', fontSize: '0.875rem', textAlign: 'left', fontWeight: language === lang ? 600 : 400 }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setAIPanelOpen(false)}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', width: '30px', height: '30px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: '8px', alignItems: 'flex-end' }}>
            {msg.role === 'assistant' && (
              <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={13} color="var(--primary)" />
              </div>
            )}
            <div style={{
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-alt)',
              color: msg.role === 'user' ? 'white' : 'var(--text)',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
            }}>
              {renderContent(msg.content)}
              {msg.learningPath && (
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {msg.learningPath.slice(0, 4).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '6px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)' }}>
                      <span style={{ fontWeight: 700, color: 'var(--primary)', minWidth: '16px', fontSize: '0.75rem' }}>{i + 1}.</span>
                      <span style={{ fontWeight: 600, fontSize: '0.75rem', color: 'var(--primary-dark)' }}>{item.skill}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Suggestions */}
        {messages.length > 0 && messages[messages.length - 1].role === 'assistant' && messages[messages.length - 1].suggestions && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
            {messages[messages.length - 1].suggestions!.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSend(sug)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--accent-mid)',
                  background: 'var(--accent-light)',
                  color: 'var(--primary)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all var(--transition)',
                }}
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={13} color="var(--primary)" />
            </div>
            <div style={{ padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: 'var(--bg-alt)' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animation: `pulse 1.4s ease ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type or speak in English, Hindi, or Marathi..."
            rows={1}
            style={{
              flex: 1,
              padding: '10px 12px',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius)',
              fontSize: '0.8125rem',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              color: 'var(--text)',
              background: 'var(--bg)',
              maxHeight: '80px',
              overflowY: 'auto',
              lineHeight: 1.5,
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            style={{
              width: 38, height: 38,
              borderRadius: 'var(--radius)',
              background: input.trim() ? 'var(--primary)' : 'var(--bg-alt)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
              transition: 'all var(--transition)',
              flexShrink: 0,
            }}
          >
            {isLoading ? <Loader2 size={16} color="var(--text-muted)" style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} color={input.trim() ? 'white' : 'var(--text-muted)'} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AIFloatingButton() {
  const { toggleAIPanel, aiPanelOpen } = useApp();

  return (
    <button
      onClick={toggleAIPanel}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: aiPanelOpen ? 'var(--secondary)' : 'linear-gradient(135deg, var(--primary), var(--accent))',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(15,118,110,0.35)',
        zIndex: 400,
        transition: 'all var(--transition)',
        color: 'white',
      }}
      title="Open AI Assistant"
    >
      {aiPanelOpen ? <X size={20} /> : <Sparkles size={20} />}
    </button>
  );
}
