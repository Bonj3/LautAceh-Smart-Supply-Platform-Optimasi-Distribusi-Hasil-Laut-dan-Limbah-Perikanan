import React from "react";
import { useNavigate } from "react-router-dom";

export interface CategoryItem {
  id: string;
  label: string;
  imageUrl: string;
  queryFilter: string; // The text to filter the marketplace with
}

interface CategoryGridProps {
  categories: CategoryItem[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Grid Container with internal borders using gap and background trick */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-[1px] bg-slate-200 border border-slate-200 rounded-sm overflow-hidden shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/marketplace?tab=fresh&category=${encodeURIComponent(cat.queryFilter)}`)}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-[#5de8d4]/10 transition-colors duration-200 group relative"
          >
            {/* Marine hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_15px_rgba(93,232,212,0.15)] pointer-events-none" />

            {/* Circular Image Container */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden mb-3 border border-slate-100 group-hover:border-[#5de8d4]/50 transition-colors duration-200">
              <img
                src={cat.imageUrl}
                alt={cat.label}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Label */}
            <span className="text-xs sm:text-sm font-medium text-slate-700 text-center leading-snug group-hover:text-[#0b4553] transition-colors duration-200">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
