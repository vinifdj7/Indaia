
import React, { useState } from 'react';
import { Guest } from '../types';
import { Card } from './ui/Card';
import { Plus, Search, UserCheck, UserX, Users, Filter, Trash2, Check } from 'lucide-react';

interface GuestListProps {
  guests: Guest[];
  onAddGuest: (guest: Guest) => void;
  onUpdateGuest: (guest: Guest) => void;
  onRemoveGuest: (id: string) => void;
}

export const GuestList: React.FC<GuestListProps> = ({ guests, onAddGuest, onUpdateGuest, onRemoveGuest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRsvp, setFilterRsvp] = useState<'Todos' | 'Confirmado' | 'Pendente'>('Todos');
  const [isAdding, setIsAdding] = useState(false);

  // New Guest Form State
  const [newName, setNewName] = useState('');
  const [newSide, setNewSide] = useState<'Noiva' | 'Noivo' | 'Comum'>('Comum');
  const [newType, setNewType] = useState<'Adulto' | 'Criança'>('Adulto');

  const filteredGuests = guests.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRsvp === 'Todos' || g.rsvp === filterRsvp;
    return matchesSearch && matchesFilter;
  });

  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(g => g.rsvp === 'Confirmado').length;

  const handleAdd = () => {
    if (!newName) return;
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: newName,
      side: newSide,
      type: newType,
      rsvp: 'Pendente'
    };
    onAddGuest(newGuest);
    setNewName('');
    setIsAdding(false);
  };

  const toggleRSVP = (guest: Guest) => {
    const nextStatus = guest.rsvp === 'Pendente' ? 'Confirmado' : guest.rsvp === 'Confirmado' ? 'Recusado' : 'Confirmado';
    onUpdateGuest({ ...guest, rsvp: nextStatus });
  };

  return (
    <div className="space-y-6 pb-24 md:pb-0 animate-fade-in">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-serif text-3xl text-indaia-green font-bold">Lista de Convidados</h2>
          <p className="text-gray-500 mt-1">Gerencie presenças e organize as mesas.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indaia-green text-white px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-indaia-green/90 transition shadow-lg shadow-indaia-green/20"
        >
          <Plus size={18} /> Adicionar Convidado
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total</span>
            <div className="text-2xl font-serif font-bold text-gray-800 mt-1">{totalGuests}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Confirmados</span>
            <div className="text-2xl font-serif font-bold text-indaia-green mt-1">{confirmedGuests}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Pendentes</span>
            <div className="text-2xl font-serif font-bold text-indaia-gold mt-1">
                {guests.filter(g => g.rsvp === 'Pendente').length}
            </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Recusados</span>
            <div className="text-2xl font-serif font-bold text-red-400 mt-1">
                {guests.filter(g => g.rsvp === 'Recusado').length}
            </div>
        </div>
      </div>

      {/* Add Form */}
      {isAdding && (
        <Card className="animate-slide-down border-indaia-gold border-2 bg-stone-50">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-indaia-green font-serif">Novo Convidado</h3>
              <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" 
                placeholder="Nome completo"
                className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-indaia-gold"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <select 
                className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-indaia-gold"
                value={newSide}
                onChange={(e) => setNewSide(e.target.value as any)}
              >
                <option value="Comum">Amigos em Comum</option>
                <option value="Noiva">Lado da Noiva</option>
                <option value="Noivo">Lado do Noivo</option>
              </select>
              <button onClick={handleAdd} className="bg-indaia-green text-white py-3 rounded-lg font-bold hover:bg-indaia-green/90 transition">
                Salvar
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-2 rounded-xl border border-stone-200 shadow-sm">
         <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
                type="text" 
                placeholder="Buscar convidado..." 
                className="w-full pl-9 pr-4 py-2 bg-transparent text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-stone-100 pl-0 md:pl-4">
            {['Todos', 'Confirmado', 'Pendente'].map(status => (
                <button
                    key={status}
                    onClick={() => setFilterRsvp(status as any)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                        filterRsvp === status 
                        ? 'bg-stone-800 text-white' 
                        : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                    }`}
                >
                    {status}
                </button>
            ))}
         </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-100 hidden md:table-header-group">
                <tr>
                    <th className="p-4 font-serif font-bold text-indaia-green text-sm">Nome</th>
                    <th className="p-4 font-serif font-bold text-indaia-green text-sm">Categoria</th>
                    <th className="p-4 font-serif font-bold text-indaia-green text-sm text-center">Status</th>
                    <th className="p-4 font-serif font-bold text-indaia-green text-sm text-right">Ações</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
                {filteredGuests.map(guest => (
                    <tr key={guest.id} className="group hover:bg-stone-50/50 transition-colors flex flex-col md:table-row p-4 md:p-0">
                        <td className="md:p-4 pb-1 md:pb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                    guest.side === 'Noiva' ? 'bg-rose-300' : guest.side === 'Noivo' ? 'bg-blue-300' : 'bg-indaia-gold'
                                }`}>
                                    {guest.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{guest.name}</p>
                                    <p className="text-xs text-gray-400 md:hidden">{guest.side}</p>
                                </div>
                            </div>
                        </td>
                        <td className="md:p-4 pb-2 md:pb-4 text-sm text-gray-600 pl-11 md:pl-4">
                            <span className="inline-block md:hidden mr-2 text-xs font-bold">Categoria:</span>
                            {guest.side} • {guest.type}
                        </td>
                        <td className="md:p-4 pb-2 md:pb-4 text-center pl-11 md:pl-4 flex md:table-cell items-center gap-2">
                             <span className="md:hidden text-sm font-bold text-gray-600 w-20">Status:</span>
                             <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold w-fit ${
                                 guest.rsvp === 'Confirmado' ? 'bg-green-100 text-green-700' :
                                 guest.rsvp === 'Recusado' ? 'bg-red-100 text-red-700' :
                                 'bg-amber-100 text-amber-700'
                             }`}>
                                 {guest.rsvp === 'Confirmado' && <Check size={12} />}
                                 {guest.rsvp === 'Recusado' && <UserX size={12} />}
                                 {guest.rsvp === 'Pendente' && <Users size={12} />}
                                 {guest.rsvp}
                             </span>
                        </td>
                        <td className="md:p-4 flex justify-end gap-2 md:table-cell md:text-right pt-2 md:pt-4 border-t md:border-none mt-2 md:mt-0">
                            <button 
                                onClick={() => toggleRSVP(guest)}
                                className="p-2 text-gray-400 hover:text-indaia-green hover:bg-gray-100 rounded-lg transition-colors"
                                title="Alterar Status"
                            >
                                <UserCheck size={18} />
                            </button>
                            <button 
                                onClick={() => onRemoveGuest(guest.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remover"
                            >
                                <Trash2 size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filteredGuests.length === 0 && (
             <div className="text-center py-12 text-gray-400">
                <Filter size={48} className="mx-auto mb-4 opacity-20" />
                <p>Nenhum convidado encontrado.</p>
            </div>
        )}
      </div>
    </div>
  );
};
