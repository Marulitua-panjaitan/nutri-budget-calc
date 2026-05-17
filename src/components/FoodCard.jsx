const FoodCard = ({ food, quantity = 0, onAdd, onRemove }) => {
  const { name, serving, calories, protein, carbs, fat, price, icon, category } = food;

  const isSelected = quantity > 0;

  return (
    <div
      className={`glass-panel p-4 rounded-xl transition-all duration-300 group relative overflow-hidden select-none border hover:-translate-y-1 hover:shadow-glow-cyan ${
        isSelected 
          ? "border-neonGreen bg-neonGreen/5 shadow-glow-green" 
          : "border-white/5 hover:bg-white/5"
      }`}
    >
      {/* Indikator Jumlah Terpilih (Kanan Atas) */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-neonGreen text-darkBg text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shadow-glow-green animate-scale-in">
          {quantity}x ADDED
        </div>
      )}

      <div className="flex items-center space-x-4">
        {/* Ikon Makanan */}
        <div className="text-3xl p-2 bg-darkBg/50 rounded-xl border border-white/5">
          {icon}
        </div>

        {/* Informasi Utama */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm md:text-md font-bold text-white truncate group-hover:text-neonCyan transition-colors duration-300">
            {name}
          </h4>
          <p className="text-xs text-gray-500 font-light mt-0.5">Porsi: {serving}</p>
          
          {/* Tag Kecil Informasi Makro Makanan */}
          <div className="flex space-x-2 mt-2 text-[10px] font-mono text-gray-400">
            <span className="bg-darkBg px-1.5 py-0.5 rounded border border-white/5">🔥 {calories} Cal</span>
            <span className="bg-darkBg px-1.5 py-0.5 rounded border border-white/5 text-neonAmber">🍗 P: {protein}g</span>
          </div>
        </div>

        {/* Kolom Kontrol Harga & Tombol +/- */}
        <div className="flex flex-col items-end space-y-3">
          <div className="text-right">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider text-[10px]">Harga</p>
            <p className="text-sm font-extrabold text-neonGreen font-mono">
              Rp {price.toLocaleString("id-ID")}
            </p>
          </div>

          {/* Tombol Counter Multi-Quantity */}
          <div className="flex items-center bg-darkBg/80 border border-white/10 rounded-lg p-1 space-x-2 relative z-20">
            {/* Tombol Kurang (-) */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Mencegah bentrok event klik
                if (quantity > 0) onRemove(food);
              }}
              disabled={quantity === 0}
              className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold font-mono transition-all ${
                quantity > 0 
                  ? "bg-white/5 text-neonAmber hover:bg-neonAmber/20" 
                  : "text-gray-600 cursor-not-allowed"
              }`}
            >
              -
            </button>

            {/* Angka Live Counter */}
            <span className={`text-xs font-mono font-bold px-1 w-4 text-center ${quantity > 0 ? "text-neonCyan" : "text-gray-500"}`}>
              {quantity}
            </span>

            {/* Tombol Tambah (+) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(food);
              }}
              className="w-6 h-6 rounded bg-white/5 text-neonGreen hover:bg-neonGreen/20 flex items-center justify-center text-xs font-bold font-mono transition-all"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;