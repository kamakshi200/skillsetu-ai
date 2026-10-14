import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Scale, 
  MapPin, 
  Radar, 
  FileText, 
  GraduationCap, 
  Landmark, 
  Briefcase, 
  Sliders, 
  Bot, 
  Bell, 
  Download, 
  BookOpen,
  ChevronRight,
  ChevronLeft,
  X,
  Factory,
  Compass,
  PanelLeftClose,
  PanelLeft,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { SkillSetuLogo } from './SkillSetuLogo';

interface SidebarProps {
  activeModule: string;
  onNavigate: (module: string) => void;
  language: Language;
  unreadAlertsCount: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onNavigate,
  language,
  unreadAlertsCount,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const t = translations[language];
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navGroups = [
    {
      groupLabel: language === 'en' ? 'Core Intelligence' : 'आसूचना एवं पूर्वानुमान',
      items: [
        { id: 'dashboard', label: t.nav_dashboard, icon: LayoutDashboard },
        { id: 'forecasting', label: t.nav_forecasting, icon: TrendingUp },
        { id: 'gap_analyzer', label: t.nav_gap_analyzer, icon: Scale },
        { id: 'regional_map', label: t.nav_regional_map, icon: MapPin },
        { id: 'emerging_skills', label: t.nav_emerging_skills, icon: Radar },
      ],
    },
    {
      groupLabel: language === 'en' ? 'Industrial & Student' : 'उद्योग एवं विद्यार्थी करियर',
      items: [
        { id: 'industrial_sector', label: t.nav_industrial_sector, icon: Factory, isNew: true, badgeText: '12 SECTORS' },
        { id: 'student_portal', label: t.nav_student_portal, icon: Compass, isNew: true, badgeText: 'STUDENT' },
      ],
    },
    {
      groupLabel: language === 'en' ? 'Policy & Interventions' : 'नीति एवं कार्ययोजना',
      items: [
        { id: 'training_recs', label: t.nav_training_recs, icon: GraduationCap },
        { id: 'gov_schemes', label: t.nav_gov_schemes, icon: Landmark },
        { id: 'policy_simulator', label: t.nav_policy_simulator, icon: Sliders },
        { id: 'employer_demand', label: t.nav_employer_demand, icon: Briefcase },
      ],
    },
    {
      groupLabel: language === 'en' ? 'AI & Governance' : 'एआई टूल्स एवं रिपोर्ट',
      items: [
        { id: 'ai_assistant', label: t.nav_ai_assistant, icon: Bot, isNew: true, badgeText: 'AI' },
        { id: 'skill_extraction', label: t.nav_skill_extraction, icon: FileText },
        { id: 'alerts', label: t.nav_alerts, icon: Bell, badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined },
        { id: 'reports', label: t.nav_reports, icon: Download },
        { id: 'sources_methodology', label: t.nav_sources_methodology, icon: BookOpen },
      ],
    },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  // Render navigation item helper
  const renderNavItem = (item: any, collapsed: boolean) => {
    const Icon = item.icon;
    const isActive = activeModule === item.id;

    return (
      <button
        key={item.id}
        onClick={() => handleItemClick(item.id)}
        title={collapsed ? item.label : undefined}
        className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer relative ${
          isActive
            ? 'bg-[#1E293B] text-white font-semibold shadow-xs'
            : 'text-[#98A2B3] hover:text-white hover:bg-[#17243A]'
        }`}
      >
        {/* Left Primary Active Indicator Line */}
        {isActive && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#0F9F94] rounded-r-md" />
        )}

        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} truncate`}>
          <Icon className={`w-4 h-4 shrink-0 transition-colors ${
            isActive ? 'text-[#0F9F94]' : 'text-[#667085] group-hover:text-white'
          }`} />
          {!collapsed && (
            <span className="truncate tracking-wide">{item.label}</span>
          )}
        </div>

        {!collapsed && (
          <div className="flex items-center space-x-1 shrink-0">
            {item.badgeText && (
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                item.badgeText === 'AI' 
                  ? 'bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/40'
                  : item.badgeText === 'STUDENT'
                  ? 'bg-[#0F9F94]/20 text-[#0F9F94] border border-[#0F9F94]/40'
                  : 'bg-[#F4B942]/20 text-[#F4B942] border border-[#F4B942]/40'
              }`}>
                {item.badgeText}
              </span>
            )}
            {item.badge !== undefined && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#DC2626] text-white rounded-full">
                {item.badge}
              </span>
            )}
            {isActive && (
              <ChevronRight className="w-3.5 h-3.5 text-[#0F9F94] opacity-80" />
            )}
          </div>
        )}
      </button>
    );
  };

  // Nav list markup
  const renderNavList = (collapsed: boolean) => (
    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 no-scrollbar">
      {navGroups.map((group, gIdx) => (
        <div key={gIdx} className="space-y-1">
          {!collapsed && (
            <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#667085]">
              {group.groupLabel}
            </h3>
          )}
          <div className="space-y-0.5 mt-1">
            {group.items.map((item) => renderNavItem(item, collapsed))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP PERMANENT DARK NAVY SIDEBAR (#101828) */}
      <aside 
        className={`hidden lg:flex flex-col h-[calc(100vh-4rem)] sticky top-16 bg-[#101828] border-r border-[#1e2c42] select-none transition-all duration-300 z-20 shrink-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-4 border-b border-[#1e2c42] flex items-center justify-between">
          {!isCollapsed ? (
            <div className="flex items-center space-x-2.5 truncate">
              <SkillSetuLogo className="w-8 h-8 shrink-0" />
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white text-sm tracking-tight">SkillSetu AI</span>
                  <span className="text-[9px] font-black bg-[#0F9F94]/20 text-[#0F9F94] px-1 rounded uppercase">NLMIS</span>
                </div>
                <p className="text-[10px] text-[#667085] truncate font-medium">Labour Market Intelligence</p>
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <SkillSetuLogo className="w-8 h-8" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg text-[#667085] hover:text-white hover:bg-[#17243A] cursor-pointer transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation items list */}
        {renderNavList(isCollapsed)}

        {/* District Jurisdiction / Public Sector Footer */}
        {!isCollapsed ? (
          <div className="p-3 bg-[#0d1422] border-t border-[#1e2c42] text-[11px] text-[#667085]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-[#98A2B3]">
                {language === 'en' ? 'State Jurisdiction:' : 'राज्य क्षेत्राधिकार:'}
              </span>
              <span className="font-bold text-[#0F9F94]">Madhya Pradesh</span>
            </div>
            <p className="text-[10px] text-[#667085] leading-snug">
              55 Districts • 12 Priority Corridors • NCO-2015 & NSQF
            </p>
          </div>
        ) : (
          <div className="p-2.5 bg-[#0d1422] border-t border-[#1e2c42] flex justify-center">
            <span className="w-2 h-2 rounded-full bg-[#0F9F94]" title="Madhya Pradesh Active Pilot" />
          </div>
        )}
      </aside>

      {/* 2. MOBILE SLIDE-OVER DRAWER (#101828) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[85vw] h-full bg-[#101828] border-r border-[#1e2c42] shadow-2xl z-10 flex flex-col animate-in slide-in-from-left duration-200">
            {/* Mobile Drawer Header */}
            <div className="p-4 border-b border-[#1e2c42] flex items-center justify-between bg-[#0d1422]">
              <div className="flex items-center space-x-2.5">
                <SkillSetuLogo className="w-8 h-8" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-white text-sm">SkillSetu AI</span>
                    <span className="text-[9px] font-black bg-[#0F9F94]/20 text-[#0F9F94] px-1 rounded uppercase">NLMIS</span>
                  </div>
                  <p className="text-[10px] text-[#667085]">Labour Market Intelligence</p>
                </div>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-[#667085] hover:text-white hover:bg-[#17243A] cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav list */}
            {renderNavList(false)}

            {/* Mobile Footer */}
            <div className="p-3 bg-[#0d1422] border-t border-[#1e2c42] text-[11px] text-[#667085]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-[#98A2B3]">State Jurisdiction:</span>
                <span className="font-bold text-[#0F9F94]">Madhya Pradesh</span>
              </div>
              <p className="text-[10px] text-[#667085]">
                55 Districts • 12 Priority Corridors • SIH Problem Statement 26246
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
