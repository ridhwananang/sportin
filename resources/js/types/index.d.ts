import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin' | 'employee';
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface Area {
  id: number;
  location: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Sport {
  id: number;
  name: string;
  type: 'team' | 'individual';
  description?: string;
  price: number;
  image: string | null;
  active: boolean;
  areas: Area[]; // Relasi many-to-many
  created_at: string;
  updated_at: string;
}

export interface PageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      role: 'user' | 'admin' | 'super_admin' | 'employee';
    };
  };
  errors: Record<string, string>;
  [key: string]: unknown;
}

export interface Booking {
  id: number;
  customer_name: string;
  kode_booking: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'unpaid' | 'paid';
  start_at: string;
  end_at: string;
  created_by: number | null;
  user_id: number | null;
  sport_id: number;
  area_id: number;
  created_at: string;
  updated_at: string;

  sport?: Sport;
  area?: Area;
  user?: User;
  createdBy?: User;
}

export interface Discount {
  id: number;
  name: string;
  percentage: number; // persentase diskon, misalnya 10 untuk 10%
  created_at: string;
  updated_at: string;
}

