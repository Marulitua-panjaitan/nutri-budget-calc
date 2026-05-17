const MacroCard = ({ title, value, unit, colorClass, icon }) => {
  return (
    <div className="bg-darkBg/50 border border-white/5 rounded-xl p-4 flex items-center space-x-4">
      <div className={`text-2xl p-3 bg-white/5 rounded-xl border border-white/5 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">{title}</p>
        <p className="text-lg font-bold text-white">
          {value} <span className="text-xs font-normal text-gray-500">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default MacroCard;