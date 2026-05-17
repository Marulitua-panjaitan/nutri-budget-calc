import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Deteksi efek scroll untuk mengubah gaya visual Navbar secara dinamis
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 select-none ${
        isScrolled
          ? "bg-darkBg/70 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
          : "bg-transparent border-b border-white/0 py-5"
      }`}
    >
      {/* Kontainer internal agar isi navbar tetap sejajar dengan grid konten App */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Sisi Kiri: Brand Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl">🥗</span>
          <span className="font-mono text-xs tracking-widest text-gray-400 uppercase">
            NutriBudget <span className="text-neonCyan font-bold">v1.0</span>
          </span>
        </div>

        {/* Sisi Kanan: Status Indikator Neon Online */}
        <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
          {/* Lampu Hijau Berkedip (Pulse) */}
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-neonGreen shadow-[0_0_8px_#10b981]"
          />
          <span className="text-[10px] font-mono tracking-wider text-gray-300 font-bold uppercase">
            Pantau Gizi & Dompet
          </span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;