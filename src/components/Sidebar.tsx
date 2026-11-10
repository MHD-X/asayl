import { useState } from 'react';
import type { View } from '@/types';
import { useSettings } from '@/context/SettingsContext';
import {
  ShoppingCart,
  UtensilsCrossed,
  Store,
  Truck,
  Printer,
  Clock,
  FileBarChart,
  ChefHat,
  Calculator,
  Tag,
  SlidersHorizontal,
  Users,
  Shield,
  DatabaseBackup,
  PanelRightClose,
  PanelRightOpen,
  Receipt,
  Menu,
  X,
} from 'lucide-react';

interface SidebarProps {
  view: View;
  onNavigate: (v: View) => void;
}

const navItems: { id: View; label: string; icon: typeof ShoppingCart }[] = [
  { id: 'pos', label: 'نقطة البيع', icon: ShoppingCart },
  { id: 'products', label: 'المنتجات', icon: UtensilsCrossed },
  { id: 'modifiers', label: 'الإضافات', icon: SlidersHorizontal },
  { id: 'branding', label: 'هوية الفاتورة', icon: Store },
  { id: 'delivery', label: 'مناطق التوصيل', icon: Truck },
  { id: 'printers', label: 'إعدادات الطباعة', icon: Printer },
  { id: 'receipt-settings', label: 'إعدادات الفاتورة', icon: Receipt },
  { id: 'finance', label: 'التحكم المالي', icon: Calculator },
  { id: 'tags', label: 'الوسوم', icon: Tag },
  { id: 'users', label: 'المستخدمون', icon: Users },
  { id: 'shifts', label: 'الورديات', icon: Clock },
  { id: 'reports', label: 'التقارير', icon: FileBarChart },
  { id: 'audit', label: 'سجل التدقيق', icon: Shield },
  { id: 'backup', label: 'نسخ احتياطي', icon: DatabaseBackup },
];

export function Sidebar({ view, onNavigate }: SidebarProps) {
  const { settings } = useSettings();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (v: View) => {
    onNavigate(v);
    setMobileOpen(false);
  };

  const navContent = (
    <nav className="flex-1 py-2 overflow-y-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = view === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 group relative ${
              active
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title={item.label}
          >
            {active && (
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-400 rounded-l-full" />
            )}
            <Icon size={22} className="flex-shrink-0" />
            <span className={`text-sm font-semibold ${collapsed ? 'lg:hidden' : ''} ${mobileOpen ? 'inline' : 'hidden lg:inline'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );

  const headerContent = (
    <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-800">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
        <ChefHat size={22} className="text-white" />
      </div>
      {!collapsed && (
        <div className="flex-1 min-w-0 hidden lg:block">
          <p className="font-bold text-sm leading-tight truncate">
            {settings.branding.name || 'نظام الكاشير'}
          </p>
          <p className="text-xs text-slate-400 truncate">نظام نقاط البيع</p>
        </div>
      )}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0 hidden lg:block"
        title={collapsed ? 'توسيع' : 'طي'}
      >
        {collapsed ? <PanelRightOpen size={18} /> : <PanelRightClose size={18} />}
      </button>
      <button
        onClick={() => setMobileOpen(false)}
        className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0 lg:hidden"
        title="إغلاق"
      >
        <X size={20} />
      </button>
    </div>
  );

  const footerContent = !collapsed && (
    <div className="px-4 py-3 border-t border-slate-800 hidden lg:block">
      <p className="text-xs text-slate-500">
        الكاشير: <span className="text-slate-300 font-semibold">{settings.cashierName || 'غير محدد'}</span>
      </p>
    </div>
  );

  return (
    <>
      {/* Mobile menu button - floating */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 right-3 z-40 w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        title="فتح القائمة"
      >
        <Menu size={22} />
      </button>

      {/* Mobile overlay drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 h-full animate-slide-up">
            {headerContent}
            {navContent}
            {footerContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } hidden lg:flex bg-slate-900 text-white flex-col flex-shrink-0 h-full transition-all duration-200`}
      >
        {headerContent}
        {navContent}
        {footerContent}
      </aside>
    </>
  );
}
