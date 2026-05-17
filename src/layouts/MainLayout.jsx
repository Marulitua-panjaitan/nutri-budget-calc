// FIX: Sementara kita beri komentar (matikan) dulu impor Navbar agar tidak memicu error screen putih
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen text-white bg-darkBg overflow-x-hidden antialiased selection:bg-neonCyan/30">
      {/* Decorative Ambient Radial Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-neonCyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] bg-neonGreen/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-32 pb-8 relative z-10">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;