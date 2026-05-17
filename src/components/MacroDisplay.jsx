import { motion } from "framer-motion";
import GiziLoading from "./GiziLoading";

// Tambahkan prop 'selectedFoods' (opsional, jika App.jsx mengirimi daftar objek makanan yang dipilih)
const MacroDisplay = ({ macroData, selectedTotals, selectedFoods = [], isLoading }) => {
  if (isLoading) {
    return <GiziLoading />;
  }

  if (!macroData) {
    return (
      <div className="glass-panel p-6 md:p-8 rounded-2xl h-full flex flex-col justify-center items-center text-center border border-dashed border-white/10 min-h-[350px]">
        <p className="text-4xl mb-4 opacity-40">📊</p>
        <h3 className="text-lg font-bold text-gray-400">Hasil Kalkulasi Gizi</h3>
        <p className="text-gray-500 text-sm max-w-xs mt-2 font-light">
          Isi data fisik Anda di panel sebelah kiri untuk melihat rincian kalori, target makro, dan grafik lingkaran nutrisi harian.
        </p>
      </div>
    );
  }

  const { calories, protein, carbs, fat, bmr } = macroData;

  const currentCalories = parseFloat(selectedTotals?.calories) || 0;
  const currentProtein = parseFloat(selectedTotals?.protein) || 0;
  const currentCarbs = parseFloat(selectedTotals?.carbs) || 0;
  const currentFat = parseFloat(selectedTotals?.fat) || 0;
  const currentTotalPrice = parseFloat(selectedTotals?.totalPrice) || 0; // Mengambil total harga belanjaan

  const totalCurrentMacros = currentProtein + currentCarbs + currentFat;

  const pProtein = totalCurrentMacros > 0 ? (currentProtein / totalCurrentMacros) * 100 : 33.3;
  const pCarbs = totalCurrentMacros > 0 ? (currentCarbs / totalCurrentMacros) * 100 : 33.3;
  const pFat = totalCurrentMacros > 0 ? (currentFat / totalCurrentMacros) * 100 : 33.4;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const strokeProtein = (pProtein / 100) * circumference;
  const strokeCarbs = (pCarbs / 100) * circumference;
  const strokeFat = (pFat / 100) * circumference;

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-glow-green flex flex-col justify-between h-full relative overflow-hidden">
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center gap-2 select-none">
          🍩 Ringkasan Nutrisi & Target
        </h2>

        {/* ROW 1: GRID GRAFIK LINGKARAN + BAR PROGRESS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
          {/* SISI KIRI: NATIVE SVG PIE CHART */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-36 h-36 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <motion.circle
                  cx="50" cy="50" r={radius} fill="transparent" stroke="#f59e0b" strokeWidth="12"
                  strokeDasharray={`${strokeProtein} ${circumference}`}
                  initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.circle
                  cx="50" cy="50" r={radius} fill="transparent" stroke="#06b6d4" strokeWidth="12"
                  strokeDasharray={`${strokeCarbs} ${circumference}`} strokeDashoffset={-strokeProtein}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
                />
                <motion.circle
                  cx="50" cy="50" r={radius} fill="transparent" stroke="#f43f5e" strokeWidth="12"
                  strokeDasharray={`${strokeFat} ${circumference}`} strokeDashoffset={-(strokeProtein + strokeCarbs)}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
                />
              </svg>
              <div className="absolute text-center select-none">
                <span className="block text-xl font-extrabold text-white font-mono">{currentCalories}</span>
                <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">Cal In</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-4 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-neonAmber">
                <span className="w-2 h-2 rounded-full bg-neonAmber shadow-[0_0_6px_#f59e0b]" /> P ({Math.round(pProtein)}%)
              </span>
              <span className="flex items-center gap-1.5 text-neonCyan">
                <span className="w-2 h-2 rounded-full bg-neonCyan shadow-[0_0_6px_#06b6d4]" /> K ({Math.round(pCarbs)}%)
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" /> L ({Math.round(pFat)}%)
              </span>
            </div>
          </div>

          {/* SISI KANAN: MONITOR DETEKSI PROGRESS BAR */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-gray-400 uppercase tracking-wide">🔥 Energi Total</span>
                <span className="text-white font-bold">{currentCalories} / <span className="text-neonGreen">{calories} Kcal</span></span>
              </div>
              <div className="w-full h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-neonGreen to-emerald-500 shadow-glow-green"
                  initial={{ width: 0 }} animate={{ width: `${Math.min((currentCalories / calories) * 100, 100)}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <p className="text-[10px] font-mono text-gray-500 mt-1 text-right">BMR Dasar: {bmr} Kcal</p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-neonAmber uppercase tracking-wide">🍗 Protein</span>
                <span className="text-white font-bold">{currentProtein}g / <span className="text-neonAmber">{protein}g</span></span>
              </div>
              <div className="w-full h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-neonAmber shadow-glow-amber" initial={{ width: 0 }} animate={{ width: `${Math.min((currentProtein / protein) * 100, 100)}%` }} transition={{ duration: 0.4 }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-neonCyan uppercase tracking-wide">🍚 Karbohidrat</span>
                <span className="text-white font-bold">{currentCarbs}g / <span className="text-neonCyan">{carbs}g</span></span>
              </div>
              <div className="w-full h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-neonCyan shadow-glow-cyan" initial={{ width: 0 }} animate={{ width: `${Math.min((currentCarbs / carbs) * 100, 100)}%` }} transition={{ duration: 0.4 }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-rose-400 uppercase tracking-wide">🥑 Lemak Sehat</span>
                <span className="text-white font-bold">{currentFat}g / <span className="text-rose-400">{fat}g</span></span>
              </div>
              <div className="w-full h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" initial={{ width: 0 }} animate={{ width: `${Math.min((currentFat / fat) * 100, 100)}%` }} transition={{ duration: 0.4 }} />
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: NEW FEATURE!! LIVE SHOPPING LIST & ESTIMASI BUDGET (Mengisi ruang kosong laptop/PC) */}
        <div className="mt-4 border-t border-white/5 pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
              🛒 Estimasi Dompet & Menu
            </h4>
            <span className="text-sm font-mono font-extrabold text-neonGreen shadow-glow-green">
              Rp {currentTotalPrice.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Box Container Transparan List Belanjaan */}
          <div className="bg-darkBg/30 border border-white/5 rounded-xl p-3 min-h-[90px] flex flex-col justify-center">
            {selectedFoods.length > 0 ? (
              <div className="max-h-[100px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                {selectedFoods.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] font-mono text-gray-300">
                    <span className="truncate max-w-[180px]">
                      {item.icon} {item.name} <span className="text-neonCyan">x{item.quantity}</span>
                    </span>
                    <span className="text-gray-400">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-gray-500 text-center font-light italic">
                Belum ada menu yang ditambahkan. Silakan klik + pada katalog makanan di bawah.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/5 pt-4 text-xs font-light text-gray-500 leading-relaxed">
        💡 <span className="font-medium text-gray-400">Strategi Ekonomis:</span> Fokus penuhi target <span className="text-neonAmber font-medium">Protein</span> terlebih dahulu dari sumber murah seperti telur dan tempe spon untuk menjaga massa otot saat diet.
      </div>
    </div>
  );
};

export default MacroDisplay;