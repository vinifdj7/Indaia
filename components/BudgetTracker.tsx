import React, { useState } from 'react';
import { Expense, CategoryType } from '../types';
import { Card } from './ui/Card';
import { Plus, Trash2, Edit2, Check, Filter, Search } from 'lucide-react';

interface BudgetTrackerProps {
  expenses: Expense[];
  onUpdateExpense: (expense: Expense) => void;
  onAddExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ expenses, onUpdateExpense, onAddExpense, onDeleteExpense }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'Todos'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<CategoryType>(CategoryType.DECOR);

  const categories = ['Todos', ...Object.values(CategoryType)];

  const filteredExpenses = expenses.filter(e => {
    const matchesCategory = activeCategory === 'Todos' || e.category === activeCategory;
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleAdd = () => {
    if (!newExpenseName || !newExpenseAmount) return;
    const newExpense: Expense = {
      id: Date.now().toString(),
      name: newExpenseName,
      amount: parseFloat(newExpenseAmount),
      paid: 0,
      category: newExpenseCategory,
      isCustom: true
    };
    onAddExpense(newExpense);
    setIsAdding(false);
    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  const togglePaid = (expense: Expense) => {
    const newPaid = expense.paid >= expense.amount ? 0 : expense.amount;
    onUpdateExpense({ ...expense, paid: newPaid });
  };

  return (
    <div className="pb-24 md:pb-0 space-y-6 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="font-serif text-3xl text-indaia-green font-bold">Gestão Financeira</h2>
            <p className="text-gray-500 mt-1 hidden md:block">Acompanhe cada detalhe do seu investimento.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Buscar item..." 
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indaia-gold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button 
                onClick={() => setIsAdding(!isAdding)}
                className="bg-indaia-green text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indaia-green/90 transition shadow-sm whitespace-nowrap"
                >
                <Plus size={16} /> <span className="hidden md:inline">Adicionar Item</span> <span className="md:hidden">Novo</span>
            </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar border-b border-gray-100/50 md:border-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-indaia-gold text-white shadow-md' 
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add Form */}
      {isAdding && (
        <Card className="animate-slide-down border-indaia-gold border-2 bg-stone-50">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-indaia-green font-serif">Novo Investimento</h3>
                    <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        placeholder="Nome do item (ex: Docinhos extras)"
                        className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-indaia-gold"
                        value={newExpenseName}
                        onChange={(e) => setNewExpenseName(e.target.value)}
                    />
                    <select 
                        className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-indaia-gold"
                        value={newExpenseCategory}
                        onChange={(e) => setNewExpenseCategory(e.target.value as CategoryType)}
                    >
                        {Object.values(CategoryType).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input 
                        type="number" 
                        placeholder="Valor R$"
                        className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-indaia-gold"
                        value={newExpenseAmount}
                        onChange={(e) => setNewExpenseAmount(e.target.value)}
                    />
                    <button onClick={handleAdd} className="bg-indaia-green text-white py-3 rounded-lg font-bold hover:bg-indaia-green/90 transition">
                        Confirmar
                    </button>
                </div>
            </div>
        </Card>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                    <th className="p-4 font-serif font-bold text-indaia-green">Item</th>
                    <th className="p-4 font-serif font-bold text-indaia-green">Categoria</th>
                    <th className="p-4 font-serif font-bold text-indaia-green text-right">Valor Total</th>
                    <th className="p-4 font-serif font-bold text-indaia-green text-center">Status</th>
                    <th className="p-4 font-serif font-bold text-indaia-green text-right">Ações</th>
                </tr>
            </thead>
            <tbody>
                {filteredExpenses.map(expense => {
                     const isPaid = expense.paid >= expense.amount;
                     return (
                        <tr key={expense.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                            <td className="p-4 font-medium text-gray-800">{expense.name}</td>
                            <td className="p-4">
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wide">
                                    {expense.category}
                                </span>
                            </td>
                            <td className="p-4 text-right font-bold text-gray-700">{formatCurrency(expense.amount)}</td>
                            <td className="p-4 text-center">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                    isPaid ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {isPaid ? <Check size={12} /> : null}
                                    {isPaid ? 'Pago' : 'Pendente'}
                                </span>
                            </td>
                            <td className="p-4 flex justify-end gap-2">
                                <button 
                                    onClick={() => togglePaid(expense)}
                                    className="p-2 text-gray-400 hover:text-indaia-green hover:bg-gray-100 rounded-lg transition-colors" 
                                    title="Alternar Pagamento"
                                >
                                    <Check size={18} />
                                </button>
                                {expense.isCustom && (
                                    <button 
                                        onClick={() => onDeleteExpense(expense.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remover"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </td>
                        </tr>
                     );
                })}
            </tbody>
        </table>
        {filteredExpenses.length === 0 && (
            <div className="text-center py-16 text-gray-400">
                <Filter size={48} className="mx-auto mb-4 opacity-20" />
                <p>Nenhum item encontrado.</p>
            </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {filteredExpenses.map(expense => {
            const isPaid = expense.paid >= expense.amount;
            const percentage = Math.min(100, (expense.paid / expense.amount) * 100);

            return (
                <div key={expense.id} className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{expense.category}</span>
                            <h4 className="font-bold text-gray-800 text-lg">{expense.name}</h4>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-gray-800">{formatCurrency(expense.amount)}</span>
                            <span className={`text-xs font-medium ${isPaid ? 'text-green-600' : 'text-orange-500'}`}>
                                {isPaid ? 'Totalmente Pago' : `Restam ${formatCurrency(expense.amount - expense.paid)}`}
                            </span>
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 ${isPaid ? 'bg-indaia-green' : 'bg-indaia-gold'}`} 
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end pt-3 border-t border-gray-50 mt-1">
                         {expense.isCustom && (
                             <button onClick={() => onDeleteExpense(expense.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                 <Trash2 size={18} />
                             </button>
                         )}
                         <button 
                            onClick={() => togglePaid(expense)}
                            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                                isPaid 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                         >
                             {isPaid ? <><Check size={16} /> Pago</> : 'Marcar Pago'}
                         </button>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
