import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Languages, 
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Factory,
  GraduationCap,
  LayoutDashboard,
  TrendingUp,
  Scale,
  MapPin,
  Radar,
  Landmark,
  Sliders,
  Briefcase,
  FileText,
  BookOpen,
  AlertCircle,
  Users,
  Compass,
  Cpu,
  Zap,
  Pill,
  Award,
  HelpCircle,
  FileCheck,
  Download,
  Bot,
  Printer
} from 'lucide-react';
import { Language, Theme, UserProfile } from '../types';
import { translations } from '../utils/translations';
import { MOCK_NOTIFICATIONS } from '../data/mockData';
import { SkillSetuLogo } from './SkillSetuLogo';
import { UserProfileMenu } from './UserProfileMenu';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  onThemeSet?: (newTheme: Theme) => void;
  activeModule: string;
  activeSubTab?: string;
  onNavigate: (module: string, subTab?: string) => void;
  unreadAlertsCount: number;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  currentUser: UserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

interface SubTabItem {
  id: string;
  label: string;
  labelHi: string;
  icon: React.ComponentType<{ className?: string }>;
  targetModule?: string;
}

interface MainTabItem {
  id: string;
  label: string;
  labelHi: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeText?: string;
  accentColor: string;
  activeBg: string;
  activeText: string;
  activeGlow: string;
  memberModules: string[];
  subTabs: SubTabItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  onThemeSet,
  activeModule,
  activeSubTab,
  onNavigate,
  unreadAlertsCount,
  isMobileMenuOpen,
  onToggleMobileMenu,
  currentUser,
  onOpenLogin,
  onLogout,
}) => {
  const t = translations[language];
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'larger'>('normal');
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const subTabsContainerRef = useRef<HTMLDivElement>(null);

  // Government GIGW Text Zoom Controls
  const handleTextSizeChange = (scale: 'normal' | 'large' | 'larger') => {
    setFontSizeScale(scale);
    if (scale === 'larger') {
      document.documentElement.style.fontSize = '16.5px';
    } else if (scale === 'large') {
      document.documentElement.style.fontSize = '15.5px';
    } else {
      document.documentElement.style.fontSize = '15px';
    }
  };

  // Scroll main tabs
  const handleScrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Scroll sub-tabs
  const handleScrollSubTabs = (direction: 'left' | 'right') => {
    if (subTabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      subTabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // 7 Primary Navigation Tabs with fully working Sub-Tabs
  const primaryTabs: MainTabItem[] = [
    {
      id: 'dashboard',
      label: 'Labour Intelligence',
      labelHi: 'श्रम बाजार आसूचना',
      icon: LayoutDashboard,
      badgeText: 'CORE',
      accentColor: 'blue',
      activeBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      activeText: 'text-white',
      activeGlow: 'shadow-md shadow-blue-500/25 ring-1 ring-blue-400',
      memberModules: ['dashboard'],
      subTabs: [
        { id: 'kpis', label: 'Key Indicators & Metrics', labelHi: 'मुख्य संकेतक एवं मेट्रिक्स', icon: LayoutDashboard },
        { id: 'sectors', label: 'Sector Demand Heatmap', labelHi: 'क्षेत्रीय मांग हीटमैप', icon: TrendingUp },
        { id: 'districts', label: 'District Priority Watch', labelHi: 'जिला प्राथमिकता निगरानी', icon: AlertCircle },
        { id: 'balance', label: 'Labour Supply-Demand Balance', labelHi: 'श्रम मांग-आपूर्ति संतुलन', icon: Scale },
      ],
    },
    {
      id: 'industrial_sector',
      label: '12 Industrial Sectors',
      labelHi: '12 औद्योगिक क्षेत्र',
      icon: Factory,
      badgeText: '12 SECTORS',
      accentColor: 'amber',
      activeBg: 'bg-gradient-to-r from-amber-500 to-orange-600',
      activeText: 'text-white',
      activeGlow: 'shadow-md shadow-orange-500/25 ring-1 ring-amber-400',
      memberModules: ['industrial_sector'],
      subTabs: [
        { id: 'all_sectors', label: 'All 12 Sectors Grid', labelHi: 'सभी 12 क्षेत्र', icon: Factory },
        { id: 'automotive_ev', label: 'EV & Automotive', labelHi: 'ईवी एवं ऑटोमोटिव', icon: Zap },
        { id: 'renewable_clean_energy', label: 'Solar & Clean Energy', labelHi: 'सोलर एवं स्वच्छ ऊर्जा', icon: Sparkles },
        { id: 'precision_cnc_robotics', label: 'Precision CNC & Aero', labelHi: 'सटीक सीएनसी व रोबोटिक्स', icon: Cpu },
        { id: 'pharma_biotech', label: 'Pharma & Cleanroom', labelHi: 'फार्मा एवं बायोसाइंस', icon: Pill },
        { id: 'electronics_semiconductor', label: 'IT & Electronics', labelHi: 'आईटी व सेमीकंडक्टर', icon: Building2 },
        { id: 'candidate_pool', label: 'Candidate Pool Simulator', labelHi: 'प्रशिक्षु मांग सिमुलेटर', icon: Users },
      ],
    },
    {
      id: 'student_portal',
      label: 'Student Career Hub',
      labelHi: 'विद्यार्थी करियर पोर्टल',
      icon: GraduationCap,
      badgeText: 'STUDENTS',
      accentColor: 'emerald',
      activeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      activeText: 'text-white',
      activeGlow: 'shadow-md shadow-emerald-500/25 ring-1 ring-emerald-400',
      memberModules: ['student_portal'],
      subTabs: [
        { id: 'pathways', label: 'Career Pathways', labelHi: 'करियर मार्गदर्शिका', icon: Compass },
        { id: 'courses', label: 'Skill Gap Bridge & Courses', labelHi: 'कौशल सेतु एवं निशुल्क कोर्स', icon: BookOpen },
        { id: 'stipend', label: 'MMSKY / NAPS Stipend Calc', labelHi: 'वज़ीफ़ा (Stipend) कैलकुलेटर', icon: Award },
        { id: 'viva', label: 'DGT Viva & Technical Q&A', labelHi: 'मौखिक परीक्षा (Viva) तैयारी', icon: HelpCircle },
        { id: 'passport', label: 'Digital Skill Passport', labelHi: 'डिजिटल कौशल प्रमाणपत्र', icon: FileCheck },
      ],
    },
    {
      id: 'forecasting',
      label: 'Forecasting & Gaps',
      labelHi: 'पूर्वानुमान एवं कौशल अंतर',
      icon: TrendingUp,
      badgeText: 'ANALYTICS',
      accentColor: 'purple',
      activeBg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
      activeText: 'text-white',
      activeGlow: 'shadow-md shadow-purple-500/25 ring-1 ring-purple-400',
      memberModules: ['forecasting', 'gap_analyzer', 'emerging_skills', 'training_recs'],
      subTabs: [
        { id: 'forecasting', label: '12-Month Demand Forecast', labelHi: '12 माह का मांग पूर्वानुमान', icon: TrendingUp, targetModule: 'forecasting' },
        { id: 'gap_analyzer', label: 'Skill Gap Analyzer', labelHi: 'कौशल अंतर विश्लेषण', icon: Scale, targetModule: 'gap_analyzer' },
        { id: 'emerging_skills', label: 'Emerging Skills Radar', labelHi: 'उभरते कौशल रडार', icon: Radar, targetModule: 'emerging_skills' },
        { id: 'training_recs', label: 'Capacity Allocations', labelHi: 'प्रशिक्षण क्षमता आवंटन', icon: Award, targetModule: 'training_recs' },
      ],
    },
    {
      id: 'regional_map',
      label: 'District Intelligence',
      labelHi: 'जिला आसूचना मानचित्र',
      icon: MapPin,
      badgeText: '55 DISTRICTS',
      accentColor: 'teal',
      activeBg: 'bg-gradient-to-r from-teal-600 to-cyan-600',
      activeText: 'text-white',
      activeGlow: 'shadow-md shadow-teal-500/25 ring-1 ring-teal-400',
      memberModules: ['regional_map'],
      subTabs: [
        { id: 'map', label: '55 MP Districts Interactive Map', labelHi: '55 जिलों का इंटरएक्टिव नक्शा', icon: MapPin },
        { id: 'corridors', label: 'Industrial Corridors (Pithampur/Bhopal)', labelHi: 'औद्योगिक गलियारे', icon: Factory },
        { id: 'capacities', label: 'District ITI Capacity Matrix', labelHi: 'जिला आईटीआई क्षमता', icon: Building2 },
      ],
    },
    {
      id: 'gov_schemes',
      label: 'Govt Schemes & Policy',
      labelHi: 'सरकारी योजनाएं एवं नीतियां',
      icon: Landmark,
      badgeText: 'MSDE / MP',
      accentColor: 'rose',
      activeBg: 'bg-gradient-to-r from-rose-600 to-red-600',
      activeText: 'text-white',
      activeGlow: 'shadow-md shadow-rose-500/25 ring-1 ring-rose-400',
      memberModules: ['gov_schemes', 'policy_simulator', 'employer_demand'],
      subTabs: [
        { id: 'gov_schemes', label: 'MSDE & State Schemes (PMKVY/MMSKY)', labelHi: 'एमएसडीई व म.प्र. योजनाएं', icon: Landmark, targetModule: 'gov_schemes' },
        { id: 'policy_simulator', label: 'Policy Impact Simulator', labelHi: 'नीति प्रभाव सिमुलेटर', icon: Sliders, targetModule: 'policy_simulator' },
        { id: 'employer_demand', label: 'Employer Vacancy Feed', labelHi: 'नियोक्ता भर्ती मांग', icon: Briefcase, targetModule: 'employer_demand' },
      ],
    },
    {
      id: 'ai_assistant',
      label: 'AI & Data Reports',
      labelHi: 'एआई व डेटा रिपोर्ट्स',
      icon: Bot,
      badgeText: 'AI TOOLS',
      accentColor: 'violet',
      activeBg: 'bg-gradient-to-r from-violet-600 to-purple-600',
      activeText: 'text-white',
      activeGlow: 'shadow-md shadow-violet-500/25 ring-1 ring-violet-400',
      memberModules: ['ai_assistant', 'skill_extraction', 'reports', 'sources_methodology', 'alerts'],
      subTabs: [
        { id: 'ai_assistant', label: 'AI Policy Assistant', labelHi: 'एआई नीति सहायक', icon: Bot, targetModule: 'ai_assistant' },
        { id: 'skill_extraction', label: 'Skill Extraction Engine', labelHi: 'कौशल निष्कर्षण इंजन', icon: FileText, targetModule: 'skill_extraction' },
        { id: 'reports', label: 'Official Reports & CSV', labelHi: 'रिपोर्ट्स व डेटा डाउनलोड', icon: Download, targetModule: 'reports' },
        { id: 'sources_methodology', label: 'Methodology & Data Sources', labelHi: 'कार्यप्रणाली व स्रोत', icon: BookOpen, targetModule: 'sources_methodology' },
        { id: 'alerts', label: 'Skill Alert Center', labelHi: 'अलर्ट केंद्र', icon: Bell, targetModule: 'alerts' },
      ],
    },
  ];

  // Find active primary tab based on current activeModule
  const currentMainTab = primaryTabs.find(tab => 
    tab.id === activeModule || tab.memberModules.includes(activeModule)
  ) || primaryTabs[0];

  const handleMainTabClick = (tab: MainTabItem) => {
    // When switching main tab, navigate to its primary module and reset subTab or set to first subTab
    const firstSubTab = tab.subTabs[0]?.id;
    const targetModule = tab.subTabs[0]?.targetModule || tab.id;
    onNavigate(targetModule, firstSubTab);
  };

  const handleSubTabClick = (sub: SubTabItem) => {
    const targetModule = sub.targetModule || currentMainTab.id;
    onNavigate(targetModule, sub.id);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-md transition-colors duration-200">
      {/* 1. Official National Indian Tricolor Header Stripe */}
      <div className="h-1.5 w-full flex">
        <div className="h-full flex-1 bg-[#FF9933]" title="Saffron - Strength & Courage" />
        <div className="h-full flex-1 bg-[#FFFFFF] relative flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#000080]" />
        </div>
        <div className="h-full flex-1 bg-[#138808]" title="Green - Growth & Fertility" />
      </div>

      {/* 2. Primary Consolidated Government Header (Clean, prestigious, SkillSetu in pride of place) */}
      <div className="px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800">
        {/* Left: Mobile Menu Trigger + SkillSetu Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div 
            onClick={() => onNavigate('dashboard', 'kpis')} 
            className="cursor-pointer"
            title="SkillSetu AI — Ministry of Skill Development & Entrepreneurship"
          >
            <SkillSetuLogo language={language} variant="full" />
          </div>
        </div>

        {/* Center: Jurisdiction Badge (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-extrabold text-slate-800 dark:text-slate-200">
            {language === 'en' ? 'Madhya Pradesh Pilot' : 'मध्य प्रदेश पायलट'}
          </span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="text-slate-600 dark:text-slate-400 font-semibold text-[11px]">
            55 Districts • 12 Priority Industrial Sectors
          </span>
        </div>

        {/* Right: Controls & User Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 text-xs">
          {/* GIGW Font Size Resizer: A- | A | A+ */}
          <div className="hidden md:flex items-center space-x-1 border-r border-slate-200 dark:border-slate-800 pr-2">
            <span className="text-[10px] text-slate-500 font-bold mr-0.5">Text:</span>
            <button
              onClick={() => handleTextSizeChange('normal')}
              className={`px-1.5 py-0.5 rounded text-[10.5px] font-bold cursor-pointer transition-colors ${
                fontSizeScale === 'normal'
                  ? 'bg-[#0F9F94] text-white font-black'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
              title="Standard Font Size (A-)"
            >
              A-
            </button>
            <button
              onClick={() => handleTextSizeChange('large')}
              className={`px-1.5 py-0.5 rounded text-[10.5px] font-bold cursor-pointer transition-colors ${
                fontSizeScale === 'large'
                  ? 'bg-[#0F9F94] text-white font-black'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
              title="Standard Font Size (A)"
            >
              A
            </button>
            <button
              onClick={() => handleTextSizeChange('larger')}
              className={`px-1.5 py-0.5 rounded text-[10.5px] font-bold cursor-pointer transition-colors ${
                fontSizeScale === 'larger'
                  ? 'bg-[#0F9F94] text-white font-black'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
              title="Large Font Size (A+)"
            >
              A+
            </button>
          </div>

          {/* GOVERNMENT STANDARD THEME SWITCHER */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700">
            <button
              onClick={() => onThemeSet ? onThemeSet('light') : onThemeToggle()}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
              title="Official Standard Light Theme"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Light</span>
            </button>
            <button
              onClick={() => onThemeSet ? onThemeSet('dark') : onThemeToggle()}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                theme === 'dark'
                  ? 'bg-slate-900 text-teal-300 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
              title="High Contrast Dark Theme"
            >
              <Moon className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 font-bold text-xs text-[#0F9F94] cursor-pointer flex items-center gap-1.5 shadow-2xs"
            title="Switch Language / भाषा बदलें"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* GLOBAL PRINT / PDF BUTTON */}
          <button
            onClick={() => window.print()}
            className="px-2.5 sm:px-3 py-1 rounded-xl bg-[#0F9F94] hover:bg-[#0D827A] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95 shrink-0"
            title="Print / Generate Clean PDF of Current View (Ctrl+P)"
            aria-label="Print Current View"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'en' ? 'Print / PDF' : 'प्रिंट'}</span>
            <span className="sm:hidden">{language === 'en' ? 'Print' : 'प्रिंट'}</span>
          </button>

          {/* Alert Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer relative shadow-2xs"
              title="Official Skill Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9.5px] font-black flex items-center justify-center animate-bounce">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {showNotificationDrawer && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                      Official Notifications
                    </span>
                    <span className="text-[10px] font-bold bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded-full">
                      {MOCK_NOTIFICATIONS.length} New
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotificationDrawer(false)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 mt-3 pr-1">
                  {MOCK_NOTIFICATIONS.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        onNavigate('alerts');
                        setShowNotificationDrawer(false);
                      }}
                      className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                          {notif.title}
                        </span>
                        <span className="text-[9px] text-slate-400 shrink-0 font-medium">{notif.timestamp}</span>
                      </div>
                      <p className="text-[10.5px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center mt-3">
                  <button
                    onClick={() => {
                      onNavigate('alerts');
                      setShowNotificationDrawer(false);
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    View All Priority Alerts →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Login / Menu */}
          <UserProfileMenu
            user={currentUser}
            onOpenLogin={onOpenLogin}
            onLogout={onLogout}
            language={language}
          />
        </div>
      </div>

      {/* 3. PRIMARY UPPER NAVIGATION TABS BAR (Midnight Navy #101828) */}
      <div className="bg-[#101828] text-white border-b border-[#1e2c42] relative shadow-xs">
        <div className="px-2 sm:px-4 flex items-center justify-between">
          {/* Scroll Left Button */}
          <button
            onClick={() => handleScrollTabs('left')}
            className="hidden md:flex p-1.5 text-slate-400 hover:text-white hover:bg-[#17243A] rounded-lg cursor-pointer shrink-0 transition-colors mr-1"
            title="Scroll Navigation Left"
            aria-label="Scroll Tabs Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Primary Navigation Track */}
          <div 
            ref={tabsContainerRef}
            className="flex-1 overflow-x-auto no-scrollbar scroll-smooth py-1.5 px-0.5"
          >
            <nav className="flex items-center space-x-1 sm:space-x-1.5 min-w-max">
              {primaryTabs.map((tab) => {
                const Icon = tab.icon;
                const isCurrentGroup = currentMainTab.id === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleMainTabClick(tab)}
                    className={`relative px-3 sm:px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isCurrentGroup
                        ? 'bg-[#1E293B] text-white shadow-xs ring-1 ring-[#0F9F94] border-b-2 border-[#0F9F94]'
                        : 'text-slate-300 hover:text-white hover:bg-[#17243A] border border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrentGroup ? 'text-[#0F9F94]' : 'text-slate-400'}`} />
                    <span>{language === 'en' ? tab.label : tab.labelHi}</span>

                    {/* Category Highlight Badge */}
                    {tab.badgeText && (
                      <span className={`text-[8.5px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider ${
                        isCurrentGroup ? 'bg-[#0F9F94]/20 text-[#0F9F94]' : 'bg-[#17243A] text-slate-300'
                      }`}>
                        {tab.badgeText}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => handleScrollTabs('right')}
            className="hidden md:flex p-1.5 text-slate-400 hover:text-white hover:bg-[#17243A] rounded-lg cursor-pointer shrink-0 transition-colors ml-1"
            title="Scroll Navigation Right"
            aria-label="Scroll Tabs Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. OFFICIAL GOVERNMENT NEWS TICKER / ANNOUNCEMENT MARQUEE (Pale Gold #FFF4D6 with Saffron #F4B942 Badge) */}
      <div className="bg-[#FFF4D6] dark:bg-[#251e10] border-b border-[#F4B942]/40 px-3 sm:px-6 py-1 flex items-center gap-2 text-xs text-[#101828] dark:text-[#FFF4D6]">
        <div className="flex items-center gap-1 shrink-0 bg-[#F4B942] text-[#101828] px-2 py-0.5 rounded font-black text-[9.5px] uppercase tracking-wider shadow-2xs">
          <AlertCircle className="w-3 h-3 text-[#101828]" />
          <span>LATEST</span>
        </div>

        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div 
            className={`inline-block text-[11px] font-medium text-[#101828] dark:text-amber-100 ${
              isTickerPaused ? '' : 'animate-marquee'
            }`}
            onMouseEnter={() => setIsTickerPaused(true)}
            onMouseLeave={() => setIsTickerPaused(false)}
          >
            <span className="font-bold text-[#101828] dark:text-white">Madhya Pradesh Pilot:</span> 55 Districts labour market demand-supply baseline calibrated • 
            <span className="font-bold text-[#101828] dark:text-white ml-3">12 Sunrise Industrial Sectors:</span> Electric Vehicles, Green Hydrogen, Precision CNC, and Pharma mapped • 
            <span className="font-bold text-[#101828] dark:text-white ml-3">Student Portal Live:</span> Apprenticeship stipend calculator (MMSKY/NAPS) and DGT viva prep active • 
            <span className="font-bold text-[#101828] dark:text-white ml-3">Policy Simulator:</span> 2026-27 ITI capacity allocation models ready for District Collectors.
          </div>
        </div>

        <button
          onClick={() => onNavigate('alerts')}
          className="shrink-0 text-[10.5px] font-bold text-[#0F9F94] hover:underline cursor-pointer hidden sm:inline"
        >
          View Notifications →
        </button>
      </div>
    </header>
  );
};
