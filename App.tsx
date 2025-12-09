
import React, { useState } from 'react';
import { ViewState, Expense, CategoryType, DashboardStats, Guest } from './types';
import { Dashboard } from './components/Dashboard';
import { BudgetTracker } from './components/BudgetTracker';
import { Assistant } from './components/Assistant';
import { Showcase } from './components/Showcase';
import { GuestList } from './components/GuestList';
import { LayoutDashboard, Wallet, Sparkles, Store, Settings, Users, Menu } from 'lucide-react';

// Mock Initial Data
const INITIAL_EXPENSES: Expense[] = [
  { id: '1', category: CategoryType.VENUE, name: 'Contrato Indaiá (Espaço + Buffet)', amount: 45000, paid: 15000, notes: 'Pago sinal de 30%' },
  { id: '2', category: CategoryType.DECOR, name: 'Pacote Floral Luxo', amount: 8500, paid: 0 },
  { id: '3', category: CategoryType.MUSIC, name: 'DJ & Iluminação Cênica', amount: 4200, paid: 4200 },
  { id: '4', category: CategoryType.PHOTO, name: 'Equipe de Fotografia', amount: 6800, paid: 1000 },
  { id: '5', category: CategoryType.DRINK, name: 'Bar de Drinks Extras', amount: 3500, paid: 0 },
];

const INITIAL_GUESTS: Guest[] = [
    { id: '1', name: 'Maria Silva', type: 'Adulto', side: 'Noiva', rsvp: 'Confirmado' },
    { id: '2', name: 'João Santos', type: 'Adulto', side: 'Noiva', rsvp: 'Confirmado' },
    { id: '3', name: 'Pedro Oliveira', type: 'Adulto', side: 'Noivo', rsvp: 'Pendente' },
    { id: '4', name: 'Ana Costa', type: 'Criança', side: 'Comum', rsvp: 'Pendente' },
    { id: '5', name: 'Lucas Pereira', type: 'Adulto', side: 'Noivo', rsvp: 'Recusado' },
];

const WEDDING_DATE = new Date('2024-12-14'); // Simulated date

export default function App() {
  const [view, setView] = useState<ViewState>('dashboard');
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);

  // Derived State
  const stats: DashboardStats = {
    totalBudget: expenses.reduce((acc, curr) => acc + curr.amount, 0),
    totalPaid: expenses.reduce((acc, curr) => acc + curr.paid, 0),
    totalPending: expenses.reduce((acc, curr) => acc + (curr.amount - curr.paid), 0),
    progress: 0,
    guestCount: guests.length,
    confirmedGuests: guests.filter(g => g.rsvp === 'Confirmado').length
  };
  stats.progress = (stats.totalPaid / stats.totalBudget) * 100;

  const daysUntil = Math.ceil((WEDDING_DATE.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  // Expense Handlers
  const handleUpdateExpense = (updated: Expense) => {
    setExpenses(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses(prev => [...prev, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Guest Handlers
  const handleAddGuest = (guest: Guest) => setGuests(prev => [...prev, guest]);
  const handleUpdateGuest = (updated: Guest) => setGuests(prev => prev.map(g => g.id === updated.id ? updated : g));
  const handleRemoveGuest = (id: string) => setGuests(prev => prev.filter(g => g.id !== id));

  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: <LayoutDashboard size={20} /> },
    { id: 'budget', label: 'Financeiro', icon: <Wallet size={20} /> },
    { id: 'guests', label: 'Lista de Convidados', icon: <Users size={20} /> },
    { id: 'planner', label: 'Vitrine Indaiá', icon: <Store size={20} /> },
    { id: 'assistant', label: 'Assistente IA', icon: <Sparkles size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-indaia-bg text-indaia-text font-sans antialiased flex flex-col md:flex-row">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-indaia-green text-white h-screen sticky top-0 overflow-y-auto z-50 shadow-2xl">
         <div className="p-8 pb-6">
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-3xl font-serif mb-4 border border-indaia-gold mx-auto shadow-inner">
                <span className="text-indaia-gold">A&P</span>
             </div>
             <div className="text-center">
                <h2 className="font-serif text-xl font-bold tracking-wide">Ana & Pedro</h2>
                <p className="text-xs text-white/60 uppercase tracking-widest mt-1">14 DEZ • Indaiá</p>
             </div>
         </div>
         
         <nav className="flex-1 px-4 space-y-1 mt-2">
             {menuItems.map(item => (
                 <button
                    key={item.id}
                    onClick={() => setView(item.id as ViewState)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                        view === item.id 
                        ? 'bg-white text-indaia-green font-bold shadow-lg translate-x-1' 
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                 >
                     <span className={view === item.id ? 'text-indaia-gold' : 'group-hover:text-indaia-gold transition-colors'}>
                        {item.icon}
                     </span>
                     <span>{item.label}</span>
                 </button>
             ))}
         </nav>

         <div className="p-6 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-white/50 hover:text-white transition-colors text-sm">
                <Settings size={18} />
                <span>Configurações</span>
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative">
         {/* Mobile Header */}
         <header className="md:hidden bg-white px-6 py-4 sticky top-0 z-30 shadow-sm flex justify-between items-center border-b border-stone-100">
            <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Planejador</p>
                <h1 className="text-xl font-serif font-bold text-indaia-green">Indaiá Eventos</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-indaia-green flex items-center justify-center text-white font-serif font-bold border-2 border-indaia-gold shadow-md">
                AP
            </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full pb-32 md:pb-8 overflow-x-hidden">
            {view === 'dashboard' && <Dashboard stats={stats} daysUntilWedding={daysUntil} onNavigate={setView} />}
            {view === 'budget' && (
                <BudgetTracker 
                    expenses={expenses} 
                    onUpdateExpense={handleUpdateExpense}
                    onAddExpense={handleAddExpense}
                    onDeleteExpense={handleDeleteExpense}
                />
            )}
            {view === 'guests' && (
                <GuestList 
                    guests={guests}
                    onAddGuest={handleAddGuest}
                    onUpdateGuest={handleUpdateGuest}
                    onRemoveGuest={handleRemoveGuest}
                />
            )}
            {view === 'assistant' && (
                <div className="max-w-3xl mx-auto">
                    <Assistant />
                </div>
            )}
            {view === 'planner' && (
                <Showcase onAddExpense={handleAddExpense} />
            )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2 flex justify-between items-end z-40 pb-safe shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        <NavButton 
          active={view === 'dashboard'} 
          onClick={() => setView('dashboard')} 
          icon={<LayoutDashboard size={22} />} 
          label="Início" 
        />
        <NavButton 
          active={view === 'budget'} 
          onClick={() => setView('budget')} 
          icon={<Wallet size={22} />} 
          label="Gastos" 
        />
        
        {/* Floating AI Button */}
        <div className="relative -top-5 mx-1">
            <button 
                onClick={() => setView('assistant')}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transform transition-transform ${
                    view === 'assistant' ? 'bg-indaia-gold scale-110 ring-4 ring-stone-50' : 'bg-indaia-green hover:scale-105'
                }`}
            >
                <Sparkles size={24} className="text-white" />
            </button>
        </div>

        <NavButton 
          active={view === 'guests'} 
          onClick={() => setView('guests')} 
          icon={<Users size={22} />} 
          label="Convidados" 
        />
        <NavButton 
          active={view === 'planner'} 
          onClick={() => setView('planner')} 
          icon={<Store size={22} />} 
          label="Vitrine" 
        />
      </nav>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-1 transition-all w-16 py-2 rounded-lg ${
        active ? 'text-indaia-green font-bold' : 'text-gray-400 hover:text-gray-600 hover:bg-stone-50'
    }`}
  >
    {icon}
    <span className="text-[10px] leading-none">{label}</span>
  </button>
);
