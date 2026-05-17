import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import BmrForm from "./components/BmrForm";
import MacroDisplay from "./components/MacroDisplay";
import FoodCard from "./components/FoodCard";
import BudgetSummary from "./components/BudgetSummary";
import Footer from "./components/Footer";
import WelcomeLoading from "./components/WelcomeLoading";
import OfflineScreen from "./components/OfflineScreen"; // 1. Impor Layar Offline Baru!

// Import core data & formula matematika
import { calculateNutrition } from "./data/formulas";
import { foodDatabase } from "./data/foodDatabase";

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine); // 2. State Deteksi Internet Online/Offline
  const [targetMacro, setTargetMacro] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- LOGIKA DETEKSI JARINGAN INTERNET SECARA REAL-TIME ---
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Splash screen loading awal masuk web
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearTimeout(timer);
    };
  }, []);

  // Fungsi pengolah saat tombol hitung gizi di BmrForm diklik
  const handleCalculate = (userData) => {
    setIsLoading(true);
    setTargetMacro(null);

    setTimeout(() => {
      const results = calculateNutrition(userData);
      setTargetMacro(results);
      setIsLoading(false);
    }, 1500);
  };

  // Fungsi Menambah Jumlah Makanan (+)
  const handleAddFood = (foodItem) => {
    setSelectedFoods((prevSelected) => {
      const existingItem = prevSelected.find((item) => item.id === foodItem.id);
      if (existingItem) {
        return prevSelected.map((item) =>
          item.id === foodItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevSelected, { ...foodItem, quantity: 1 }];
      }
    });
  };

  // Fungsi Mengurangi Jumlah Makanan (-)
  const handleRemoveFood = (foodItem) => {
    setSelectedFoods((prevSelected) => {
      const existingItem = prevSelected.find((item) => item.id === foodItem.id);
      if (existingItem?.quantity === 1) {
        return prevSelected.filter((item) => item.id !== foodItem.id);
      } else {
        return prevSelected.map((item) =>
          item.id === foodItem.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const calculateSelectedTotals = () => {
    let calories = 0; let protein = 0; let carbs = 0; let fat = 0; let totalPrice = 0;
    selectedFoods.forEach((item) => {
      calories += (parseFloat(item.calories) || 0) * item.quantity;
      protein += (parseFloat(item.protein) || 0) * item.quantity;
      carbs += (parseFloat(item.carbs) || 0) * item.quantity;
      fat += (parseFloat(item.fat) || 0) * item.quantity;
      totalPrice += (parseFloat(item.price) || 0) * item.quantity;
    });
    return { calories, protein, carbs, fat, totalPrice };
  };

  const selectedTotals = calculateSelectedTotals();

  // 3. INTERCEPT LAYAR JIKA USER SEDANG OFFLINE (Sinyal Putus)
  if (!isOnline) {
    return <OfflineScreen />;
  }

  if (isAppLoading) {
    return <WelcomeLoading />;
  }

  return (
    <MainLayout>
      <header className="text-center mb-12 select-none">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
          NUTRI<span className="bg-gradient-to-r from-neonCyan to-neonGreen bg-clip-text text-transparent">BUDGET</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-md max-w-md mx-auto font-light leading-relaxed">
          Kalkulator gizi pintar & rekomendasi katalog makanan sehat dengan harga super hemat di kantong teman-teman sekalian.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <BmrForm onCalculate={handleCalculate} isLoading={isLoading} />
        <MacroDisplay 
          macroData={targetMacro} 
          isLoading={isLoading} 
          selectedTotals={selectedTotals}
          selectedFoods={selectedFoods}
        />
      </div>

      {targetMacro && (
        <div className="space-y-8 animate-fade-in">
          <BudgetSummary selectedFoods={selectedFoods} targetMacro={targetMacro} />
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center space-x-2">
              <span>🛒</span>
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Pilih Menu Makanan Murah Harian Anda (Klik + untuk Tambah)
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {foodDatabase.map((food) => {
                const currentSelection = selectedFoods.find((item) => item.id === food.id);
                const quantity = currentSelection ? currentSelection.quantity : 0;
                return (
                  <FoodCard
                    key={food.id}
                    food={food}
                    quantity={quantity}
                    onAdd={handleAddFood}
                    onRemove={handleRemoveFood}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </MainLayout>
  );
}

export default App;