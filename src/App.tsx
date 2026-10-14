import React, { useState, useEffect } from 'react';
import { Language, Theme, FilterState, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthModal } from './components/AuthModal';
import { DEFAULT_OFFICER } from './data/officerProfiles';
import { ExecutiveDashboard } from './components/modules/ExecutiveDashboard';
import { DemandForecasting } from './components/modules/DemandForecasting';
import { SkillGapAnalyzer } from './components/modules/SkillGapAnalyzer';
import { RegionalIntelligenceMap } from './components/modules/RegionalIntelligenceMap';
import { EmergingSkillsRadar } from './components/modules/EmergingSkillsRadar';
import { TrainingRecommendations } from './components/modules/TrainingRecommendations';
import { GovernmentSchemes } from './components/modules/GovernmentSchemes';
import { EmployerDemand } from './components/modules/EmployerDemand';
import { PolicySimulator } from './components/modules/PolicySimulator';
import { AiResearchAssistant } from './components/modules/AiResearchAssistant';
import { SkillExtraction } from './components/modules/SkillExtraction';
import { AlertsCenter } from './components/modules/AlertsCenter';
import { ReportsExport } from './components/modules/ReportsExport';
import { MethodologyGovernance } from './components/modules/MethodologyGovernance';
import { IndustrialSectorHub } from './components/modules/IndustrialSectorHub';
import { StudentCareerPortal } from './components/modules/StudentCareerPortal';
import { GovernmentFooter } from './components/GovernmentFooter';
import { 
  getStoredItem, 
  setStoredItem, 
  STORAGE_KEYS 
} from './utils/offlineStorage';

export default function App() {
  // Offline memory initialization: light mode by default!
  const [language, setLanguage] = useState<Language>(() => 
    getStoredItem<Language>(STORAGE_KEYS.LANGUAGE, 'en')
  );
  // Government Professional Theme: defaults to 'light' on first visit, preserves user choice
  const [theme, setTheme] = useState<Theme>(() => {
    return getStoredItem<Theme>(STORAGE_KEYS.THEME, 'light') || 'light';
  });
  const [activeModule, setActiveModule] = useState<string>(() => 
    getStoredItem<string>(STORAGE_KEYS.ACTIVE_MODULE, 'dashboard')
  );
  const [activeSubTab, setActiveSubTab] = useState<string>('kpis');
  const [unreadAlertsCount, setUnreadAlertsCount] = useState<number>(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Officer Profile & Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() =>
    getStoredItem<UserProfile | null>(STORAGE_KEYS.USER_PROFILE, DEFAULT_OFFICER)
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [filters, setFilters] = useState<FilterState>(() => 
    getStoredItem<FilterState>(STORAGE_KEYS.FILTERS, {
      state: 'madhya_pradesh',
      district: 'all',
      sector: 'all',
      occupation: 'all',
      skill: 'all',
      horizon: 12,
      timeRange: '2Y',
    })
  );

  // Sync state changes with offline localStorage cache
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      setStoredItem(STORAGE_KEYS.FILTERS, updated);
      return updated;
    });
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setStoredItem(STORAGE_KEYS.LANGUAGE, lang);
  };

  const handleModuleNavigate = (moduleId: string, subTab?: string) => {
    setActiveModule(moduleId);
    if (subTab) {
      setActiveSubTab(subTab);
    }
    setStoredItem(STORAGE_KEYS.ACTIVE_MODULE, moduleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleThemeToggle = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      setStoredItem(STORAGE_KEYS.THEME, nextTheme);
      return nextTheme;
    });
  };

  const handleThemeSet = (newTheme: Theme) => {
    setTheme(newTheme);
    setStoredItem(STORAGE_KEYS.THEME, newTheme);
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setStoredItem(STORAGE_KEYS.USER_PROFILE, user);
    // If the officer has a specific district assignment, sync default filter
    if (user.district && user.district !== 'all') {
      handleFilterChange({ district: user.district });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setStoredItem(STORAGE_KEYS.USER_PROFILE, null);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#0B1120';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#F3F6FA';
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0B1120] text-slate-100' : 'bg-[#F3F6FA] text-[#101828]'} flex flex-col font-sans transition-colors duration-200 antialiased`}>
      {/* Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onThemeSet={handleThemeSet}
        activeModule={activeModule}
        activeSubTab={activeSubTab}
        onNavigate={handleModuleNavigate}
        unreadAlertsCount={unreadAlertsCount}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        currentUser={currentUser}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Workspace with Sidebar Drawer and Module Canvas */}
      <div className="flex-1 flex overflow-hidden print:overflow-visible relative">
        {/* Navigation Sidebar (Mobile & Desktop Drawer) */}
        <Sidebar
          activeModule={activeModule}
          onNavigate={handleModuleNavigate}
          language={language}
          unreadAlertsCount={unreadAlertsCount}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic Content Area (with safe bottom padding for mobile phone bar) */}
        <main className="flex-1 overflow-y-auto print:overflow-visible px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full pb-20 lg:pb-8 print:p-0 print:max-w-none">
          {/* OFFICIAL GOVERNMENT PRINT BANNER (Renders cleanly on printed paper / PDF export) */}
          <div className="hidden print:block mb-6 pb-4 border-b-2 border-[#101828]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#101828] text-white font-black text-sm flex items-center justify-center border border-[#0F9F94]">
                  MSDE
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-[#101828] uppercase tracking-wide">
                    SkillSetu AI — Labour Market Intelligence Platform
                  </h1>
                  <p className="text-xs font-semibold text-slate-700">
                    Ministry of Skill Development & Entrepreneurship (MSDE) • Government of India
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Madhya Pradesh State Pilot (55 Districts) • NCO-2015 & NSQF Standardized
                  </p>
                </div>
              </div>
              <div className="text-right text-[10px] text-slate-600">
                <p className="font-bold text-[#101828] text-xs uppercase">Official Intelligence Brief</p>
                <p>Module: <span className="font-bold text-[#0F9F94]">{activeModule.replace('_', ' ').toUpperCase()}</span></p>
                <p>District Filter: <span className="font-semibold text-slate-900">{filters.district === 'all' ? 'All 55 Districts' : filters.district}</span></p>
                <p>Forecast Horizon: <span className="font-semibold text-slate-900">{filters.horizon} Months</span></p>
                <p>Generated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>
          {activeModule === 'dashboard' && (
            <ExecutiveDashboard
              filters={filters}
              onFilterChange={handleFilterChange}
              language={language}
              onNavigate={handleModuleNavigate}
              subTab={activeSubTab}
            />
          )}

          {activeModule === 'forecasting' && (
            <DemandForecasting
              filters={filters}
              onFilterChange={handleFilterChange}
              language={language}
            />
          )}

          {activeModule === 'gap_analyzer' && (
            <SkillGapAnalyzer
              language={language}
              onNavigate={handleModuleNavigate}
            />
          )}

          {activeModule === 'regional_map' && (
            <RegionalIntelligenceMap
              language={language}
              onNavigate={handleModuleNavigate}
            />
          )}

          {activeModule === 'emerging_skills' && (
            <EmergingSkillsRadar
              language={language}
              onNavigate={handleModuleNavigate}
            />
          )}

          {activeModule === 'training_recs' && (
            <TrainingRecommendations
              language={language}
              onNavigate={handleModuleNavigate}
            />
          )}

          {activeModule === 'gov_schemes' && (
            <GovernmentSchemes
              language={language}
            />
          )}

          {activeModule === 'student_portal' && (
            <StudentCareerPortal
              language={language}
              onNavigate={handleModuleNavigate}
              subTab={activeSubTab}
            />
          )}

          {activeModule === 'industrial_sector' && (
            <IndustrialSectorHub
              language={language}
              onNavigate={handleModuleNavigate}
              subTab={activeSubTab}
            />
          )}

          {activeModule === 'employer_demand' && (
            <EmployerDemand
              language={language}
            />
          )}

          {activeModule === 'policy_simulator' && (
            <PolicySimulator
              language={language}
            />
          )}

          {activeModule === 'ai_assistant' && (
            <AiResearchAssistant
              language={language}
            />
          )}

          {activeModule === 'skill_extraction' && (
            <SkillExtraction
              language={language}
            />
          )}

          {activeModule === 'alerts' && (
            <AlertsCenter
              language={language}
              onNavigate={handleModuleNavigate}
              onMarkAllRead={() => setUnreadAlertsCount(0)}
            />
          )}

          {activeModule === 'reports' && (
            <ReportsExport
              language={language}
            />
          )}

          {activeModule === 'sources_methodology' && (
            <MethodologyGovernance
              language={language}
            />
          )}

          {/* Official Government of India Portal Footer */}
          <div className="mt-12 -mx-3 sm:-mx-6 lg:-mx-8">
            <GovernmentFooter
              language={language}
              onNavigate={handleModuleNavigate}
            />
          </div>
        </main>
      </div>

      {/* Portable Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeModule={activeModule}
        onNavigate={handleModuleNavigate}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        language={language}
      />

      {/* Officer Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        language={language}
      />
    </div>
  );
}
