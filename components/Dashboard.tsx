
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DashboardStats } from '../types';
import { Card } from './ui/Card';
import { Calendar, Wallet, Heart, Users, ArrowRight, MapPin } from 'lucide-react';

interface DashboardProps {
  stats: DashboardStats;
  daysUntilWedding: number;
  onNavigate: (view: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, daysUntilWedding, onNavigate }) => {
  const data = [
    { name: 'Pago', value: stats.totalPaid },
    { name: 'Pendente', value: stats.totalPending },
  ];

  const COLORS = ['#C5A059', '#F3F4F6']; // Indaiá Gold vs Gray

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-0 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hero Section - Spans 2 columns on Desktop */}
        <div className="lg:col-span-2 relative bg-indaia-green rounded-3xl p-8 text-white overflow-hidden shadow-xl flex flex-col justify-between min-h-[280px]">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1519225468359-69632974a1d2?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-indaia-green via-indaia-green/90 to-transparent"></div>

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-4">
                        <Calendar size={12} />
                        Contagem Regressiva
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-1 tracking-tight">
                        {daysUntilWedding} <span className="text-2xl md:text-4xl font-sans font-light opacity-80">dias</span>
                    </h1>
                    <p className="text-white/80 font-serif text-lg italic max-w-md mt-2">
                        "O grande dia está chegando. Cada detalhe importa."
                    </p>
                </div>
                <div className="hidden md:block opacity-30">
                    <Heart size={120} strokeWidth={1} />
                </div>
            </div>
            
            <div className="relative z-10 mt-8 flex flex-col md:flex-row md:items-end gap-4 justify-between">
                <div className="flex items-center gap-4">
                     <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10">
                        <MapPin size={20} className="text-indaia-gold" />
                     </div>
                     <div>
                         <p className="font-bold text-white leading-tight">Indaiá Eventos</p>
                         <p className="text-white/60 text-xs">Lagoa da Conceição, Florianópolis</p>
                     </div>
                </div>
                <div className="flex -space-x-3">
                    <div className="w-12 h-12 rounded-full border-2 border-indaia-green bg-gray-200 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-indaia-green bg-gray-200 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-indaia-green bg-indaia-gold flex items-center justify-center text-indaia-green font-bold text-xs">
                        AP
                    </div>
                </div>
            </div>
        </div>

        {/* Financial Summary Card */}
        <Card className="flex flex-col justify-center h-full border-t-4 border-t-indaia-gold" title="Resumo Financeiro">
             <div className="flex-1 flex flex-col justify-center items-center py-4 relative">
                <div className="relative w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={4}
                            >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                            <Tooltip 
                                formatter={(value: number) => formatCurrency(value)}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-serif font-bold text-indaia-green">{Math.round(stats.progress)}%</span>
                        <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Pago</span>
                    </div>
                </div>
                <div className="w-full mt-6 space-y-3 px-4">
                    <div className="flex justify-between items-center text-sm p-3 bg-stone-50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-indaia-gold"></div>
                            Pago
                        </div>
                        <span className="font-bold text-gray-800">{formatCurrency(stats.totalPaid)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-3 bg-stone-50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            Pendente
                        </div>
                        <span className="font-bold text-gray-800">{formatCurrency(stats.totalPending)}</span>
                    </div>
                </div>
             </div>
        </Card>
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-0 hover:shadow-md transition-shadow cursor-pointer" noPadding>
            <div className="p-5" onClick={() => onNavigate('budget')}>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-indaia-lightgreen p-2 rounded-lg text-indaia-green">
                        <Wallet size={20} />
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Orçamento</span>
                </div>
                <span className="font-serif font-bold text-xl text-gray-800">{formatCurrency(stats.totalBudget)}</span>
            </div>
        </Card>
        
        <Card className="p-0 hover:shadow-md transition-shadow cursor-pointer" noPadding>
            <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                        <Calendar size={20} />
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Próx. Parcela</span>
                </div>
                <span className="font-serif font-bold text-xl text-gray-800">15 Out</span>
            </div>
        </Card>

        {/* Guests Card - Now dynamic and clickable */}
        <Card className="col-span-2 p-0 bg-indaia-bg border-indaia-gold/30 hover:border-indaia-gold transition-colors cursor-pointer" noPadding>
             <div className="p-5 flex items-center justify-between h-full" onClick={() => onNavigate('guests')}>
                 <div className="flex items-center gap-4">
                     <div className="bg-white p-3 rounded-full text-indaia-green shadow-sm">
                         <Users size={24} />
                     </div>
                     <div>
                         <h4 className="font-bold text-indaia-green font-serif text-lg">Lista de Convidados</h4>
                         <p className="text-sm text-gray-500">
                             <strong className="text-indaia-gold">{stats.confirmedGuests}</strong> confirmados de {stats.guestCount}
                         </p>
                     </div>
                 </div>
                 <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indaia-green shadow-sm hover:bg-indaia-green hover:text-white transition-colors">
                     <ArrowRight size={20} />
                 </button>
             </div>
        </Card>
      </div>
    </div>
  );
};
