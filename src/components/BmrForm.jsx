import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Tambah AnimatePresence buat animasi modal keluar-masuk

const BmrForm = ({ onCalculate, isLoading }) => {
  const [formData, setFormData] = useState({
    gender: "male",
    weight: "",
    height: "",
    age: "",
    activity: "sedentary",
    goal: "maintain",
    customFun: null,
  });

  // State untuk mengontrol Custom Alert Modern
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    themeColor: "from-neonCyan to-blue-500", // Default gradient color
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "gender" ? { customFun: null } : {})
    }));
  };

  // Fungsi pembantu untuk memicu custom alert
  const triggerAlert = (title, message, themeColor) => {
    setAlertConfig({
      isOpen: true,
      title,
      message,
      themeColor,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.weight || !formData.height || !formData.age) {
      triggerAlert(
        "⚠️ Data Belum Lengkap", 
        "Harap isi semua data fisik (Berat, Tinggi, dan Umur) terlebih dahulu sebelum menghitung gizi!",
        "from-amber-500 to-orange-600"
      );
      return;
    }
    
    onCalculate({
      gender: formData.gender,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      age: parseInt(formData.age),
      activity: formData.activity,
      goal: formData.goal,
    });
  };

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-glow-cyan relative">
      <h2 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        🧬 Data Fisik & Target
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Toggle Gender - RuliDesign Ultimate Have Fun Version */}
        <div>
          <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Jenis Kelamin</label>
          <div className="flex flex-wrap gap-2">
            
            {/* 1. PRIA */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setFormData(prev => ({ ...prev, gender: "male", customFun: null }))}
              className={`flex-1 min-w-[100px] py-3 rounded-xl font-medium border text-xs transition-all duration-300 ${formData.gender === "male" && !formData.customFun ? "bg-neonCyan/20 border-neonCyan text-neonCyan shadow-glow-cyan" : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"}`}
            >
              🙋‍♂️ Pria
            </button>

            {/* 2. WANITA */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setFormData(prev => ({ ...prev, gender: "female", customFun: null }))}
              className={`flex-1 min-w-[100px] py-3 rounded-xl font-medium border text-xs transition-all duration-300 ${formData.gender === "female" && !formData.customFun ? "bg-neonCyan/20 border-neonCyan text-neonCyan shadow-glow-cyan" : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"}`}
            >
              🙋‍♀️ Wanita
            </button>

            {/* 3. BOTI */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                setFormData(prev => ({ ...prev, gender: "male", customFun: "boti" }));
                triggerAlert(
                  "🤙 Mode Boti Aktif",
                  "Kebutuhan gizi disesuaikan dengan energi buat rumpi dan merepet-repet gajelas wkwkkwk.",
                  "from-neonAmber to-orange-500"
                );
              }}
              className={`flex-1 min-w-[100px] py-3 rounded-xl font-medium border text-xs transition-all duration-300 ${formData.customFun === "boti" ? "bg-neonAmber/20 border-neonAmber text-neonAmber shadow-glow-amber" : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"}`}
            >
              🕺 Boti
            </button>

            {/* 4. TOMBOY */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                setFormData(prev => ({ ...prev, gender: "female", customFun: "tomboy" }));
                triggerAlert(
                  "💪 Mode Tomboy Aktif",
                  "Otomatis meminjam rumus metabolisme tinggi dengan asupan protein dada ayam ekstra!",
                  "from-purple-500 to-indigo-600"
                );
              }}
              className={`flex-1 min-w-[100px] py-3 rounded-xl font-medium border text-xs transition-all duration-300 ${formData.customFun === "tomboy" ? "bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]" : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"}`}
            >
              🏃‍♀️ Tomboy
            </button>

            {/* 5. FEMBOY */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                setFormData(prev => ({ ...prev, gender: "female", customFun: "femboy" }));
                triggerAlert(
                  "✨🌸 Mode Femboy Aktif",
                  "Perhitungan kalori menggunakan rumus estetik halus. Disarankan perbanyak konsumsi susu kedelai biar makin glowing maksimal!",
                  "from-pink-500 to-rose-600"
                );
              }}
              className={`flex-1 min-w-[100px] py-3 rounded-xl font-medium border text-xs transition-all duration-300 ${formData.customFun === "femboy" ? "bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_10px_rgba(244,63,94,0.4)]" : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"}`}
            >
              💅 Femboy
            </button>

            {/* 6. USER MIYA FIRST PICK */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                setFormData(prev => ({ ...prev, gender: "male", customFun: "miya" }));
                triggerAlert(
                  "🏹🛡️ KRISIS GOLD LANE!",
                  "User Miya First Pick terdeteksi mengalami krisis gizi parah akibat keseringan digebukin di lane ataupun di dunia nyata! Beban lu berat bos, mending banyakin makan tempe spon biar gak gampang mati dikeroyok!",
                  "from-red-500 to-amber-600"
                );
              }}
              className={`w-full py-3 rounded-xl font-bold border text-xs transition-all duration-300 ${formData.customFun === "miya" ? "bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)] animate-pulse" : "bg-white/5 border-red-500/20 border-dashed text-red-400/70 hover:bg-red-500/10"}`}
            >
              🏹 User Miya First Pick
            </button>

          </div>
        </div>

        {/* Inputs (Weight, Height, Age) */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Berat (kg)</label>
            <input
              type="number"
              name="weight"
              disabled={isLoading}
              value={formData.weight}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Tinggi (cm)</label>
            <input
              type="number"
              name="height"
              disabled={isLoading}
              value={formData.height}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Umur (thn)</label>
            <input
              type="number"
              name="age"
              disabled={isLoading}
              value={formData.age}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all duration-300"
            />
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Aktivitas Harian</label>
          <div className="relative">
            <select
              name="activity"
              disabled={isLoading}
              value={formData.activity}
              onChange={handleChange}
              className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all duration-300 appearance-none pr-10 cursor-pointer"
            >
              <option value="sedentary">🥱 Jarang Olahraga / Rebahan (1.2x)</option>
              <option value="light">🧘‍♀️ Ringan (Olahraga 1-3 hari/minggu) (1.375x)</option>
              <option value="moderate">🚴🏻‍♀️ Sedang (Olahraga 3-5 hari/minggu) (1.55x)</option>
              <option value="active">🏋️‍♀️ Berat (Olahraga Intens 6-7 hari/minggu) (1.725x)</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 text-[10px]">▼</div>
          </div>
        </div>

        {/* Fitness Goal */}
        <div>
          <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Target Diet</label>
          <div className="relative">
            <select
              name="goal"
              disabled={isLoading}
              value={formData.goal}
              onChange={handleChange}
              className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-all duration-300 appearance-none pr-10 cursor-pointer"
            >
              <option value="lose">📉 Turunkan Berat Badan (Defisit Kalori)</option>
              <option value="maintain">⚖️ Pertahankan Berat Badan (Maintenance)</option>
              <option value="gain">📈 Naikkan Masa Otot (Surplus Kalori)</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 text-[10px]">▼</div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 ${
            isLoading 
              ? "bg-white/10 text-gray-500 cursor-not-allowed border border-white/5" 
              : "bg-gradient-to-r from-neonCyan to-neonGreen text-darkBg shadow-glow-green hover:opacity-90 active:scale-[0.98]"
          }`}
        >
          {isLoading ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="text-xl">🧬</motion.div>
              <span className="font-mono text-sm tracking-widest animate-pulse">MEMPROSES DATA...</span>
            </>
          ) : (
            <span>⚡ Hitung Kebutuhan Gizi</span>
          )}
        </button>
      </form>

      {/* RULIDESIGN CUSTOM PREMIUM ALERT MODAL */}
      <AnimatePresence>
        {alertConfig.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Gelap Efek Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            {/* Box Alert Melayang */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#0b0f19]/90 border border-white/10 p-6 rounded-2xl max-w-sm w-full shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden backdrop-blur-xl"
            >
              {/* Efek Garis Menyala Sesuai Tema Tombol */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${alertConfig.themeColor}`} />

              <h3 className={`text-md font-mono font-bold uppercase tracking-wider bg-gradient-to-r ${alertConfig.themeColor} bg-clip-text text-transparent mb-3`}>
                {alertConfig.title}
              </h3>
              
              <p className="text-xs text-gray-300 leading-relaxed font-light mb-6">
                {alertConfig.message}
              </p>

              {/* Tombol OK Interaktif */}
              <button
                type="button"
                onClick={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 bg-gradient-to-r ${alertConfig.themeColor} text-darkBg shadow-md hover:opacity-90 active:scale-[0.98]`}
              >
                GASS!!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BmrForm;