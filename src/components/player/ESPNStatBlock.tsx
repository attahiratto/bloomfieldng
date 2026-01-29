import { LucideIcon } from "lucide-react";

interface ESPNStatBlockProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  size?: "sm" | "md" | "lg";
}

const ESPNStatBlock = ({ value, label, icon: Icon, trend, size = "md" }: ESPNStatBlockProps) => {
  const sizeClasses = {
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  const valueSizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const trendColors = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-white/60",
  };

  return (
    <div className={`espn-stat-block ${sizeClasses[size]} relative overflow-hidden`}>
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center">
        {Icon && (
          <Icon className={`w-5 h-5 mb-2 ${trend ? trendColors[trend] : "text-white/40"}`} />
        )}
        <span className={`font-display font-black ${valueSizes[size]} text-white tracking-tight`}>
          {value}
        </span>
        <span className="espn-stat-label mt-1">{label}</span>
        {trend && (
          <div className={`mt-1 text-xs font-medium ${trendColors[trend]}`}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ESPNStatBlock;
