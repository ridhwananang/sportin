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

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {userRole === 'user' ? 'Booking Anda' : 'Semua Booking'}
          </h1>
          <input
            type="text"
            placeholder="Cari kode booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Data Booking */}
        {filteredBookings.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Tidak ada booking ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  {/* Badge kode_booking */}
                  <h2 className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    #{b.kode_booking}
                  </h2>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Customer:</strong> {b.customer_name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Olahraga:</strong> {b.sport?.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Area:</strong> {b.area?.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Waktu:</strong> {b.start_at} – {b.end_at}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Status:</strong> <span className="capitalize">{b.status}</span>
                  </p>
                </div>

                {/* Aksi */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link href={`/bookings/${b.id}`} className="text-sm text-blue-600 hover:underline">
                    Detail
                  </Link>
                  {userRole !== 'user' && (
                    <>
                      <Link href={`/bookings/${b.id}/edit`} className="text-sm text-yellow-600 hover:underline">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(b)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </div>

                {/* Status pembayaran */}
                {b.payment_status === 'unpaid' ? (
                  <Link
                    href={`/bookings/${b.id}/payment/create`}
                    className="mt-4 w-full py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 text-center"
                  >
                    💳 Bayar Sekarang
                  </Link>
                ) : (
                  <button
                    disabled
                    className="mt-4 w-full py-2 bg-gray-400 text-white text-sm rounded cursor-not-allowed"
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
