import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sliders, 
  Sparkles, 
  IndianRupee, 
  Users, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Layers, 
  ChevronRight,
  RefreshCw,
  Scale,
  HardDrive
} from 'lucide-react';
import { Language, PolicyScenarioInputs, PolicyScenarioResult } from '../../types';
import { translations } from '../../utils/translations';
import { MOCK_OCCUPATIONS } from '../../data/mockData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../../utils/offlineStorage';

interface PolicySimulatorProps {
  language: Language;
}

export const PolicySimulator: React.FC<PolicySimulatorProps> = ({ language }) => {
  const t = translations[language];

  // Selected occupation
  const [selectedOccId, setSelectedOccId] = useState<string>('occ-solar-tech');

  // Load stored slider parameters from offline memory if available
  const storedPolicy = getStoredItem<{
    additionalSeats: number;
    budgetLakhs: number;
    completionRate: number;
    qualificationRate: number;
    placementRate: number;
    durationMonths: number;
    horizonMonths: 6 | 12 | 24;
  }>(STORAGE_KEYS.POLICY_SIM_STATE, {
    additionalSeats: 600,
    budgetLakhs: 85,
    completionRate: 82,
    qualificationRate: 75,
    placementRate: 68,
    durationMonths: 4,
    horizonMonths: 12,
  });

  const [additionalSeats, setAdditionalSeats] = useState<number>(storedPolicy.additionalSeats);
  const [budgetLakhs, setBudgetLakhs] = useState<number>(storedPolicy.budgetLakhs);
  const [completionRate, setCompletionRate] = useState<number>(storedPolicy.completionRate);
  const [qualificationRate, setQualificationRate] = useState<number>(storedPolicy.qualificationRate);
  const [placementRate, setPlacementRate] = useState<number>(storedPolicy.placementRate);
  const [durationMonths, setDurationMonths] = useState<number>(storedPolicy.durationMonths);
  const [horizonMonths, setHorizonMonths] = useState<6 | 12 | 24>(storedPolicy.horizonMonths);

  // Sync to offline storage
  useEffect(() => {
    setStoredItem(STORAGE_KEYS.POLICY_SIM_STATE, {
      additionalSeats,
      budgetLakhs,
      completionRate,
      qualificationRate,
      placementRate,
      durationMonths,
      horizonMonths,
    });
  }, [additionalSeats, budgetLakhs, completionRate, qualificationRate, placementRate, durationMonths, horizonMonths]);

  const occupation = useMemo(() => {
    return MOCK_OCCUPATIONS.find(o => o.id === selectedOccId) || MOCK_OCCUPATIONS[0];
  }, [selectedOccId]);

  // Baseline gap
  const baselineForecast = horizonMonths === 6 ? occupation.forecastDemand6m : occupation.forecastDemand12m;
  const baselineSupply = occupation.estimatedSupply;
  const baselineGap = baselineForecast - baselineSupply;

  // Real Policy Simulation Formula Calculations:
  const customEnrolled = additionalSeats;
  const customCertified = Math.round(customEnrolled * (completionRate / 100) * (qualificationRate / 100));
  const customPlaced = Math.round(customCertified * (placementRate / 100));
  const customNewSupply = baselineSupply + customCertified;
  const customRemainingGap = Math.max(0, baselineForecast - customNewSupply);
  const customGapReduction = baselineGap > 0 
    ? Math.min(100, Math.round(((baselineGap - customRemainingGap) / baselineGap) * 100))
    : 0;
  const customCostPerPlaced = customPlaced > 0 
    ? Math.round((budgetLakhs * 100000) / customPlaced) 
    : 0;

  // Comparison Scenarios:
  const scenariosData = useMemo(() => {
    // Scenario A: Baseline
    const scenA = {
      name: 'A. Baseline (No Action)',
      qualifiedSupply: baselineSupply,
      remainingDeficit: baselineGap,
      placedWorkers: 0,
      costPerPlaced: 0,
    };

    // Scenario B: Moderate Expansion (+250 seats)
    const bEnrolled = 250;
    const bCert = Math.round(bEnrolled * 0.8 * 0.72);
    const bPlaced = Math.round(bCert * 0.65);
    const scenB = {
      name: 'B. Moderate (+250)',
      qualifiedSupply: baselineSupply + bCert,
      remainingDeficit: Math.max(0, baselineForecast - (baselineSupply + bCert)),
      placedWorkers: bPlaced,
      costPerPlaced: 24500,
    };

    // Scenario C: Custom Policy Simulation
    const scenC = {
      name: `C. Simulated (+${additionalSeats})`,
      qualifiedSupply: customNewSupply,
      remainingDeficit: customRemainingGap,
      placedWorkers: customPlaced,
      costPerPlaced: customCostPerPlaced,
    };

    // Scenario D: Aggressive Gap Elimination
    const dEnrolled = Math.round(baselineGap / 0.6);
    const dCert = Math.round(dEnrolled * 0.85 * 0.78);
    const scenD = {
      name: 'D. Full Gap Target',
      qualifiedSupply: baselineSupply + dCert,
      remainingDeficit: Math.max(0, baselineForecast - (baselineSupply + dCert)),
      placedWorkers: Math.round(dCert * 0.72),
      costPerPlaced: 22000,
    };

    return [scenA, scenB, scenC, scenD];
  }, [baselineSupply, baselineGap, baselineForecast, additionalSeats, customNewSupply, customRemainingGap, customPlaced, customCostPerPlaced]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Evidence-Based What-If Workbench' : 'नीतिगत परिदृश्य सिम्युलेटर'}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Multi-Variable Labour Sensitivity Model</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_policy_simulator}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Model the impact of additional training seats, budget allocations, drop-out attrition, and local placement rates on net district skill deficits.'
              : 'अतिरिक्त प्रशिक्षण सीटों, बजट आवंटन, ड्रॉप-आउट दर और स्थानीय प्लेसमेंट के आधार पर शुद्ध कौशल अंतर प्रभाव का अनुकरण।'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-amber-800 dark:text-amber-300 font-mono bg-amber-50 dark:bg-amber-950/70 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800/80">
            Modelled Estimates — Subject to Placement Realities
          </span>
        </div>
      </div>

      {/* TARGET OCCUPATION SELECTOR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Target Occupation for Policy Simulation
            </label>
            <select
              value={selectedOccId}
              onChange={(e) => setSelectedOccId(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none min-w-[280px]"
            >
              {MOCK_OCCUPATIONS.map((occ) => (
                <option key={occ.id} value={occ.id}>
                  {occ.title} ({occ.district}) — Deficit: -{occ.forecastDemand12m - occ.estimatedSupply}
                </option>
              ))}
            </select>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-500 dark:text-slate-400">Baseline 12M Forecast:</span>{' '}
            <strong className="text-purple-700 dark:text-purple-300 font-mono">{baselineForecast.toLocaleString()}</strong> |{' '}
            <span className="text-slate-500 dark:text-slate-400">Current Supply:</span>{' '}
            <strong className="text-indigo-700 dark:text-indigo-300 font-mono">{baselineSupply.toLocaleString()}</strong> |{' '}
            <span className="text-slate-500 dark:text-slate-400">Initial Deficit:</span>{' '}
            <strong className="text-rose-600 dark:text-rose-400 font-mono">-{baselineGap.toLocaleString()}</strong>
          </div>
        </div>

        {/* INTERACTIVE CONTROLS SLIDERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Additional Seats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Additional Training Seats</span>
              <span className="font-mono text-teal-800 dark:text-teal-400 font-bold bg-teal-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-teal-200 dark:border-transparent">
                +{additionalSeats} Seats
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={2500}
              step={50}
              value={additionalSeats}
              onChange={(e) => setAdditionalSeats(parseInt(e.target.value, 10))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>50</span>
              <span>1,250</span>
              <span>2,500</span>
            </div>
          </div>

          {/* Slider 2: Budget Allocation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Grant Budget Outlay</span>
              <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-emerald-200 dark:border-transparent">
                ₹{budgetLakhs} Lakhs
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={300}
              step={5}
              value={budgetLakhs}
              onChange={(e) => setBudgetLakhs(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>₹10L</span>
              <span>₹150L</span>
              <span>₹300L</span>
            </div>
          </div>

          {/* Slider 3: Completion Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Trainee Completion Rate</span>
              <span className="font-mono text-indigo-800 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-indigo-200 dark:border-transparent">
                {completionRate}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              step={1}
              value={completionRate}
              onChange={(e) => setCompletionRate(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Slider 4: Qualification / Pass Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Assessment Pass Rate</span>
              <span className="font-mono text-purple-800 dark:text-purple-400 font-bold bg-purple-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-purple-200 dark:border-transparent">
                {qualificationRate}%
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={100}
              step={1}
              value={qualificationRate}
              onChange={(e) => setQualificationRate(parseInt(e.target.value, 10))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>40%</span>
              <span>70%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Slider 5: Placement Absorption Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Placement Absorption Rate</span>
              <span className="font-mono text-pink-800 dark:text-pink-400 font-bold bg-pink-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-pink-200 dark:border-transparent">
                {placementRate}%
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={95}
              step={1}
              value={placementRate}
              onChange={(e) => setPlacementRate(parseInt(e.target.value, 10))}
              className="w-full accent-pink-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>30%</span>
              <span>65%</span>
              <span>95%</span>
            </div>
          </div>

          {/* Slider 6: Training Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Course Lead Time (Duration)</span>
              <span className="font-mono text-amber-800 dark:text-amber-400 font-bold bg-amber-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-amber-200 dark:border-transparent">
                {durationMonths} Months
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={12}
              step={1}
              value={durationMonths}
              onChange={(e) => setDurationMonths(parseInt(e.target.value, 10))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>2 Mo</span>
              <span>6 Mo</span>
              <span>12 Mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIMULATED IMPACT OUTPUT CARDS - CLEAN GOVERNMENT STANDARD */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#0F9F94]/50 transition-all flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider block truncate">
            Certified Workforce
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#0F9F94]">
            +{customCertified.toLocaleString()}
          </div>
          <p className="text-[11px] text-[#0F9F94] font-bold mt-2 pt-2 border-t border-[#E4EAF1] dark:border-[#1e2c42] truncate">
            Pass rate {qualificationRate}%
          </p>
        </div>

        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#6366F1]/50 transition-all flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider block truncate">
            Placed Candidates
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#6366F1]">
            {customPlaced.toLocaleString()}
          </div>
          <p className="text-[11px] text-[#6366F1] font-bold mt-2 pt-2 border-t border-[#E4EAF1] dark:border-[#1e2c42] truncate">
            Absorption {placementRate}%
          </p>
        </div>

        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#DC2626]/50 transition-all flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider block truncate">
            Remaining Net Deficit
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#DC2626]">
            -{customRemainingGap.toLocaleString()}
          </div>
          <p className="text-[11px] text-[#16A34A] font-bold mt-2 pt-2 border-t border-[#E4EAF1] dark:border-[#1e2c42] truncate">
            Gap reduced by {customGapReduction}%
          </p>
        </div>

        <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#16A34A]/50 transition-all flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#667085] dark:text-slate-400 uppercase tracking-wider block truncate">
            Cost per Placed Worker
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#16A34A]">
            ₹{customCostPerPlaced.toLocaleString()}
          </div>
          <p className="text-[11px] text-[#667085] font-medium mt-2 pt-2 border-t border-[#E4EAF1] dark:border-[#1e2c42] truncate">
            Budget Grant: ₹{budgetLakhs}L
          </p>
        </div>
      </div>

      {/* SCENARIO COMPARATIVE BAR CHART */}
      <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#101828] dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#0F9F94]" />
              Comparative Policy Analysis (Baseline vs Intervention Options)
            </h3>
            <p className="text-[11px] text-[#667085] dark:text-slate-400">
              Evaluates remaining skill deficit vs qualified workforce additions
            </p>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scenariosData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4EAF1" opacity={0.8} />
              <XAxis dataKey="name" stroke="#667085" fontSize={11} tickLine={false} />
              <YAxis stroke="#667085" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E4EAF1', borderRadius: '12px', fontSize: '11px', color: '#101828', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08)' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="qualifiedSupply" fill="#6366F1" name="Total Qualified Supply" radius={[4, 4, 0, 0]} />
              <Bar dataKey="remainingDeficit" fill="#DC2626" name="Remaining Skill Deficit" radius={[4, 4, 0, 0]} />
              <Bar dataKey="placedWorkers" fill="#0F9F94" name="Estimated Wage Placements" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E4EAF1] dark:border-[#1e2c42] text-[11px] text-[#667085] dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>Simulation Model: Multi-stage pipeline attrition with economic absorption elasticity</span>
          <span className="text-[#D97706] font-medium">Persistent in offline memory</span>
        </div>
      </div>
    </div>
  );
};
