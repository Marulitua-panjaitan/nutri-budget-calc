import { useEffect, useRef, useState } from "react";

const OfflineScreen = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const gameState = useRef({
    chicken: { x: 40, y: 110, width: 30, height: 30, jumping: false, vy: 0 },
    obstacles: [],
    gravity: 0.6,
    speed: 4,
    frame: 0,
    gameActive: false,
  });

  // Fungsi Utama Pemicu Lompatan & Mulai Game (Diakses langsung oleh User Gesture)
  const triggerJump = () => {
    const state = gameState.current;
    
    // Jika game belum mulai atau sedang game over, aktifkan game loop kembali
    if (!state.gameActive) {
      state.gameActive = true;
      setHasStarted(true);
      
      // Reset state game internal
      state.chicken.y = 110;
      state.chicken.vy = 0;
      state.chicken.jumping = false;
      state.obstacles = [];
      state.speed = 4;
      state.frame = 0;
      
      setScore(0);
      setIsGameOver(false);
      
      // Jalankan animasi loop utama
      gameLoop();
    } else if (!state.chicken.jumping) {
      // Paha ayam melompat
      state.chicken.vy = -11; 
      state.chicken.jumping = true;
    }
  };

  // Fungsi Animasi Utama (Murni hanya mengurus rendering & update koordinat)
  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = gameState.current;

    if (!state.gameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    state.frame++;

    // Fisika Karakter Paha Ayam
    if (state.chicken.jumping) {
      state.chicken.vy += state.gravity;
      state.chicken.y += state.chicken.vy;

      if (state.chicken.y >= 110) {
        state.chicken.y = 110;
        state.chicken.vy = 0;
        state.chicken.jumping = false;
      }
    }

    // Menggambar Karakter Paha Ayam (🍗)
    ctx.font = "30px Arial";
    ctx.fillText("🍗", state.chicken.x, state.chicken.y + 25);

    // Spawn Rintangan Batu (🪨)
    if (state.frame % 95 === 0) {
      state.obstacles.push({
        x: canvas.width,
        y: 115,
        width: 25,
        height: 25,
      });
      state.speed += 0.15;
    }

    // Pergerakan Batu & Deteksi Tabrakan
    for (let i = state.obstacles.length - 1; i >= 0; i--) {
      const obs = state.obstacles[i];
      obs.x -= state.speed;

      ctx.font = "25px Arial";
      ctx.fillText("🪨", obs.x, obs.y + 22);

      // Hitbox Collision Detection
      if (
        state.chicken.x < obs.x + obs.width &&
        state.chicken.x + state.chicken.width > obs.x &&
        state.chicken.y < obs.y + obs.height &&
        state.chicken.y + state.chicken.height > obs.y
      ) {
        state.gameActive = false;
        setIsGameOver(true);
        setHighScore((prev) => Math.max(prev, Math.floor(state.frame / 10)));
        return;
      }

      if (obs.x + obs.width < 0) {
        state.obstacles.splice(i, 1);
        setScore(Math.floor(state.frame / 10));
      }
    }

    requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Handler keyboard spasi untuk pengguna Laptop/PC
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Render paha ayam posisi diam di tanah saat halaman pertama terbuka
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillText("🍗", gameState.current.chicken.x, gameState.current.chicken.y + 25);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070a13] flex flex-col items-center justify-center p-4 text-center select-none font-mono">
      {/* Notifikasi Status Offline */}
      <div className="mb-4 max-w-sm">
        <div className="text-4xl md:text-5xl mb-3 animate-bounce">📡❌</div>
        <h2 className="text-xl md:text-2xl font-black text-red-400 tracking-wider uppercase mb-1">
          Koneksi Terputus
        </h2>
        <p className="text-xs text-gray-400 leading-relaxed font-light px-2">
          Waduh Maruli, internetmu sepertinya lagi amsyong! Sembari nunggu jaringan balik normal, yuk bantu <span className="text-neonAmber font-bold">Paha Ayam ruliDesign</span> ini bertahan hidup dari gempuran batu!
        </p>
      </div>

      {/* BOX GAME CONSOLE CYBERPUNK */}
      <div 
        ref={containerRef} 
        className="glass-panel border border-white/10 p-4 rounded-2xl shadow-glow-amber bg-black/40 max-w-md w-full"
      >
        {/* Scoreboard */}
        <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-2 px-1">
          <span>HI-SCORE: <span className="text-neonCyan font-bold">{highScore}</span></span>
          <span>SCORE: <span className="text-neonGreen font-bold">{score}</span></span>
        </div>

        {/* Layar Canvas Game (Binding LangsungonTouchStart & onClick untuk Bypass Kebijakan Mobile Browser) */}
        <div 
          onTouchStart={(e) => {
            e.preventDefault(); // Mencegah scrolling halaman saat asyik main game di HP
            triggerJump();
          }}
          onClick={() => triggerJump()} // Failsafe jika dibuka lewat simulasi mobile device responsif di browser PC
          className="bg-[#0f1424] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center touch-none cursor-pointer active:bg-[#131b30] transition-colors"
        >
          <canvas 
            ref={canvasRef} 
            height={150} 
            className="w-full h-auto bg-gradient-to-b from-transparent to-white/[0.02]"
          />

          {/* Garis batas tanah dekoratif */}
          <div className="absolute bottom-[10px] left-0 w-full h-[1px] bg-white/20 border-b border-dashed border-white/10" />

          {/* Overlay Skrin Start / Game Over */}
          {!hasStarted && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm p-2">
              <p className="text-[11px] md:text-xs text-neonCyan font-bold tracking-widest animate-pulse">
                TAP AREA INI / TEKAN [SPASI]
              </p>
              <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-wider">
                Untuk Mulai Melompati Batu
              </p>
            </div>
          )}

          {isGameOver && (
            <div className="absolute inset-0 bg-red-950/80 flex flex-col items-center justify-center backdrop-blur-sm animate-fade-in p-2">
              <p className="text-xs md:text-sm font-bold text-red-400 uppercase tracking-widest mb-1">
                🍗 PAHA AYAM REMUK!
              </p>
              <p className="text-[10px] text-gray-300">Skor Akhir: <span className="text-neonGreen font-bold">{score}</span></p>
              <p className="text-[10px] text-neonCyan font-bold tracking-widest mt-3 animate-pulse uppercase">
                Tap Di Sini Untuk Balas Dendam
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="text-[9px] text-gray-600 mt-5 uppercase tracking-widest">
        ruliDesign Offline Game Engine v1.2
      </p>
    </div>
  );
};

export default OfflineScreen;