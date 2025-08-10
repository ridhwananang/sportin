import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Booking } from '@/types';

interface Props extends PageProps {
  booking: Booking;
}

export default function Show() {
  const { booking } = usePage<Props>().props;

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Detail Booking
          </h1>
          <Link href="/bookings" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            ← Kembali
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold">Kode Booking:</p>
              <p>{booking.kode_booking}</p>
            </div>
            <div>
              <p className="font-semibold">Nama Customer:</p>
              <p>{booking.customer_name}</p>
            </div>
            <div>
              <p className="font-semibold">Olahraga:</p>
              <p>{booking.sport?.name || '-'}</p>
            </div>
            <div>
              <p className="font-semibold">Area:</p>
              <p>{booking.area?.location || '-'}</p>
            </div>
            <div>
              <p className="font-semibold">Waktu:</p>
              <p>{booking.start_at} – {booking.end_at}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p className="capitalize">{booking.status}</p>
            </div>
            <div>
              <p className="font-semibold">Status Pembayaran:</p>
              <p className="capitalize">{booking.payment_status}</p>
            </div>
            <div>
              <p className="font-semibold">Dibuat oleh:</p>
              <p>{booking.createdBy?.name || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
