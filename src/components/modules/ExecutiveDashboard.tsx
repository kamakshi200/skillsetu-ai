import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Sparkles, 
  Database,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Info,
  ExternalLink,
  Factory,
  GraduationCap,
  MapPin,
  Sliders
} from 'lucide-react';
import { FilterState, Language } from '../../types';
import { translations } from '../../utils/translations';
import { MOCK_OCCUPATIONS, PILOT_DISTRICTS, EMERGING_SKILLS } from '../../data/mockData';
import { generateStatisticalForecast } from '../../utils/forecasting';
import { 
  ResponsiveContainer, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  Area, 
  ComposedChart 
} from 'recharts';

interface ExecutiveDashboardProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  language: Language;
  onNavigate: (module: string) => void;
  subTab?: string;
}

const SECTOR_COLORS = ['#0d9488', '#6366f1', '#f59e0b', '#ec4899', '#3b82f6', '#10b981'];

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  filters,
  onFilterChange,
  language,
  onNavigate,
  subTab,
}) => {
  const t = translations[language];

  // Handle incoming subTab navigation
  React.useEffect(() => {
    if (!subTab) return;
    if (subTab === 'kpis') {
      const el = document.getElementById('executive-kpis-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (subTab === 'sectors') {
      const el = document.getElementById('executive-sector-demand');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (subTab === 'districts') {
      const el = document.getElementById('executive-district-watchlist');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (subTab === 'balance') {
      const el = document.getElementById('executive-balance-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [subTab]);

  // Filter occupations according to selected district, sector, occupation
  const filteredOccupations = useMemo(() => {
    return MOCK_OCCUPATIONS.filter((occ) => {
      if (filters.district !== 'all' && occ.district !== filters.district) return false;
      if (filters.sector !== 'all' && occ.sectorId !== filters.sector) return false;
      if (filters.occupation !== 'all' && occ.id !== filters.occupation) return false;
      return true;
    });
  }, [filters]);

  // Aggregate KPI metrics
  const aggregateMetrics = useMemo(() => {
    let observedDemand = 0;
    let qualifiedSupply = 0;
    let forecastDemand = 0;
    let trainingSeats = 0;
    let shortageCount = 0;
    let oversupplyCount = 0;

    filteredOccupations.forEach((occ) => {
      observedDemand += occ.currentDemand;
      qualifiedSupply += occ.estimatedSupply;
      forecastDemand += filters.horizon === 6 ? occ.forecastDemand6m : occ.forecastDemand12m;
      trainingSeats += occ.trainingCapacity;
      if (occ.severity === 'critical_shortage' || occ.severity === 'moderate_shortage') shortageCount++;
      if (occ.severity === 'oversupply') oversupplyCount++;
    });

    const netSkillGap = forecastDemand - qualifiedSupply;
    const gapPercentage = qualifiedSupply > 0 ? Math.round((netSkillGap / qualifiedSupply) * 100) : 0;

    return {
      observedDemand,
      qualifiedSupply,
      forecastDemand,
      trainingSeats,
      shortageCount,
      oversupplyCount,
      netSkillGap,
      gapPercentage,
    };
  }, [filteredOccupations, filters.horizon]);

  // Build aggregate monthly historical + forecast time-series
  const timeSeriesData = useMemo(() => {
    if (filteredOccupations.length === 0) return [];
    
    const primaryOcc = filteredOccupations[0];
    const forecastRes = generateStatisticalForecast(primaryOcc.monthlyHistory, filters.horizon);

    return forecastRes.allPoints.map((pt) => ({
      month: pt.month,
      historicalDemand: !pt.isForecast ? pt.observedDemand : null,
      forecastDemand: pt.isForecast ? pt.forecastDemand : pt.observedDemand,
      qualifiedSupply: pt.qualifiedSupply,
      lower80: pt.isForecast ? pt.forecastLower80 : null,
      upper80: pt.isForecast ? pt.forecastUpper80 : null,
      isForecast: pt.isForecast,
    }));
  }, [filteredOccupations, filters.horizon]);

  // Sector breakdown data for Pie Chart
  const sectorBreakdown = useMemo(() => {
    const map: { [key: string]: { name: string; value: number } } = {};
    MOCK_OCCUPATIONS.forEach((occ) => {
      if (!map[occ.sectorName]) {
        map[occ.sectorName] = { name: occ.sectorName, value: 0 };
      }
      map[occ.sectorName].value += occ.currentDemand;
    });
    return Object.values(map);
  }, []);

  // Top Shortage & Top Oversupply rankings
  const shortageRankings = useMemo(() => {
    return [...MOCK_OCCUPATIONS]
      .filter((o) => o.severity === 'critical_shortage')
      .sort((a, b) => (b.forecastDemand12m - b.estimatedSupply) - (a.forecastDemand12m - a.estimatedSupply))
      .slice(0, 4);
  }, []);

  const oversupplyRankings = useMemo(() => {
    return [...MOCK_OCCUPATIONS]
      .filter((o) => o.severity === 'oversupply')
      .sort((a, b) => (b.estimatedSupply - b.currentDemand) - (a.estimatedSupply - a.currentDemand))
      .slice(0, 3);
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Clean & Authoritative Government Decision Support Header */}
      <div className="relative overflow-hidden bg-white dark:bg-[#17243A] rounded-xl sm:rounded-2xl border border-[#E4EAF1] dark:border-[#1e2c42] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10.5px] font-bold bg-[#EAF0F6] text-[#0F9F94] dark:bg-teal-950/60 dark:text-teal-300 border border-[#14B8A6]/30 tracking-wider uppercase">
                GOVERNMENT OF INDIA • MSDE
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs hidden sm:inline">•</span>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                National Labour Market Intelligence System (NLMIS)
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs hidden sm:inline">•</span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Madhya Pradesh State Pilot (55 Districts)
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#101828] dark:text-white tracking-tight font-sans">
              Labour Market Intelligence
            </h2>

            <p className="text-xs sm:text-sm text-[#667085] dark:text-slate-300 max-w-3xl leading-relaxed font-normal">
              Understand skill demand, forecast workforce gaps and plan smarter training investments across Madhya Pradesh's 55 districts and 12 priority industrial corridors.
            </p>
          </div>

          {/* Quick Action Shortcuts & Horizon Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0 pt-2 lg:pt-0">
            {/* Horizon Selector */}
            <div className="flex items-center bg-[#F3F6FA] dark:bg-slate-800 p-1 rounded-xl border border-[#E4EAF1] dark:border-slate-700 text-xs">
              <span className="px-2 text-slate-500 dark:text-slate-400 text-[11px] font-medium">Horizon:</span>
              <button
                onClick={() => onFilterChange({ horizon: 6 })}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  filters.horizon === 6
                    ? 'bg-[#0F9F94] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                6 Months
              </button>
              <button
                onClick={() => onFilterChange({ horizon: 12 })}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  filters.horizon === 12
                    ? 'bg-[#0F9F94] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                12 Months
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onNavigate('industrial_sector')}
                className="px-3.5 py-1.5 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-lg text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Factory className="w-3.5 h-3.5" />
                <span>12 Industrial Sectors</span>
              </button>
              <button
                onClick={() => onNavigate('student_portal')}
                className="px-3.5 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#101828] dark:text-slate-200 border border-[#E4EAF1] dark:border-slate-700 rounded-lg text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#0F9F94]" />
                <span>Student Career Portal</span>
              </button>
              <button
                onClick={() => onNavigate('reports')}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#101828] dark:text-slate-200 border border-[#E4EAF1] dark:border-slate-700 rounded-lg text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Export Brief</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#0F9F94]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{language === 'en' ? 'Interactive Filters & Dimensional Slices' : 'इंटरैक्टिव फ़िल्टर एवं क्षेत्रीय चयन'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* State Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              {t.filter_state}
            </label>
            <select
              value={filters.state}
              onChange={(e) => onFilterChange({ state: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
            >
              <option value="madhya_pradesh">Madhya Pradesh (Pilot State)</option>
              <option value="maharashtra">Maharashtra (Data Ingesting)</option>
              <option value="gujarat">Gujarat (Data Ingesting)</option>
              <option value="karnataka">Karnataka (Data Ingesting)</option>
            </select>
          </div>

          {/* District Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              {t.filter_district}
            </label>
            <select
              value={filters.district}
              onChange={(e) => onFilterChange({ district: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
            >
              <option value="all">{t.all_districts}</option>
              {PILOT_DISTRICTS.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district} ({d.gapSeverity})
                </option>
              ))}
            </select>
          </div>

          {/* Sector Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              {t.filter_sector}
            </label>
            <select
              value={filters.sector}
              onChange={(e) => onFilterChange({ sector: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
            >
              <option value="all">{t.all_sectors}</option>
              <option value="renewable_energy">Renewable Energy & Green Jobs</option>
              <option value="automotive_ev">Automotive & EV Technology</option>
              <option value="manufacturing">Manufacturing & Industry 4.0</option>
              <option value="it_software">IT & Digital Services</option>
              <option value="aerospace_agri">Agro-Tech & Logistics</option>
              <option value="healthcare">Healthcare & Allied Services</option>
              <option value="office_admin">Traditional Administrative Services</option>
            </select>
          </div>

          {/* Trade / Occupation Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              {t.filter_occupation}
            </label>
            <select
              value={filters.occupation}
              onChange={(e) => onFilterChange({ occupation: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
            >
              <option value="all">{t.all_occupations}</option>
              {MOCK_OCCUPATIONS.map((occ) => (
                <option key={occ.id} value={occ.id}>
                  {occ.title} ({occ.ncoCode})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Sector Preset Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mr-1">Quick Sectors:</span>
          <button
            type="button"
            onClick={() => onFilterChange({ sector: 'all', occupation: 'all' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filters.sector === 'all' 
                ? 'bg-[#0F9F94] text-white shadow-xs font-bold' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            All Priority Sectors
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ sector: 'automotive_ev', occupation: 'all' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filters.sector === 'automotive_ev'
                ? 'bg-[#0F9F94] text-white shadow-xs font-bold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            EV & Automotive
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ sector: 'renewable_energy', occupation: 'all' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filters.sector === 'renewable_energy'
                ? 'bg-[#0F9F94] text-white shadow-xs font-bold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Solar & Clean Energy
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ sector: 'manufacturing', occupation: 'all' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filters.sector === 'manufacturing'
                ? 'bg-[#0F9F94] text-white shadow-xs font-bold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Precision Tooling & CNC
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ sector: 'healthcare', occupation: 'all' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filters.sector === 'healthcare'
                ? 'bg-[#0F9F94] text-white shadow-xs font-bold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Pharma & Healthcare
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ sector: 'it_software', occupation: 'all' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filters.sector === 'it_software'
                ? 'bg-[#0F9F94] text-white shadow-xs font-bold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            IT & Semiconductors
          </button>
        </div>

        {/* Active filter summary pill bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>Showing:</span>
            <span className="font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/60 px-2 py-0.5 rounded">
              {filters.district === 'all' ? 'All MP Pilot Districts' : filters.district}
            </span>
            <span className="font-semibold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 px-2 py-0.5 rounded">
              {filters.sector === 'all' ? 'All Priority Sectors' : filters.sector}
            </span>
            <span>({filteredOccupations.length} Occupations tracked)</span>
          </div>

          <button
            onClick={() => onFilterChange({ district: 'all', sector: 'all', occupation: 'all' })}
            className="text-teal-700 dark:text-teal-400 hover:underline cursor-pointer font-semibold"
          >
            {t.btn_reset}
          </button>
        </div>
      </div>

      {/* PREMIUM 6-METRIC GOVERNMENT KPI CARDS */}
      <div id="executive-kpis-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Card 1: Current Job Demand (Teal #0F9F94 / Green #16A34A Growth) */}
        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between hover:border-[#0F9F94]/50 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider truncate">
                Current Job Demand
              </span>
              <div className="p-1.5 rounded-lg bg-[#0F9F94]/10 text-[#0F9F94] shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#101828] dark:text-white tracking-tight">
                {aggregateMetrics.observedDemand.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-[#667085] dark:text-slate-400">jobs</span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] border-t border-[#E4EAF1] dark:border-[#1e2c42] pt-2">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold text-[#16A34A] bg-[#16A34A]/10">
              <ArrowUpRight className="w-3 h-3" /> +2.4% vs last month
            </span>
            <span className="text-[#667085] dark:text-slate-400 font-medium">NCS Verified</span>
          </div>
        </div>

        {/* Card 2: Forecast Demand (Indigo #6366F1) */}
        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between hover:border-[#6366F1]/50 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider truncate">
                Forecast ({filters.horizon}M)
              </span>
              <div className="p-1.5 rounded-lg bg-[#6366F1]/10 text-[#6366F1] shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#6366F1] dark:text-indigo-400 tracking-tight">
                {aggregateMetrics.forecastDemand.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-[#667085] dark:text-slate-400">jobs</span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] border-t border-[#E4EAF1] dark:border-[#1e2c42] pt-2">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold text-[#6366F1] bg-[#6366F1]/10">
              <ArrowUpRight className="w-3 h-3" /> +14.6% vs baseline
            </span>
            <span className="text-[#667085] dark:text-slate-400 font-medium">Holt-Winters 95%</span>
          </div>
        </div>

        {/* Card 3: Estimated Qualified Supply (Blue #3B82F6 / Amber Contraction) */}
        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between hover:border-[#3B82F6]/50 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider truncate">
                Qualified Supply
              </span>
              <div className="p-1.5 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] shrink-0">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#101828] dark:text-white tracking-tight">
                {aggregateMetrics.qualifiedSupply.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-[#667085] dark:text-slate-400">pool</span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] border-t border-[#E4EAF1] dark:border-[#1e2c42] pt-2">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold text-[#D97706] bg-[#D97706]/10">
              <ArrowDownRight className="w-3 h-3" /> -1.8% vs last month
            </span>
            <span className="text-[#667085] dark:text-slate-400 font-medium">ITI / Poly Pool</span>
          </div>
        </div>

        {/* Card 4: Critical Skill Gaps (Alert Red #DC2626) */}
        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between hover:border-[#DC2626]/50 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider truncate">
                Critical Skill Gaps
              </span>
              <div className="p-1.5 rounded-lg bg-[#DC2626]/10 text-[#DC2626] shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#DC2626] tracking-tight">
                -{aggregateMetrics.netSkillGap > 0 ? aggregateMetrics.netSkillGap.toLocaleString() : Math.abs(aggregateMetrics.netSkillGap).toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-[#DC2626]">deficit</span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] border-t border-[#E4EAF1] dark:border-[#1e2c42] pt-2">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold text-[#DC2626] bg-[#DC2626]/10">
              <ArrowUpRight className="w-3 h-3" /> +8.4% vs last month
            </span>
            <span className="text-[#DC2626] font-bold">{aggregateMetrics.shortageCount} Deficits</span>
          </div>
        </div>

        {/* Card 5: Emerging Skills (Saffron Gold #F4B942 / Green Growth) */}
        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between hover:border-[#F4B942]/50 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider truncate">
                Emerging Skills
              </span>
              <div className="p-1.5 rounded-lg bg-[#F4B942]/20 text-[#D97706] dark:text-[#F4B942] shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#101828] dark:text-white tracking-tight">
                24
              </span>
              <span className="text-[11px] font-medium text-[#667085] dark:text-slate-400">sunrise</span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] border-t border-[#E4EAF1] dark:border-[#1e2c42] pt-2">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold text-[#16A34A] bg-[#16A34A]/10">
              <ArrowUpRight className="w-3 h-3" /> +31.2% vs last month
            </span>
            <span className="text-[#667085] dark:text-slate-400 font-medium">EV • Green H2</span>
          </div>
        </div>

        {/* Card 6: Training Capacity (Emerald Green #16A34A) */}
        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between hover:border-[#16A34A]/50 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider truncate">
                Training Capacity
              </span>
              <div className="p-1.5 rounded-lg bg-[#16A34A]/10 text-[#16A34A] shrink-0">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#101828] dark:text-white tracking-tight">
                {aggregateMetrics.trainingSeats.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-[#667085] dark:text-slate-400">seats</span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] border-t border-[#E4EAF1] dark:border-[#1e2c42] pt-2">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold text-[#16A34A] bg-[#16A34A]/10">
              <ArrowUpRight className="w-3 h-3" /> +5.2% vs last month
            </span>
            <span className="text-[#667085] dark:text-slate-400 font-medium">55 MP Districts</span>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1: HISTORICAL VS FORECAST DEMAND + SECTOR DISTRIBUTION */}
      <div id="executive-balance-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Time-Series Forecast Chart (Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#101828] dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0F9F94]" />
                {language === 'en' ? 'Observed Demand vs 12-Month Projections' : 'अवलोकित मांग बनाम 12 माह का पूर्वानुमान'}
              </h3>
              <p className="text-[11px] text-[#667085] dark:text-slate-400">
                Triple Exponential Smoothing with 95% Confidence Intervals & Holdout Evaluation
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#667085] dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#0F9F94] inline-block"></span> Observed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#6366F1] inline-block border-dashed"></span> Forecast
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#3B82F6] inline-block"></span> Supply
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4EAF1" opacity={0.8} />
                <XAxis 
                  dataKey="month" 
                  stroke="#667085" 
                  fontSize={10} 
                  tickLine={false} 
                  interval={3}
                />
                <YAxis 
                  stroke="#667085" 
                  fontSize={10} 
                  tickLine={false} 
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E4EAF1', borderRadius: '12px', fontSize: '11px', color: '#101828', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08)' }}
                  labelStyle={{ color: '#101828', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="upper80" 
                  stroke="none" 
                  fill="#6366F1" 
                  fillOpacity={0.12} 
                  name="Confidence Bound (95%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="historicalDemand" 
                  stroke="#0F9F94" 
                  strokeWidth={2.5} 
                  dot={{ r: 2.5, fill: '#0F9F94' }} 
                  name="Observed Job Demand"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecastDemand" 
                  stroke="#6366F1" 
                  strokeWidth={2.5} 
                  strokeDasharray="4 4" 
                  dot={{ r: 2.5, fill: '#6366F1' }} 
                  name="Forecast Hiring Demand"
                />
                <Line 
                  type="monotone" 
                  dataKey="qualifiedSupply" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={false} 
                  name="Qualified Supply Pool"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sectoral Demand Share Donut Chart */}
        <div id="executive-sector-demand" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {language === 'en' ? 'Sectoral Demand Concentration' : 'क्षेत्रीय मांग संकेंद्रण'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              Distribution across sunrise priority industries
            </p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorBreakdown}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sectorBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '11px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] mt-2 border-t border-slate-100 dark:border-slate-800 pt-3">
            {sectorBreakdown.slice(0, 4).map((s, idx) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: SECTOR_COLORS[idx % SECTOR_COLORS.length] }}></span>
                  <span className="text-slate-700 dark:text-slate-300 truncate">{s.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-200">{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2: TOP SHORTAGE VS TOP OVERSUPPLY RANKINGS */}
      <div id="executive-district-watchlist" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Highest Shortage Occupations */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                {language === 'en' ? 'Critical Shortage Occupations (12M Deficit)' : 'गंभीर कमी वाले व्यवसाय (12 माह का अंतर)'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Sorted by absolute projected gap: Demand − Qualified Workforce Supply
              </p>
            </div>
            <button
              onClick={() => onNavigate('training_recs')}
              className="text-xs text-teal-700 dark:text-teal-400 hover:underline font-semibold"
            >
              View Training Fixes →
            </button>
          </div>

          <div className="space-y-3">
            {shortageRankings.map((occ) => {
              const gap = occ.forecastDemand12m - occ.estimatedSupply;
              const fillPct = Math.min(100, Math.round((occ.estimatedSupply / occ.forecastDemand12m) * 100));

              return (
                <div key={occ.id} className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {occ.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">{occ.ncoCode}</span>
                        <span>•</span>
                        <span>{occ.district}</span>
                        <span>•</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">+{occ.growthRateYoY}% YoY Growth</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
                        -{gap.toLocaleString()} Deficit
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Supply covers {fillPct}%</p>
                    </div>
                  </div>

                  {/* Visual ratio bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mt-2.5 overflow-hidden flex">
                    <div className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-l-full" style={{ width: `${fillPct}%` }}></div>
                    <div className="bg-rose-500/80 h-full rounded-r-full" style={{ width: `${100 - fillPct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highest Oversupply Occupations */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                {language === 'en' ? 'Potential Oversupply Trades (Surplus Risk)' : 'संभावित अधिशेष वाले ट्रेड (अतिरिक्त आपूर्ति)'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Institutional completions exceed regional absorption; candidate for curriculum sunset
              </p>
            </div>
            <button
              onClick={() => onNavigate('policy_simulator')}
              className="text-xs text-teal-700 dark:text-teal-400 hover:underline font-semibold"
            >
              Simulate Sunset →
            </button>
          </div>

          <div className="space-y-3">
            {oversupplyRankings.map((occ) => {
              const surplus = occ.estimatedSupply - occ.currentDemand;
              const ratio = (occ.estimatedSupply / Math.max(1, occ.currentDemand)).toFixed(1);

              return (
                <div key={occ.id} className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {occ.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">{occ.ncoCode}</span>
                        <span>•</span>
                        <span>{occ.district}</span>
                        <span>•</span>
                        <span className="text-rose-600 dark:text-rose-400 font-semibold">{occ.growthRateYoY}% Demand Drop</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400">
                        +{surplus.toLocaleString()} Surplus
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{ratio}x Local Demand</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 bg-slate-100 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800/80">
                    <strong className="text-slate-800 dark:text-slate-300">Policy Note:</strong> {occ.notes}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER AUDIT & CITATIONS SECTION */}
      <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <Database className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-300">Data Sources Synchronized:</span>{' '}
            NCS Monthly Signals • DGT ITI MIS Capacity • NCVET NSQF Register • e-Shram Proxy Reference.
          </div>
        </div>
        <div className="flex items-center space-x-4 shrink-0 text-[11px]">
          <span>Last Model Run: <strong className="text-slate-800 dark:text-slate-200">Today, 06:00 IST</strong></span>
          <button
            onClick={() => onNavigate('sources_methodology')}
            className="text-teal-700 dark:text-teal-400 hover:underline font-semibold"
          >
            Review Governance →
          </button>
        </div>
      </div>
    </div>
  );
};
