import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

// =========================================
// DATA HARDCODE
// =========================================
// Semua data di bawah ini belum dari database.
// Nanti jika ingin ambil dari database tinggal
// ganti array ini dengan props dari Inertia.
const fields = [
    {
        id: 1,
        name: 'Lapangan Mini Soccer Jagakarsa',
        price: 300000,
        rating: 4.98,
        city: 'Kota Jakarta Selatan',
        company: 'PT PUT',
        image: '/img/lapfootsal.jpg ', // gambar dari storage public
    },
    {
        id: 2,
        name: 'Lapangan Mini Soccer Jagakarsa',
        price: 300000,
        rating: 4.98,
        city: 'Kota Jakarta Selatan',
        company: 'PT PUT',
        image: '/img/lapfootsal.jpg ', // gambar dari storage public
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* GRID CARD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {fields.map((field) => (
                    <div
                        key={field.id}
                        className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        {/* FOTO LAPANGAN */}
                        <img
                            src={field.image}
                            alt=""
                            className="w-full h-48 object-cover"
                        />

                        {/* DETAIL LAPANGAN */}
                        <div className="p-4">
                            {/* Nama PT */}
                            <span className="text-xs bg-yellow-400 px-2 py-1 rounded-full font-semibold">
                                {field.company}
                            </span>

                            {/* Nama Lapangan */}
                            <h3 className="mt-2 font-semibold text-gray-800">
                                {field.name}
                            </h3>

                            {/* Rating & Kota */}
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                <span>⭐ {field.rating}</span>
                                <span>|</span>
                                <span>{field.city}</span>
                            </div>

                            {/* Harga */}
                            <div className="text-red-600 font-bold mt-2">
                                Rp.{field.price.toLocaleString('id-ID')}/sesi
                            </div>
                        </div>
                    </div>
                ))}
            </div>
           
        </AppLayout>
    );
}
