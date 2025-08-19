import React, { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import type { PageProps, Booking } from '@/types';

interface Props extends PageProps {
  bookings: Booking[];
  userRole: 'user' | 'admin' | 'super_admin' | 'employee';
}

export default function Index() {
  const { bookings, userRole } = usePage<Props>().props;

  const [selected, setSelected] = useState<Booking | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleDelete = (booking: Booking) => {
    setSelected(booking);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (!selected) return;
    router.delete(`/bookings/${selected.id}`, {
      onSuccess: () => {
        setOpen(false);
        setSelected(null);
      },
    });
  };

  // Filter berdasarkan kode_booking
  const filteredBookings = bookings.filter((b) =>
    b.kode_booking.toLowerCase().includes(search.toLowerCase())
  );

  // helper buat format tanggal & jam
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { dateStyle: 'short' });
  };

  const formatTime = (dateStr: string) => {
    let date = new Date(dateStr);

    // kalau jam = 00:00 tapi end_at aslinya '24:00:00', kasih label "24:00"
    const raw = dateStr.split(' ')[1]?.substring(0, 5); // "HH:MM"
    if (raw === '00:00' && date.getHours() === 0) {
      return '24:00';
    }

    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AppLayout>
      <div className="p-6 w-full mx-auto space-y-8">
        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {userRole === 'user' ? 'Booking Anda' : 'Semua Booking'}
          </h1>
          <input
            type="text"
            placeholder="Cari kode booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Data Booking */}
        {filteredBookings.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 italic select-none">
            Tidak ada booking ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-2">
                  {/* Badge kode_booking */}
                  <h2 className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 select-text">
                    #{b.kode_booking}
                  </h2>

                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Customer:</strong> {b.customer_name}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Olahraga:</strong> {b.sport?.name ?? '-'}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Area:</strong> {b.area?.location ?? '-'}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Tanggal:</strong> {formatDate(b.start_at)}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Waktu awal:</strong> {formatTime(b.start_at)} WIB
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Waktu akhir:</strong> {formatTime(b.end_at)} WIB
                  </p>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Harga:</strong> Rp{b.sport?.price?.toLocaleString() ?? '0'}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Status:</strong>{' '}
                    <span className="capitalize">{b.status}</span>
                  </p>
                </div>

                {/* Payment Status Button */}
                {b.payment_status === 'unpaid' ? (
                  <Link
                    href={`/bookings/${b.id}/payment/create`}
                    className="mt-5 block w-full py-2 bg-green-600 text-white text-center text-sm font-semibold rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                  >
                    💳 Bayar Sekarang
                  </Link>
                ) : (
                  <button
                    disabled
                    className="mt-5 block w-full py-2 bg-gray-400 text-white text-center text-sm font-semibold rounded-lg cursor-not-allowed select-none"
                    title="Sudah dibayar"
                  >
                    ✅ Sudah Dibayar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal Hapus */}
        <ConfirmDeleteModal
          show={open}
          onClose={() => setOpen(false)}
          onConfirm={confirmDelete}
          itemName={selected?.kode_booking || ''}
        />
      </div>
    </AppLayout>
  );
}
