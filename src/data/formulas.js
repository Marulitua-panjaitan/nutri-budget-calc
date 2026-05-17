/**
 * Menghitung Kebutuhan Kalori Harian (TDEE) & Makronutrisi
 * Rumus: Mifflin-St Jeor
 */
export const calculateNutrition = ({ gender, weight, height, age, activity, goal }) => {
  // 1. Hitung BMR (Kalori dasar saat tubuh istirahat total)
  let bmr = 0;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // 2. Faktor Aktivitas (Multiplier TDEE)
  const activityMultipliers = {
    sedentary: 1.2,       // Jarang olahraga
    light: 1.375,       // Olahraga 1-3 hari/minggu
    moderate: 1.55,     // Olahraga 3-5 hari/minggu
    active: 1.725,      // Olahraga berat 6-7 hari/minggu
  };

  const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.2));

  // 3. Sesuaikan dengan Target (Goal)
  let targetCalories = tdee;
  if (goal === "lose") targetCalories = tdee - 400; // Defisit kalori (Turun BB)
  if (goal === "gain") targetCalories = tdee + 400; // Surplus kalori (Naik BB)

  // 4. Hitung Makronutrisi (Pendekatan Standar Fitnes Ekonomis)
  // Protein: 2 gram per kg berat badan (1 gram = 4 kalori)
  const proteinGrams = Math.round(weight * 2);
  const proteinCalories = proteinGrams * 4;

  // Lemak: 25% dari total kalori harian (1 gram = 9 kalori)
  const fatCalories = targetCalories * 0.25;
  const fatGrams = Math.round(fatCalories / 9);

  // Karbohidrat: Sisa dari kalori (1 gram = 4 kalori)
  const carbsCalories = targetCalories - (proteinCalories + fatCalories);
  const carbsGrams = Math.round(carbsCalories / 4);

  return {
    calories: targetCalories,
    protein: proteinGrams,
    carbs: carbsGrams,
    fat: fatGrams,
    bmr: Math.round(bmr),
  };
};