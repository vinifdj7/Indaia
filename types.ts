
export interface Expense {
  id: string;
  category: CategoryType;
  name: string;
  amount: number;
  paid: number;
  dueDate?: string;
  notes?: string;
  isCustom?: boolean;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  price: number;
  image: string;
}

export interface Guest {
  id: string;
  name: string;
  type: 'Adulto' | 'Criança' | 'Bebê';
  side: 'Noiva' | 'Noivo' | 'Comum';
  rsvp: 'Pendente' | 'Confirmado' | 'Recusado';
  table?: string;
}

export enum CategoryType {
  VENUE = 'Espaço & Buffet',
  DECOR = 'Decoração',
  DRINK = 'Bebidas',
  MUSIC = 'Música & Iluminação',
  PHOTO = 'Foto & Vídeo',
  EXTRA = 'Extras',
}

export interface DashboardStats {
  totalBudget: number;
  totalPaid: number;
  totalPending: number;
  progress: number;
  guestCount: number;
  confirmedGuests: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'dashboard' | 'budget' | 'planner' | 'assistant' | 'guests';
