const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/5 pt-6 pb-2 text-center relative z-20">
      <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">
        &copy; {new Date().getFullYear()} NUTRI<span className="text-gray-400">BUDGET</span>
      </p>
      <p className="text-xs text-gray-400 mt-1 font-light">
        Crafted with ⚡ and passion by{" "}
        <span className="font-bold bg-gradient-to-r from-neonCyan to-neonGreen bg-clip-text text-transparent tracking-wide hover:opacity-80 transition-opacity duration-300 select-none cursor-pointer">
          ruliDesign
        </span>
      </p>
    </footer>
  );
};

export default Footer;