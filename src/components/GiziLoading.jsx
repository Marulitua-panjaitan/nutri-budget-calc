import { motion } from "framer-motion";

const GiziLoading = () => {
  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl h-full flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[350px]">
      {/* Pendaran Cahaya Neon Berputar di Background */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute w-40 h-40 bg-gradient-to-r from-neonCyan/20 to-neonGreen/20 rounded-full blur-2xl pointer-events-none"
      />

      {/* Ikon Gizi Utama dengan Efek Rotate & Pulse */}
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2.5, 
          ease: "easeInOut" 
        }}
        className="text-6xl mb-6 relative z-10 select-none filter drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
      >
        🧬
      </motion.div>

      {/* Teks Status */}
      <h3 className="text-xl font-bold text-neonCyan tracking-wide relative z-10 font-mono animate-pulse">
        MENGANALISIS GIZI
      </h3>
      
      <p className="text-gray-500 text-xs mt-3 font-mono max-w-xs relative z-10 leading-relaxed">
        Memproses rumus Mifflin-St Jeor & mensinkronisasi target makro ke dompet harian...
      </p>
    </div>
  );
};

export default GiziLoading;