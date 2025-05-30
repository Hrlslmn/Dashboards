import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import {
  Trash2, CheckCircle, Circle, Calendar, Tag, Search, XCircle, Menu
} from 'lucide-react';
import dayjs from 'dayjs';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [tag, setTag] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState(null);
  const [shake, setShake] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return;
      setUserId(user.id);
      const { data } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      setTodos(data || []);
    };
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!newTask.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const { data, error } = await supabase.from('todos').insert([
      { user_id: userId, title: newTask, completed: false, tag, due_date: dueDate || null }
    ]).select();

    if (!error && data) {
      setTodos([...todos, data[0]]);
      setNewTask('');
      setTag('General');
      setDueDate('');
    }
  };

  const toggleComplete = async (id, current) => {
    await supabase.from('todos').update({ completed: !current }).eq('id', id);
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !current } : t));
  };

  const deleteTodo = async (id) => {
    await supabase.from('todos').delete().eq('id', id);
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearCompleted = async () => {
    const completedIds = todos.filter(t => t.completed).map(t => t.id);
    if (completedIds.length === 0) return;
    await supabase.from('todos').delete().in('id', completedIds);
    setTodos(todos.filter(t => !t.completed));
  };

  const filteredTodos = todos.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  const summary = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb] relative">
      {/* Sidebar */}
      <div className="hidden md:block fixed h-full">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-[#1f2937]">
            <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main */}
      <div className={`flex-1 w-full transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">My Tasks</h1>
        </div>

        <main className="px-4 md:px-10 py-6 space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">📝 My Tasks</h1>
            <button
              onClick={clearCompleted}
              className="flex items-center gap-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl transition"
            >
              <XCircle size={16} />
              Clear Completed
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SummaryCard label="Pending" value={summary.pending} color="bg-yellow-100 text-yellow-900" />
            <SummaryCard label="Completed" value={summary.completed} color="bg-green-100 text-green-900" />
            <SummaryCard label="Total Tasks" value={summary.total} color="bg-purple-100 text-purple-900" />
          </div>

          {/* New Task */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What's your next task?"
                className={`col-span-2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 transition w-full ${shake ? 'animate-shake' : ''}`}
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full"
              />
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full"
              >
                <option>General</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Urgent</option>
              </select>
            </div>
            <div className="flex justify-end pt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addTodo}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
              >
                Add Task
              </motion.button>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2 w-full sm:w-2/3">
            <Search size={18} className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="flex-1 bg-transparent focus:outline-none text-gray-700"
            />
          </div>

          {/* Task List */}
          <AnimatePresence>
            <motion.ul layout className="space-y-4">
              {filteredTodos.map((todo) => (
                <motion.li
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  layout
                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 rounded-2xl border shadow-sm transition ${
                    todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'
                  }`}
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => toggleComplete(todo.id, todo.completed)}
                    className="flex items-center gap-2 group text-left"
                  >
                    {todo.completed ? (
                      <CheckCircle size={22} className="text-green-600" />
                    ) : (
                      <Circle size={22} className="text-gray-400 group-hover:text-indigo-400" />
                    )}
                    <span className={`text-lg font-medium break-words ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {todo.title}
                    </span>
                  </motion.button>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {todo.tag && (
                      <span className="flex items-center gap-1 text-gray-600 px-2 py-1 bg-gray-100 rounded-lg">
                        <Tag size={14} /> {todo.tag}
                      </span>
                    )}
                    {todo.due_date && (
                      <span className="flex items-center gap-1 text-gray-600 px-2 py-1 bg-gray-100 rounded-lg">
                        <Calendar size={14} />
                        {dayjs(todo.due_date).format('MMM D')}
                      </span>
                    )}
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => deleteTodo(todo.id)}>
                      <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }) {
  return (
    <div className={`rounded-2xl p-5 shadow-inner border border-gray-100 ${color} transition`}>
      <p className="text-sm font-medium mb-1">{label}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}








