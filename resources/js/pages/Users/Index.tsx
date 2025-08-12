import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { PageProps } from '@/types';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  contact?: string;
  address?: string;
  employee?: {
    area?: {
      location: string;
    };
  };
}

export default function Index() {
  const { users } = usePage<PageProps & { users: User[] }>().props;

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const confirmDelete = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      router.delete(route('users.destroy', selectedUser.id), {
        onFinish: () => {
          setShowModal(false);
          setSelectedUser(null);
        },
      });
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Daftar User
        </h1>

        <Link
          href={route('users.create')}
          className="inline-block mb-6 rounded-md bg-blue-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        >
          + Tambah User
        </Link>

        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
          <table className="w-full min-w-[600px] table-auto text-left text-sm text-gray-700 dark:text-gray-300">
           <thead className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 text-white">
              <tr>
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Area</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    Tidak ada data user.
                  </td>
                </tr>
              )}
              {users.map((user, i) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-5 py-3 font-medium">{i + 1}</td>
                  <td className="px-5 py-3">{user.name}</td>
                  <td className="px-5 py-3">{user.email}</td>
                  <td className="px-5 py-3 capitalize">{user.role}</td>
                  <td className="px-5 py-3">{user.employee?.area?.location ?? '-'}</td>
                  <td className="px-5 py-3 text-center space-x-2">
  <Link
    href={route('users.edit', user.id)}
    className="
      inline-block
      px-3
      py-1
      rounded-full
      bg-indigo-100
      text-indigo-700
      hover:bg-indigo-200
      font-semibold
      transition
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-400
    "
  >
    Edit
  </Link>
  <button
    onClick={() => confirmDelete(user)}
    className="
      inline-block
      px-3
      py-1
      rounded-full
      bg-red-100
      text-red-700
      hover:bg-red-200
      font-semibold
      transition
      focus:outline-none
      focus:ring-2
      focus:ring-red-400
    "
    aria-label={`Hapus user ${user.name}`}
  >
    Hapus
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ConfirmDeleteModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          itemName={selectedUser?.name ?? ''}
        />
      </div>
    </AppLayout>
  );
}
