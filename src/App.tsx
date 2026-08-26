import { useState } from 'react';
import type { View } from '@/types';
import { SettingsProvider } from '@/context/SettingsContext';
import { Sidebar } from '@/components/Sidebar';
import { PosScreen } from '@/components/screens/PosScreen';
import { ProductsScreen } from '@/components/screens/ProductsScreen';
import { ModifiersScreen } from '@/components/screens/ModifiersScreen';
import { BrandingScreen } from '@/components/screens/BrandingScreen';
import { DeliveryScreen } from '@/components/screens/DeliveryScreen';
import { PrintersScreen } from '@/components/screens/PrintersScreen';
import { ReceiptSettingsScreen } from '@/components/screens/ReceiptSettingsScreen';
import { FinanceScreen } from '@/components/screens/FinanceScreen';
import { TagsScreen } from '@/components/screens/TagsScreen';
import { UsersScreen } from '@/components/screens/UsersScreen';
import { ShiftsScreen } from '@/components/screens/ShiftsScreen';
import { ReportsScreen } from '@/components/screens/ReportsScreen';
import { AuditLogScreen } from '@/components/screens/AuditLogScreen';
import { BackupScreen } from '@/components/screens/BackupScreen';

function App() {
  const [view, setView] = useState<View>('pos');

  return (
    <SettingsProvider>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <Sidebar view={view} onNavigate={setView} />
        <main className="flex-1 overflow-hidden">
          {view === 'pos' && <PosScreen />}
          {view === 'products' && <ProductsScreen />}
          {view === 'modifiers' && <ModifiersScreen />}
          {view === 'branding' && <BrandingScreen />}
          {view === 'delivery' && <DeliveryScreen />}
          {view === 'printers' && <PrintersScreen />}
          {view === 'receipt-settings' && <ReceiptSettingsScreen />}
          {view === 'finance' && <FinanceScreen />}
          {view === 'tags' && <TagsScreen />}
          {view === 'users' && <UsersScreen />}
          {view === 'shifts' && <ShiftsScreen />}
          {view === 'reports' && <ReportsScreen />}
          {view === 'audit' && <AuditLogScreen />}
          {view === 'backup' && <BackupScreen />}
        </main>
      </div>
    </SettingsProvider>
  );
}

export default App;
