    import { motion } from "framer-motion";

const WelcomeLoading = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-[#070a13] flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Efek Ornamen Latar Belakang Menyala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neonCyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-neonGreen/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Konten Utama Animasi */}
      <div className="text-center relative z-10 flex flex-col items-center">
        {/* Ikon Utama Bergerak */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-5xl mb-6 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
        >
          🧬
        </motion.div>

        {/* Judul Web Menyala Gradasi */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-black tracking-widest text-white mb-2 font-mono"
        >
          NUTRI<span className="bg-gradient-to-r from-neonCyan to-neonGreen bg-clip-text text-transparent">BUDGET</span>
        </motion.h1>

        {/* Teks Subtitle ruliDesign */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-mono mb-6"
        >
          Initializing ruliDesign Engine
        </motion.p>

        {/* Bar Progress Loading Minimalis */}
        <div className="w-48 h-[3px] bg-white/5 border border-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-neonCyan to-neonGreen shadow-[0_0_8px_#06b6d4]"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeLoading;