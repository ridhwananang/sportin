import { Head, Link } from '@inertiajs/react';
import { FaEnvelope, FaPhone, FaLinkedin, FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";


export default function Welcome() {
    return (
        <>
            <Head/>
            <div
                className="relative min-h-screen flex flex-col bg-cover bg-center"
                style={{ backgroundImage: "url('/img/stadium.jpg')" }}
            >
                {/* Overlay efek gelap */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Navbar selalu di atas */}
                <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-3 md:p-6 backdrop-blur-sm bg-black/30">
                    {/* Logo SPORT IN */}
                    <div className="flex items-center gap-2 md:gap-3 text-white font-poppins text-xl md:text-3xl font-bold">
                        <img
                            src="/img/iconrun.png"
                            alt="Runner Icon"
                            className="w-10 h-10 md:w-16 md:h-16 object-contain"
                        />
                        <div className="relative leading-none">
                            <span className="block tracking-wider">SPORT</span>
                            <span className="absolute left-[28%] text-yellow-400">IN</span>
                        </div>
                    </div>

                    {/* Tombol Login & Register */}
                    <div className="flex gap-2 md:gap-3 font-inter text-xs md:text-base">
                        <Link
                            href={route('login')}
                            className="px-4 py-1.5 md:px-5 md:py-2 bg-white text-red-600 font-semibold rounded-full shadow hover:shadow-lg hover:scale-105 transition duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            href={route('register')}
                            className="px-4 py-1.5 md:px-5 md:py-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-full shadow hover:shadow-lg hover:scale-105 transition duration-300"
                        >
                            Register
                        </Link>
                    </div>
                </header>

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

            {/* Section: Choose Your Favorite Sport */}
            <section className="bg-black py-16 mt-16 overflow-hidden">
                <h2 className="text-center font-poppins text-2xl md:text-4xl font-bold text-white">
                    CHOOSE YOUR FAVORITE SPORT
                </h2>
                <p className="text-center text-white/70 mt-2 font-inter text-xs md:text-base">
                    Discover a variety of sports and start your journey today.
                </p>

                {/* Slider Icon Olahraga */}
                {[
                    { dir: "right" },
                    { dir: "left" },
                ].map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={`flex gap-4 md:gap-6 mt-8 md:mt-12 px-4 md:px-6 w-max animate-scroll-${row.dir}`}
                    >
                        {[
                            "/img/footbal.png",
                            "/img/handball.png",
                            "/img/volly.png",
                            "/img/sodok.png",
                            "/img/badminton.png",
                            "/img/arcer.png",
                            "/img/gamer.png",
                            "/img/balet.png",
                        ].map((src, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-40 h-28 md:w-64 md:h-40 rounded-2xl bg-gradient-to-br 
                                        from-gray-800 to-gray-900 overflow-hidden shadow-lg flex items-center 
                                        justify-center group mx-1 md:mx-2"
                            >
                                <img
                                    src={src}
                                    alt={`Sport ${index}`}
                                    className="w-[80%] h-[80%] object-contain transform transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        ))}

                        {/* Duplikat agar scroll mulus */}
                        {[
                            "/img/footbal.png",
                            "/img/handball.png",
                            "/img/volly.png",
                            "/img/sodok.png",
                            "/img/badminton.png",
                            "/img/arcer.png",
                            "/img/gamer.png",
                            "/img/balet.png",
                        ].map((src, index) => (
                            <div
                                key={`dup-${index}`}
                                className="flex-shrink-0 w-40 h-28 md:w-64 md:h-40 rounded-2xl bg-gradient-to-br 
                                        from-gray-800 to-gray-900 overflow-hidden shadow-lg flex items-center 
                                        justify-center group mx-1 md:mx-2"
                            >
                                <img
                                    src={src}
                                    alt={`Sport ${index}`}
                                    className="w-[80%] h-[80%] object-contain transform transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                ))}

                {/* Section Bawah */}
                <div className="mt-20 px-6 md:px-20 text-center text-white font-inter">
                    <h3 className="text-xl md:text-3xl font-bold text-yellow-400">
                        LEVEL UP YOUR GAME
                    </h3>

                    <div className="mt-6 flex justify-center">
                        <a
                            href="#"
                            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full font-semibold shadow hover:shadow-lg hover:scale-105 transition duration-300"
                        >
                            JOIN NOW
                        </a>
                    </div>
                </div>

                {/* CSS */}
                <style>{`
                    @keyframes scroll-right {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes scroll-left {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0); }
                    }
                    .animate-scroll-right {
                        animation: scroll-right 25s linear infinite;
                    }
                    .animate-scroll-left {
                        animation: scroll-left 25s linear infinite;
                    }
                    .animate-scroll-right:hover, .animate-scroll-left:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </section>

            <section className="bg-black py-24 md:py-32 relative"> {/* PT PUT */}
                <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">

                    {/* Foto PT PUT dengan pembatas ukuran */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="max-w-sm md:max-w-md w-full"> 
                            <img
                                src="/img/ptput.jpg"
                                alt="PT PUT"
                                className="rounded-2xl shadow-xl w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* Deskripsi PT PUT */}
                    <div className="w-full md:w-1/2 text-center md:text-left font-inter">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-poppins">
                            PT PUT (Pengelola Tempat Olahraga Terpadu)
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                            PT PUT adalah perusahaan yang berfokus pada pengelolaan tempat olahraga
                            modern dan berbagai macam fasilitas sport. Kami menyediakan sarana untuk
                            mendukung komunitas olahraga, mulai dari sepak bola, voli, badminton,
                            hingga aktivitas rekreasi seperti panahan dan skate. Visi kami adalah
                            menghadirkan pengalaman olahraga terbaik bagi seluruh kalangan.
                        </p>

                        {/* Tombol Learn More */}
                        <a
                            href="#"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full font-semibold shadow hover:shadow-lg hover:scale-105 transition duration-300"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

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

        </>
    );
}


