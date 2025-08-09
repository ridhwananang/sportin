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
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Detail Booking</h1>
          <Link href="/bookings" className="text-sm text-blue-500 hover:underline">← Kembali</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-3">
          <p><strong>Kode Booking:</strong> {booking.kode_booking}</p>
          <p><strong>Nama Customer:</strong> {booking.customer_name}</p>
          <p><strong>Olahraga:</strong> {booking.sport?.name}</p>
          <p><strong>Area:</strong> {booking.area?.location}</p>
          <p><strong>Waktu:</strong> {booking.start_at} – {booking.end_at}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <p><strong>Status Pembayaran:</strong> {booking.payment_status}</p>
          <p><strong>Dibuat oleh:</strong> {booking.createdBy?.name}</p>
        </div>
      </div>
    </AppLayout>
  );
}
