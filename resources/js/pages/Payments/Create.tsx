import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Booking, Discount } from '@/types';

interface Props extends PageProps {
  booking: Booking;
  discounts: Discount[];
  ppn: number;
  total: number;
}

export default function Create() {
  const { booking, discounts, ppn, total } = usePage<Props>().props;
  const [discountId, setDiscountId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      discount_id: discountId,
      ppn,
      total_amount: Math.round(total),
    };

    router.post(`/bookings/${booking.id}/payment`, payload);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pembayaran Booking</h1>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
          <strong>Kode Booking:</strong> {booking.kode_booking}<br />
          <strong>Nama:</strong> {booking.customer_name}<br />
          <strong>Olahraga:</strong> {booking.sport?.name || '-'}<br />
          <strong>Harga:</strong> Rp{booking.sport?.price?.toLocaleString() || '0'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Diskon (Opsional)</label>
            <select
              value={discountId || ''}
              onChange={(e) => setDiscountId(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">-- Tanpa Diskon --</option>
              {discounts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} - {d.percentage}%
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p>PPN (11%): <strong>Rp{ppn.toLocaleString()}</strong></p>
            <p>Total Bayar: <strong>Rp{total.toLocaleString()}</strong></p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md shadow"
          >
            Bayar Sekarang
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
