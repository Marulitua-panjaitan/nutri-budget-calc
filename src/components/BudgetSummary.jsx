const BudgetSummary = ({ selectedFoods, targetMacro }) => {
  // FIX: Kalikan setiap nilai gizi dan harga dengan kuantitas (item.quantity)
  const totals = selectedFoods.reduce(
    (acc, item) => {
      acc.price += item.price * item.quantity;
      acc.calories += item.calories * item.quantity;
      acc.protein += item.protein * item.quantity;
      acc.carbs += item.carbs * item.quantity;
      acc.fat += item.fat * item.quantity;
      return acc;
    },
    { price: 0, calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-glow-cyan">
      <h2 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        💰 Kalkulator Kantong & Gizi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Sisi Total Budget Pengeluaran */}
        <div className="p-6 bg-darkBg/50 border border-white/5 rounded-2xl text-center">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Estimasi Biaya Belanja Hari Ini</p>
          <h3 className="text-3xl md:text-4xl font-black text-neonGreen font-mono tracking-tight">
            Rp {totals.price.toLocaleString("id-ID")}
          </h3>
          <p className="text-[10px] font-mono text-gray-500 mt-2">
            *Estimasi harga bahan mentah di pasar tradisional lokal Indonesia
          </p>
        </div>

        {/* Sisi Pemantau Target Gizi Akumulatif */}
        <div className="space-y-3 text-sm">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">Progress Pemenuhan Target Harian</p>
          
          {/* Progress Kalori */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-gray-400">
              <span>🔥 Kalori: {totals.calories} kcal</span>
              <span>Target: {targetMacro ? targetMacro.calories : 0} kcal</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neonGreen transition-all duration-500" 
                style={{ width: `${Math.min((totals.calories / (targetMacro?.calories || 1)) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Progress Protein */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-gray-400">
              <span>🍗 Protein: {totals.protein}g</span>
              <span>Target: {targetMacro ? targetMacro.protein : 0}g</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neonAmber transition-all duration-500" 
                style={{ width: `${Math.min((totals.protein / (targetMacro?.protein || 1)) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Evaluasi Pintar */}
      {selectedFoods.length > 0 && targetMacro && (
        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5 text-xs font-light text-gray-400">
          {totals.protein >= targetMacro.protein ? (
            <p className="text-neonGreen font-medium">✅ Keren! Target protein harian kamu sudah terpenuhi dengan budget yang sangat hemat.</p>
          ) : (
            <p className="text-neonAmber">⚠️ Tips: Target protein kamu kurang <span className="font-bold font-mono">{Math.max(0, targetMacro.protein - totals.protein)}g lagi</span>. Coba tambahkan varian Telur Ayam atau Tempe ke dalam daftar.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetSummary;