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
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
          Pembayaran Booking
        </h1>
        <div className="mb-8 text-gray-700 dark:text-gray-300 space-y-2 text-base leading-relaxed">
          <p><strong>Kode Booking:</strong> <span className="font-mono text-indigo-600">{booking.kode_booking}</span></p>
          <p><strong>Nama:</strong> {booking.customer_name}</p>
          <p><strong>Olahraga:</strong> {booking.sport?.name || '-'}</p>
          <p><strong>Harga:</strong> <span className="text-green-600 font-semibold">Rp{booking.sport?.price?.toLocaleString() || '0'}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="discount"
              className="block mb-3 text-sm font-semibold text-gray-800 dark:text-gray-300"
            >
              Diskon (Opsional)
            </label>
            <select
              id="discount"
              value={discountId ?? ''}
              onChange={(e) =>
                setDiscountId(e.target.value ? parseInt(e.target.value) : null)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm
                focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500
                dark:bg-gray-800 dark:text-white dark:border-gray-600 transition duration-200"
            >
              <option value="">-- Tanpa Diskon --</option>
              {discounts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} - {d.percentage}%
                </option>
              ))}
            </select>
          </div>

          <div className="text-gray-900 dark:text-gray-200 text-lg space-y-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-5 shadow-inner border border-gray-200 dark:border-gray-700">
            <p>
              PPN (11%):{' '}
              <strong className="text-indigo-600">Rp{ppn.toLocaleString()}</strong>
            </p>
            <p>
              Total Bayar:{' '}
              <strong className="text-green-700 dark:text-green-400">Rp{total.toLocaleString()}</strong>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800
              text-white py-4 rounded-xl shadow-lg font-bold text-lg
              transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-green-500"
          >
            Bayar Sekarang
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
