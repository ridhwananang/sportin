import React from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface ReportPerHari {
  tanggal: string;
  total: number;
}

interface ReportPerBulan {
  tahun: number;
  bulan: number;
  total: number;
}

interface ReportPerSport {
  sport_name: string;
  total: number;
}

interface ReportPerArea {
  area_name: string;
  total: number;
}

interface RekapOlahraga {
  total: number;
  sport_name: string;
  address_name: string; // Assuming this is the address field
  area_name: string;
  price: number;
}


interface ReportPerPpn {
  total: number;
}

interface RekapOlahragaPerhari {
  total: number;
  tanggal: string;
  sport_name: string;
  area_name: string;
  address_name: string; // Assuming this is the address field
  price: number;
}

interface Props extends PageProps {
  perHari: ReportPerHari[];
  perBulan: ReportPerBulan[];
  perSport: ReportPerSport[];
  perArea: ReportPerArea[];
  totalKeseluruhan: number;
  rekapOlahraga: RekapOlahraga[];
  totalPpn: number;
  rekapOlahragaPerhari: RekapOlahragaPerhari[];
}

export default function FinanceIndex() {
  const { perHari, perBulan, perSport, perArea, totalKeseluruhan, rekapOlahraga, totalPpn, rekapOlahragaPerhari } =
    usePage<Props>().props;

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num);

  const sectionStyle =
    'bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition hover:shadow-xl';

  const renderTable = (
    title: string,
    headers: string[],
    rows: { key: string; value: number }[]
  ) => (
    <div className={sectionStyle}>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-3">{headers[0]}</th>
              <th className="px-4 py-3 text-right">{headers[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    {row.key}
                  </td>
                  <td className="px-4 py-2 text-right border-t border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-gray-100">
                    {formatRupiah(row.value)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <AppLayout>
      <div className="p-6 w-full mx-auto space-y-12">
        <div
  className="
    w-full
    p-6
    rounded-xl
    shadow-lg
    bg-white
    dark:bg-gray-800
    transition-transform
    duration-200
    hover:scale-102
    hover:shadow-2xl
  "
>
  <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
    Laporan dan Grafik
  </h1>
</div>


        {/* Total Keseluruhan */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-2xl p-8 max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold">Total Keseluruhan</h2>
          <p className="text-5xl font-extrabold mt-3 drop-shadow-lg">
            {formatRupiah(totalKeseluruhan)}
          </p>
        </div>

        {/* Charts full width stacked */}
        <section className={sectionStyle + ' p-6'}>
          <h2 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
            Grafik Per Bulan
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={perBulan}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey={(d) => `${d.bulan}/${d.tahun}`}
                stroke="#4b5563"
                tick={{ fontSize: 12, fill: '#374151' }}
              />
              <YAxis
                stroke="#4b5563"
                tick={{ fontSize: 11, fill: '#374151' }}
                tickFormatter={(value) => formatRupiah(value)}
              />
              <Tooltip
                formatter={(value: number) => formatRupiah(value)}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  border: 'none',
                }}
                itemStyle={{ color: '#f9fafb' }}
              />
              <Legend />
              <Bar dataKey="total" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className={sectionStyle + ' p-6'}>
          <h2 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
            Grafik Per Olahraga
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={perSport}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="sport_name"
                stroke="#4b5563"
                tick={{ fontSize: 12, fill: '#374151' }}
              />
              <YAxis
                stroke="#4b5563"
                tick={{ fontSize: 11, fill: '#374151' }}
                tickFormatter={(value) => formatRupiah(value)}
              />
              <Tooltip
                formatter={(value: number) => formatRupiah(value)}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  border: 'none',
                }}
                itemStyle={{ color: '#f9fafb' }}
              />
              <Legend />
              <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Tables grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            {renderTable(
              'Per Hari',
              ['Tanggal', 'Total'],
              perHari.map((row) => ({ key: row.tanggal, value: row.total }))
            )}
            {renderTable(
              'Per Bulan',
              ['Bulan', 'Total'],
              perBulan.map((row) => ({ key: `${row.bulan}/${row.tahun}`, value: row.total }))
            )}
          </div>

          <div className="space-y-8">
            {renderTable(
              'Per Olahraga',
              ['Olahraga', 'Total'],
              perSport.map((row) => ({ key: row.sport_name, value: row.total }))
            )}
            {renderTable(
              'Per Area',
              ['Area', 'Total'],
              perArea.map((row) => ({ key: row.area_name, value: row.total }))
            )}
          </div>
        </div>

        {/* Rekap Olahraga */}
        <div className={sectionStyle}>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            Rekap Olahraga
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    Total
                  </th>
                  <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    Olahraga
                  </th>
                  <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    Area
                  </th>
                  <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    Alamat
                  </th>
                  <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    Income
                  </th>
                </tr>
              </thead>
              <tbody>
                {rekapOlahraga.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  rekapOlahraga.map((r, i) => (
                    <tr
                      key={i}
                      className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center font-medium">
                        {r.total}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                        {r.sport_name}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                        {r.area_name}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                        {r.address_name} {/* Assuming area_name is the address */}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                        {formatRupiah(r.price)} {/* Assuming price is the field for price */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Rekap Olahraga Per Hari */}
<div className={sectionStyle}>
  <h2 className="text-lg font-semibold text-gray-800 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
    Rekap Olahraga Per Hari
  </h2>
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">Tanggal</th>
          <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">Total</th>
          <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">Olahraga</th>
          <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">Area</th>
          <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">Alamat</th>
          <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-right">Income</th>
        </tr>
      </thead>
      <tbody>
        {rekapOlahragaPerhari.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">
              Tidak ada data
            </td>
          </tr>
        ) : (
          rekapOlahragaPerhari.map((r, i) => (
            <tr key={i} className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center font-medium">
                {r.tanggal}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center font-medium">
                {r.total}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">{r.sport_name}</td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">{r.area_name}</td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">{r.address_name}</td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatRupiah(r.price)}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
        {/* Total PPN Section */}
<div className={sectionStyle}>
  <h2 className="text-lg font-semibold text-gray-800 dark:text-white px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
    Total PPN (11%)
  </h2>
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-left">
            Keterangan
          </th>
          <th className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-right">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 font-medium">
            PPN 11% dari seluruh booking
          </td>
          <td className="px-4 py-2 text-right border-t border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-100">
            {formatRupiah(totalPpn)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


      </div>
    </AppLayout>
  );
}
