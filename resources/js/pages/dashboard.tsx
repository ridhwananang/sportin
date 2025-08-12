import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import type { PageProps, Sport, User } from '@/types';
import { FaEnvelope, FaPhone, FaLinkedin, FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";

interface Props extends PageProps {
  sports: Sport[];
  auth: {
    user: User;
  };
}

export default function Dashboard() {
  const { sports, auth } = usePage<Props>().props;
  const role = auth?.user?.role ?? '';
  const isSuperAdmin = role === 'super_admin';

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const handleDelete = (sport: Sport) => {
    setSelectedSport(sport);
    setModalOpen(true);
  };

  

  return (
    <AppLayout>
        <div
                className="relative min-h-screen flex flex-col bg-cover bg-center"
                style={{ backgroundImage: "url('/img/stadium.jpg')" }}
            >
                {/* Overlay efek gelap */}
                <div className="absolute inset-0 bg-black/40" />

            

                {/* Hero Section */}
                <div className="relative z-10 flex flex-col justify-center items-start text-left text-white px-6 md:px-20 pt-32 md:pt-40 max-w-2xl">
                    <h1 className="text-2xl md:text-6xl font-bold font-poppins">
                        YOUR DREAM <br /> IS OUR <span className="text-red-500">MOTIVATION</span>
                    </h1>
                    <p className="mt-4 text-xs md:text-base font-light font-inter leading-relaxed">
                        Play like a pro and get your degree. This is college sports. Welcome to the place where your dream of studying and playing at an American university comes to life. Join us and start your journey to excellence in academics and athletics.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 w-full font-inter">
                        <a
                            href="#"
                            className="flex-1 text-center px-4 py-2 md:px-6 md:py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 hover:scale-105 transition duration-300"
                        >
                            CHANGE YOUR LIFE NOW!
                        </a>
                        <a
                            href="#"
                            className="flex-1 text-center px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 hover:scale-105 transition duration-300"
                        >
                            QUALIFY FOR A SCHOLARSHIP
                        </a>
                    </div>
                </div>
            </div>
      <div className="p-6 max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
        </div>

        {sports.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium">
            Belum ada data olahraga.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sports.map((sport) => (
              <Link
                key={sport.id}
                href={`/sports/${sport.id}`}
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-md
                  hover:shadow-lg transition-shadow duration-300 overflow-hidden
                  focus:outline-none focus:ring-4 focus:ring-indigo-500"
              >
                {sport.image ? (
                  <img
                    src={`/storage/${sport.image}`}
                    alt={sport.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center
                    bg-gray-200 dark:bg-gray-700 text-gray-400 text-sm rounded-t-xl"
                  >
                    Tidak ada gambar
                  </div>
                )}

                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {sport.name}
                  </h2>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 min-h-[3rem]">
                    {sport.description || 'Tanpa Deskripsi'}
                  </p>
                </div>

                <div className="p-4 space-y-1 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Tipe:</span> {sport.type === 'team' ? 'Tim' : 'Individu'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Harga:</span> Rp{sport.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    <span className="font-medium">Area:</span>{' '}
                    {sport.areas?.length
                      ? sport.areas.map((a) => a.location).join(', ')
                      : 'Belum diatur'}
                  </p>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <footer className="bg-black text-white">
                      {/* Bagian Atas dengan Background Gradien */}
                      <div className="bg-gradient-to-b from-red-700 to-red-900 text-center py-16 px-6 relative overflow-hidden">
                          <h2 className="text-2xl md:text-4xl font-bold font-poppins">
                              Let’s make something <br className="hidden md:block"/> great together.
                          </h2>
                          <p className="mt-4 text-white/80 max-w-md mx-auto text-sm md:text-base font-inter">
                              Let us know what challenges you are trying to solve so we can help.
                          </p>
                          <a 
                              href="#"
                              className="mt-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white text-white hover:bg-white hover:text-red-700 transition duration-300"
                          >
                              →
                          </a>
                      </div>
      
                      {/* Bagian Tengah Footer */}
                      <div className="container mx-auto px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
                          {/* Logo dan Deskripsi */}
                          <div>
                              <h3 className="text-2xl font-bold font-poppins mb-4">Transparent</h3>
                              <p className="text-white/70 text-sm leading-relaxed">
                                  Fokus pada penyediaan solusi olahraga terpadu untuk komunitas Anda.
                              </p>
      
                              {/* Ikon Sosial Media */}
                              <div className="flex justify-center md:justify-start gap-4 mt-6 text-xl">
                                  <a href="#" className="hover:text-red-500 transition"><FaEnvelope /></a>
                                  <a href="#" className="hover:text-red-500 transition"><FaPhone /></a>
                                  <a href="#" className="hover:text-red-500 transition"><FaLinkedin /></a>
                                  <a href="#" className="hover:text-red-500 transition"><FaXTwitter /></a>
                                  <a href="#" className="hover:text-red-500 transition"><FaInstagram /></a>
                                  <a href="#" className="hover:text-red-500 transition"><FaFacebook /></a>
                              </div>
                          </div>
      
                          {/* Menu Navigasi */}
                          <div>
                              <h4 className="font-semibold mb-4">Company</h4>
                              <ul className="space-y-2 text-white/70 text-sm">
                                  <li><a href="#" className="hover:text-white transition">Home</a></li>
                                  <li><a href="#" className="hover:text-white transition">About Us</a></li>
                                  <li><a href="#" className="hover:text-white transition">Services</a></li>
                                  <li><a href="#" className="hover:text-white transition">Products</a></li>
                                  <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                              </ul>
                          </div>
      
                          {/* Menu Sosial Media */}
                          <div>
                              <h4 className="font-semibold mb-4">Social</h4>
                              <ul className="space-y-2 text-white/70 text-sm">
                                  <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                                  <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                                  <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                                  <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                              </ul>
                          </div>
      
                          {/* Legal */}
                          <div>
                              <h4 className="font-semibold mb-4">Legal</h4>
                              <ul className="space-y-2 text-white/70 text-sm">
                                  <li><a href="#" className="hover:text-white transition">Terms and Conditions</a></li>
                                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                                  <li><a href="#" className="hover:text-white transition">About Cookies</a></li>
                              </ul>
                          </div>
                      </div>
      
                      {/* Bagian Bawah Footer */}
                      <div className="border-t border-white/10 py-6 text-center text-white/50 text-xs px-6">
                          © 2025 Transparent. All rights reserved.
                      </div>
                  </footer>
    </AppLayout>
  );
}
