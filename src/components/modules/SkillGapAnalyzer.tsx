import React, { useState, useMemo } from 'react';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Search, 
  Filter, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';
import { Language, OccupationItem } from '../../types';
import { translations } from '../../utils/translations';
import { MOCK_OCCUPATIONS } from '../../data/mockData';

interface SkillGapAnalyzerProps {
  language: Language;
  onNavigate: (module: string) => void;
}

export const SkillGapAnalyzer: React.FC<SkillGapAnalyzerProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');

  const filteredItems = useMemo(() => {
    return MOCK_OCCUPATIONS.filter((item) => {
      if (severityFilter !== 'all' && item.severity !== severityFilter) return false;
      if (districtFilter !== 'all' && item.district !== districtFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.ncoCode.toLowerCase().includes(q) ||
          item.sectorName.toLowerCase().includes(q) ||
          item.district.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, severityFilter, districtFilter]);

  // Aggregate stats
  const stats = useMemo(() => {
    let totalShortageVolume = 0;
    let totalOversupplyVolume = 0;
    let criticalCount = 0;
    let oversupplyCount = 0;

    MOCK_OCCUPATIONS.forEach((occ) => {
      const gap = occ.forecastDemand12m - occ.estimatedSupply;
      if (gap > 0) {
        totalShortageVolume += gap;
        if (occ.severity === 'critical_shortage') criticalCount++;
      } else {
        totalOversupplyVolume += Math.abs(gap);
        if (occ.severity === 'oversupply') oversupplyCount++;
      }
    });

    return {
      totalShortageVolume,
      totalOversupplyVolume,
      criticalCount,
      oversupplyCount,
    };
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Supply-Demand Equilibrium Engine' : 'मांग-आपूर्ति संतुलन इंजन'}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Mathematical Gap Formulation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_gap_analyzer}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Rigorous comparison of 12-month forecast labour demand against qualified available workforce supply to uncover district-level structural deficits and excess seats.'
              : 'ज़िला-स्तरीय संरचनात्मक कमी एवं अधिशेष सीटों का पता लगाने हेतु 12 माह की अनुमानित मांग बनाम योग्य कार्यबल आपूर्ति का विश्लेषण।'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('policy_simulator')}
            className="px-3.5 py-2 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Launch Policy Simulator</span>
          </button>
        </div>
      </div>

      {/* MATHEMATICAL FORMULA & PROXY DISCLAIMER CALLOUT */}
      <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-5 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6366F1] uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Mathematical Definition of Skill Gap</span>
            </div>
            <div className="p-3 bg-[#EAF0F6] dark:bg-slate-900 rounded-xl border border-[#E4EAF1] dark:border-slate-800 font-mono text-xs sm:text-sm text-[#0F9F94] dark:text-teal-300 flex items-center justify-between">
              <span>Skill Gap = Forecast Labour Demand − Qualified Workforce Supply</span>
              <span className="text-[10px] text-[#667085] dark:text-slate-400 font-sans hidden sm:inline">(Horizon = 12M)</span>
            </div>
            <p className="text-xs text-[#101828] dark:text-slate-300 leading-relaxed">
              • <strong>Positive Gap (&gt; 0):</strong> Potential Shortage (Hiring demand exceeds certified graduating pipeline).<br />
              • <strong>Negative Gap (&lt; 0):</strong> Potential Oversupply (Institutional capacity exceeds regional absorption).<br />
              • <strong>Gap Percentage:</strong> Explicitly calculated as <code className="text-[#0F9F94] dark:text-teal-300 font-mono font-bold">[(Skill Gap / Qualified Supply) × 100]</code>.
            </p>
          </div>

          <div className="p-4 bg-[#EAF0F6] dark:bg-slate-900 rounded-xl border border-[#E4EAF1] dark:border-slate-800 text-xs text-[#101828] dark:text-slate-300 space-y-2">
            <div className="flex items-center gap-1.5 text-[#D97706] dark:text-amber-400 font-bold text-[11px] uppercase tracking-wider">
              <Info className="w-3.5 h-3.5" />
              <span>Rigorous Data Boundary Note</span>
            </div>
            <p className="text-[11px] text-[#667085] dark:text-slate-400 leading-normal">
              <strong>Supply</strong> represents certified candidates discounted by historic pass rate (~72%) plus active verified job seekers. Cumulative <em>e-Shram</em> registrations are treated solely as an informal proxy indicator, NOT counted as qualified supply.
            </p>
          </div>
        </div>
      </div>

      {/* HIGH CONTRAST, CRISP QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#DC2626]/50 transition-all flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider">
            Aggregate Shortage Deficit
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#DC2626]">
            {stats.totalShortageVolume.toLocaleString()}
          </div>
          <p className="text-[11px] text-[#DC2626] font-bold mt-2 pt-2 border-t border-[#E4EAF1] dark:border-[#1e2c42]">
            Unmet technician demand in 12M
          </p>
        </div>

        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#D97706]/50 transition-all flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider">
            Critical Deficit Occupations
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#D97706]">
            {stats.criticalCount} Trades
          </div>
          <p className="text-[11px] text-[#D97706] font-bold mt-2 pt-2 border-t border-[#E4EAF1] dark:border-[#1e2c42]">
            Deficit exceeding 40% of supply
          </p>
        </div>

        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider">
            Aggregate Oversupply Surplus
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#3B82F6]">
            +{stats.totalOversupplyVolume.toLocaleString()}
          </div>
          <p className="text-[11px] text-[#3B82F6] font-bold mt-2 pt-2 border-t border-[#E4EAF1] dark:border-[#1e2c42]">
            Excess graduating capacity
          </p>
        </div>

        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#0F9F94]/50 transition-all flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider">
            Oversupplied Trades
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#0F9F94]">
            {stats.oversupplyCount} Trades
          </div>
          <p className="text-[11px] text-[#0F9F94] font-bold mt-2 pt-2 border-t border-[#E4EAF1] dark:border-[#1e2c42]">
            Candidate for seat realignment
          </p>
        </div>
      </div>

      {/* SEARCH AND SEVERITY FILTER CONTROLS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by occupation title, NCO code, sector, or district..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          >
            <option value="all">All Severity Tiers</option>
            <option value="critical_shortage">Critical Shortage (&gt;40% deficit)</option>
            <option value="moderate_shortage">Moderate Shortage</option>
            <option value="balanced">Balanced (±10%)</option>
            <option value="oversupply">Potential Oversupply (&gt;30% surplus)</option>
          </select>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          >
            <option value="all">All Pilot Districts</option>
            <option value="Rewa">Rewa</option>
            <option value="Indore">Indore</option>
            <option value="Dhar - Pithampur">Dhar - Pithampur</option>
            <option value="Gwalior">Gwalior</option>
            <option value="Jabalpur">Jabalpur</option>
            <option value="Sagar">Sagar</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Ujjain">Ujjain</option>
          </select>
        </div>
      </div>

      {/* OCCUPATIONAL GAP TABLE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Occupation & NCO Classification</th>
                <th className="px-3 py-3">District & Sector</th>
                <th className="px-3 py-3 text-right">Current Demand</th>
                <th className="px-3 py-3 text-right">12M Forecast</th>
                <th className="px-3 py-3 text-right">Qualified Supply</th>
                <th className="px-4 py-3 text-right">Skill Gap (Net)</th>
                <th className="px-3 py-3 text-center">Gap %</th>
                <th className="px-3 py-3 text-center">Severity</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.map((occ) => {
                const netGap = occ.forecastDemand12m - occ.estimatedSupply;
                const gapPct = occ.estimatedSupply > 0 
                  ? Math.round((netGap / occ.estimatedSupply) * 100) 
                  : 0;

                const isShortage = netGap > 0;
                const isOversupply = occ.severity === 'oversupply';

                return (
                  <tr key={occ.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white text-xs">
                        {occ.title}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                          {occ.ncoCode}
                        </span>
                        <span>•</span>
                        <span>NSQF Level {occ.nsqfLevel}</span>
                      </div>
                    </td>

                    <td className="px-3 py-3.5">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{occ.district}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                        {occ.sectorName}
                      </div>
                    </td>

                    <td className="px-3 py-3.5 text-right font-medium text-slate-700 dark:text-slate-300">
                      {occ.currentDemand.toLocaleString()}
                    </td>

                    <td className="px-3 py-3.5 text-right font-bold text-purple-700 dark:text-purple-400">
                      {occ.forecastDemand12m.toLocaleString()}
                    </td>

                    <td className="px-3 py-3.5 text-right font-medium text-indigo-700 dark:text-indigo-300">
                      {occ.estimatedSupply.toLocaleString()}
                    </td>

                    <td className="px-4 py-3.5 text-right font-extrabold">
                      <span className={isShortage ? 'text-rose-600 dark:text-rose-400' : isOversupply ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}>
                        {isShortage ? `-${netGap.toLocaleString()}` : isOversupply ? `+${Math.abs(netGap).toLocaleString()}` : '0'}
                      </span>
                    </td>

                    <td className="px-3 py-3.5 text-center font-bold">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                        isShortage ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60' :
                        isOversupply ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60' :
                        'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                      }`}>
                        {gapPct > 0 ? `+${gapPct}%` : `${gapPct}%`}
                      </span>
                    </td>

                    <td className="px-3 py-3.5 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        occ.severity === 'critical_shortage' ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700' :
                        occ.severity === 'moderate_shortage' ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700' :
                        occ.severity === 'oversupply' ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700' :
                        'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                      }`}>
                        {occ.severity.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => onNavigate(isShortage ? 'training_recs' : 'policy_simulator')}
                        className="text-teal-700 dark:text-teal-400 hover:underline text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isShortage ? 'Remedy' : 'Simulate'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
