import type { Order } from '@/types';
import { ORDER_TYPE_LABELS } from '@/types';
import { formatDateTime } from '@/utils/storage';
import { Modal, Button } from '@/components/ui/Modal';
import { Printer, X } from 'lucide-react';

interface KitchenTicketProps {
  order: Order;
  onClose: () => void;
}

export function KitchenTicket({ order, onClose }: KitchenTicketProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal open onClose={onClose} title="معاينة تذكرة المطبخ" size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            <X size={18} className="inline ml-1" />
            إلغاء
          </Button>
          <Button onClick={handlePrint}>
            <Printer size={18} className="inline ml-2" />
            طباعة
          </Button>
        </>
      }
    >
      <div className="flex justify-center print-wrapper">
        <div
          className="print-area thermal-receipt bg-white font-mono text-gray-900"
          dir="rtl"
          style={{ width: '80mm', padding: '4mm 3mm' }}
        >
          <div className="text-center mb-2">
            <p className="font-bold text-base">تذكرة المطبخ</p>
            <p className="font-bold text-lg mt-1">Order# {order.number}</p>
            <p className="text-xs text-gray-600 mt-0.5">{ORDER_TYPE_LABELS[order.type]}</p>
            {order.tableLabel && (
              <p className="text-xs text-gray-600">الطاولة: {order.tableLabel}</p>
            )}
            <p className="text-xs text-gray-500 mt-0.5">{formatDateTime(order.createdAt)}</p>
          </div>

          {/* Customer details for delivery/talabat orders */}
          {order.customer && (order.customer.name || order.customer.phone || order.customer.address) && (
            <div className="border-t border-dashed border-gray-400 pt-1.5 mb-1.5 space-y-0.5 text-xs">
              {order.customer.name && (
                <div className="flex justify-between">
                  <span>العميل:</span>
                  <span className="font-semibold">{order.customer.name}</span>
                </div>
              )}
              {order.customer.phone && (
                <div className="flex justify-between">
                  <span>الهاتف:</span>
                  <span className="font-semibold">{order.customer.phone}</span>
                </div>
              )}
              {order.customer.address && (
                <div className="flex justify-between">
                  <span>العنوان:</span>
                  <span className="font-semibold text-left">{order.customer.address}</span>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-dashed border-gray-400 pt-1.5 mb-1.5">
            {order.items.map((item, i) => (
              <div key={i} className="py-1 border-b border-dotted border-gray-200">
                <div className="flex text-sm font-bold">
                  <span className="w-10 text-center">{item.qty}x</span>
                  <span className="flex-1">{item.name}</span>
                </div>
                {item.note && (
                  <p className="text-xs text-gray-500 pr-2">* {item.note}</p>
                )}
                {item.modifiers?.map((mod, mi) => (
                  <div key={mi} className="flex text-xs text-gray-500 pr-2">
                    <span className="flex-1">+ {mod.optionName}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
