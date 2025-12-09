
import React, { useState } from 'react';
import { ShowcaseItem, CategoryType, Expense } from '../types';
import { Plus, Check } from 'lucide-react';

interface ShowcaseProps {
  onAddExpense: (expense: Expense) => void;
}

// Updated Data specific to Indaiá's coastal/luxury vibe
const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 's1',
    title: 'Ilha Gastronômica: Frutos do Mar',
    description: 'Seleção premium com ostras frescas, camarões, ceviche e paella ao vivo.',
    category: CategoryType.VENUE,
    price: 3800,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's2',
    title: 'Decoração: Túnel de Luzes',
    description: 'Túnel iluminado instagramável para entrada dos noivos e fotos dos convidados.',
    category: CategoryType.DECOR,
    price: 2200,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's3',
    title: 'Bar Premium: Gin Experience',
    description: 'Estação exclusiva de Gin Tônica com especiarias e botânicos variados.',
    category: CategoryType.DRINK,
    price: 2900,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's4',
    title: 'Pista de Dança Personalizada',
    description: 'Adesivagem de piso com monograma do casal e design exclusivo.',
    category: CategoryType.DECOR,
    price: 1500,
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's5',
    title: 'Buffet da Madrugada: Mini Pizzas',
    description: 'Rodada de pizzas artesanais servidas em pranchas de madeira.',
    category: CategoryType.VENUE,
    price: 1600,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's6',
    title: 'Trio de Jazz para Coquetel',
    description: 'Música ao vivo elegante para o momento de recepção e pôr do sol.',
    category: CategoryType.MUSIC,
    price: 2800,
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's7',
    title: 'Lembrancinha: Suculentas',
    description: 'Mini suculentas em vasinhos de juta com tag de agradecimento.',
    category: CategoryType.EXTRA,
    price: 850,
    image: 'https://images.unsplash.com/photo-1459416493396-b4b947988bf5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's8',
    title: 'Fogos Indoor (Sparkles)',
    description: 'Efeito visual frio para a primeira dança ou corte do bolo.',
    category: CategoryType.EXTRA,
    price: 1200,
    image: 'https://images.unsplash.com/photo-1563293887-c10b7410c554?auto=format&fit=crop&q=80&w=800'
  }
];

export const Showcase: React.FC<ShowcaseProps> = ({ onAddExpense }) => {
  const [filter, setFilter] = useState<CategoryType | 'Todos'>('Todos');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const categories = ['Todos', ...Object.values(CategoryType)];

  const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const filteredItems = filter === 'Todos' 
    ? SHOWCASE_ITEMS 
    : SHOWCASE_ITEMS.filter(item => item.category === filter);

  const handleAddItem = (item: ShowcaseItem) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      name: item.title,
      amount: item.price,
      paid: 0,
      category: item.category,
      isCustom: true,
      notes: 'Adicionado via Vitrine Indaiá'
    };
    onAddExpense(newExpense);
    
    const newSet = new Set(addedItems);
    newSet.add(item.id);
    setAddedItems(newSet);
    
    // Reset visual feedback logic if needed, keeping simple for now
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0 animate-fade-in">
      
      {/* Hero Section of Showcase */}
      <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 shadow-xl">
        <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1600" 
            alt="Indaiá Eventos Atmosphere" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Vitrine Indaiá</h2>
            <p className="text-white/90 text-lg max-w-2xl font-light">
                Detalhes que transformam seu evento em uma experiência inesquecível. Explore nossos adicionais exclusivos.
            </p>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 no-scrollbar sticky top-0 bg-indaia-bg py-2 z-10 backdrop-blur-sm bg-opacity-95">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
              filter === cat 
                ? 'bg-indaia-green text-white border-indaia-green shadow-lg scale-105' 
                : 'bg-white text-gray-500 border-gray-200 hover:border-indaia-gold hover:text-indaia-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map(item => {
            const isAdded = addedItems.has(item.id);
            return (
                <div key={item.id} className="group bg-white rounded-xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-56 overflow-hidden">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-indaia-green uppercase tracking-wider shadow-sm">
                            {item.category}
                        </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                        <div className="flex-grow">
                            <h3 className="font-serif text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-indaia-gold transition-colors">{item.title}</h3>
                            <p className="text-gray-500 text-xs leading-relaxed mb-4">{item.description}</p>
                        </div>
                        
                        <div className="pt-4 border-t border-dashed border-gray-200 flex items-center justify-between mt-auto">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 uppercase">Investimento</span>
                                <span className="text-lg font-bold text-indaia-green">{formatCurrency(item.price)}</span>
                            </div>
                            <button 
                                onClick={() => handleAddItem(item)}
                                disabled={isAdded}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                                    isAdded 
                                    ? 'bg-green-100 text-green-700 cursor-default' 
                                    : 'bg-indaia-gold text-white hover:bg-indaia-green hover:scale-110'
                                }`}
                                title={isAdded ? "Item adicionado" : "Adicionar ao orçamento"}
                            >
                                {isAdded ? <Check size={18} /> : <Plus size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
