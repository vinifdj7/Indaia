import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Sparkles, MessageSquare, ChevronRight } from 'lucide-react';

export const Assistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou a Indaiá Assistente. 💕\n\nEstou aqui para ajudar com detalhes do seu casamento. Pergunte sobre etiqueta, cardápio, decoração ou cronograma.',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const QUICK_PROMPTS = [
      "Sugestões de cardápio para verão",
      "Ideias de lembrancinhas",
      "Ordem de entrada na cerimônia",
      "Paletas de cores elegantes"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await sendMessageToGemini(history, userMsg.text);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[600px] bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden animate-fade-in relative">
        {/* Header */}
        <div className="bg-indaia-green p-4 flex justify-between items-center z-10 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="bg-white/10 p-2 rounded-full text-indaia-gold border border-white/10">
                        <Sparkles size={20} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-indaia-green rounded-full"></div>
                </div>
                <div>
                    <h3 className="font-serif text-white font-bold tracking-wide">Indaiá Assistente</h3>
                    <p className="text-white/60 text-xs">IA Especialista em Casamentos</p>
                </div>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#FAFAF9]">
            {/* Disclaimer / Intro decorative element */}
            <div className="text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">Início da conversa</span>
            </div>

            {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                    <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                        <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed relative group ${
                            isUser 
                            ? 'bg-indaia-green text-white rounded-tr-none' 
                            : 'bg-white text-gray-700 rounded-tl-none border border-stone-100'
                        }`}>
                             {/* Markdown-ish formatting */}
                            <div className="whitespace-pre-wrap">
                                {msg.text.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line.split('**').map((part, j) => 
                                            j % 2 === 1 ? <strong key={j} className={isUser ? "text-indaia-gold" : "text-indaia-green"}>{part}</strong> : part
                                        )}
                                        <br/>
                                    </React.Fragment>
                                ))}
                            </div>
                            <span className={`text-[10px] mt-1 block opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 ${isUser ? 'right-0' : 'left-0'} text-gray-400 w-24 ${isUser ? 'text-right' : 'text-left'}`}>
                                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                    </div>
                );
            })}
            
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-stone-100 flex gap-2 items-center shadow-sm">
                        <div className="w-2 h-2 bg-indaia-gold rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-indaia-gold rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-indaia-gold rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts (Only show if few messages) */}
        {messages.length < 3 && !isLoading && (
            <div className="px-4 py-2 bg-[#FAFAF9] flex gap-2 overflow-x-auto no-scrollbar">
                {QUICK_PROMPTS.map((prompt, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="whitespace-nowrap bg-white border border-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full hover:bg-indaia-gold hover:text-white hover:border-indaia-gold transition-colors shadow-sm"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-stone-100">
            <div className="flex gap-2 relative">
                <input 
                    type="text" 
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indaia-green/50 focus:ring-2 focus:ring-indaia-green/10 text-sm transition-all"
                    placeholder="Digite sua dúvida..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isLoading}
                />
                <button 
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className={`px-4 rounded-xl flex items-center justify-center transition-all ${
                        isLoading || !input.trim() 
                        ? 'bg-stone-100 text-gray-300' 
                        : 'bg-indaia-green text-white shadow-md hover:bg-indaia-green/90 active:scale-95'
                    }`}
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    </div>
  );
};
