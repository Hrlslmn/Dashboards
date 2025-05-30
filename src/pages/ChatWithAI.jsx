import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { supabase } from '../../supabaseClient';

export default function ChatWithAI() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadMessages = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (user) {
        const { data, error } = await supabase
          .from('conversations')
          .select('id, sender, message, timestamp, is_image')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: true });

        if (error) console.error('Load Error:', error);

        if (data && data.length > 0) {
          const loaded = data.map((msg) => ({
            id: msg.id,
            from: msg.sender,
            text: msg.message,
            isImage: msg.is_image,
            time: new Date(msg.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }));
          setMessages(loaded);
        } else {
          setMessages([
            {
              from: 'them',
              text: 'Hello! I’m your AI assistant. How can I help you today?',
              isImage: false,
              time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
          ]);
        }
      }
    };

    loadMessages();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = {
      from: 'me',
      text: input,
      isImage: false,
      time: timeNow,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (user) {
      await supabase.from('conversations').insert({
        user_id: user.id,
        sender: 'me',
        message: input,
        is_image: false,
      });
    }

    try {
      const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...updatedMessages.map((msg) => ({
              role: msg.from === 'me' ? 'user' : 'assistant',
              content: msg.text,
            })),
          ],
        }),
      });

      const gptData = await gptRes.json();
      const reply = gptData.choices?.[0]?.message?.content || 'Sorry, I could not understand.';
      const aiMessage = {
        from: 'them',
        text: reply,
        isImage: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);

      if (user) {
        await supabase.from('conversations').insert({
          user_id: user.id,
          sender: 'them',
          message: aiMessage.text,
          is_image: aiMessage.isImage,
        });
      }
    } catch (err) {
      console.error('OpenAI API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    setShowConfirm(false);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;
    if (!user) return;

    await supabase.from('conversations').delete().eq('user_id', user.id);

    setMessages([
      {
        from: 'them',
        text: 'Hello! I’m your AI assistant. How can I help you today?',
        isImage: false,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-hidden">
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
          <div className="fixed z-50 top-0 left-0 h-full">
            <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} isMobile />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen((prev) => !prev)} />

        <div className="shrink-0 px-4 md:px-6 py-4 border-b bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Chat with AI</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your AI assistant is here to help</p>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Clear Chat
          </button>
        </div>

        <main className="flex-1 flex flex-col bg-[#FAFAFA] dark:bg-gray-900 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`w-fit max-w-[85%] px-4 py-2 rounded-xl text-sm shadow relative break-words ${
                  msg.from === 'me'
                    ? 'ml-auto bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                }`}
              >
                {msg.isImage ? (
                  <img src={msg.text} alt="AI" className="rounded-md max-w-full" />
                ) : (
                  msg.text
                )}
                <span className="block text-[10px] text-right mt-1 opacity-70">{msg.time}</span>
              </div>
            ))}
            {loading && (
              <div className="w-fit max-w-[85%] px-4 py-2 rounded-xl text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white dark:bg-gray-950 p-4 border-t dark:border-gray-800 flex items-center gap-2 shadow-inner shrink-0">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </main>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h3 className="text-lg font-semibold mb-4">Clear chat history?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This will delete all messages. Are you sure?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleClearChat}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Yes, Clear
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}









