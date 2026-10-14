import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Scale, 
  MapPin, 
  Bot, 
  Menu,
  GraduationCap,
  Factory
} from 'lucide-react';
import { Language } from '../types';

interface MobileBottomNavProps {
  activeModule: string;
  onNavigate: (module: string) => void;
  onOpenMobileMenu: () => void;
  language: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeModule,
  onNavigate,
  onOpenMobileMenu,
  language,
}) => {
  const tabs = [
    { id: 'dashboard', label: language === 'en' ? 'Dashboard' : 'डैशबोर्ड', icon: LayoutDashboard },
    { id: 'student_portal', label: language === 'en' ? 'Student' : 'विद्यार्थी', icon: GraduationCap },
    { id: 'industrial_sector', label: language === 'en' ? 'Industry' : 'उद्योग', icon: Factory },
    { id: 'forecasting', label: language === 'en' ? 'Forecast' : 'पूर्वानुमान', icon: TrendingUp },
    { id: 'ai_assistant', label: language === 'en' ? 'AI Chat' : 'एआई चैट', icon: Bot, isAi: true },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#101828]/95 backdrop-blur-lg border-t border-[#E4EAF1] dark:border-[#1e2c42] px-2 py-1.5 flex items-center justify-around shadow-xl safe-area-pb">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeModule === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer relative ${
              isActive 
                ? 'text-[#0F9F94] font-black scale-105' 
                : 'text-[#667085] hover:text-[#101828] dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {tab.isAi && (
              <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-[#0F9F94] animate-pulse" />
            )}
            <Icon className={`w-5 h-5 ${isActive ? 'text-[#0F9F94]' : 'text-[#667085] dark:text-slate-400'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight font-sans truncate max-w-[64px]">
              {tab.label}
            </span>
            {isActive && (
              <span className="w-4 h-0.5 rounded-full bg-[#0F9F94] mt-0.5" />
            )}
          </button>
        );
      })}

      {/* More / All Modules Drawer Button */}
      <button
        onClick={onOpenMobileMenu}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[#667085] hover:text-[#101828] dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer"
        aria-label="Open All 16 Modules"
      >
        <Menu className="w-5 h-5 text-[#667085] dark:text-slate-400" />
        <span className="text-[10px] mt-0.5 tracking-tight font-sans">
          {language === 'en' ? 'More' : 'अन्य'}
        </span>
      </button>
    </div>
  );
};
