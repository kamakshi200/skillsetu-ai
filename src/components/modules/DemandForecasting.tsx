import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  HelpCircle, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  Database,
  ArrowRight,
  Info
} from 'lucide-react';
import { FilterState, Language } from '../../types';
import { translations } from '../../utils/translations';
import { MOCK_OCCUPATIONS } from '../../data/mockData';
import { generateStatisticalForecast } from '../../utils/forecasting';
import { 
  ResponsiveContainer, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Area, 
  ComposedChart 
} from 'recharts';

interface DemandForecastingProps {
  filters: FilterState;
  onFilterChange?: (filters: Partial<FilterState>) => void;
  language: Language;
}

export const DemandForecasting: React.FC<DemandForecastingProps> = ({
  filters,
  language,
}) => {
  const t = translations[language];

  // Selected occupation for time-series inspection
  const [selectedOccId, setSelectedOccId] = useState<string>('occ-solar-tech');
  const [forecastHorizon, setForecastHorizon] = useState<6 | 12>(12);
  const [confidenceLevel, setConfidenceLevel] = useState<'80' | '95'>('95');

  // Selected occupation entity
  const occupation = useMemo(() => {
    return MOCK_OCCUPATIONS.find((o) => o.id === selectedOccId) || MOCK_OCCUPATIONS[0];
  }, [selectedOccId]);

  // Compute reproducible forecast using statistical pipeline
  const forecastResult = useMemo(() => {
    return generateStatisticalForecast(occupation.monthlyHistory, forecastHorizon);
  }, [occupation, forecastHorizon]);

  // Formatted data points for Recharts
  const chartData = useMemo(() => {
    if (!forecastResult.hasSufficientData) return [];

    return forecastResult.allPoints.map((pt) => ({
      month: pt.month,
      observed: !pt.isForecast ? pt.observedDemand : null,
      forecast: pt.isForecast ? pt.forecastDemand : null,
      supply: pt.qualifiedSupply,
      lower: pt.isForecast 
        ? (confidenceLevel === '95' ? pt.forecastLower95 : pt.forecastLower80) 
        : null,
      upper: pt.isForecast 
        ? (confidenceLevel === '95' ? pt.forecastUpper95 : pt.forecastUpper80) 
        : null,
      isForecast: pt.isForecast,
    }));
  }, [forecastResult, confidenceLevel]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Predictive Econometrics' : 'भविष्यसूचक अर्थमिति'}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Triple Exponential Smoothing (Holt-Winters)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_forecasting}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Reproducible mathematical time-series forecasting calibrated with chronological backtesting, error minimization (MAE/WAPE), and uncertainty bounds.'
              : 'कालक्रमानुसार बैकटेस्टिंग, न्यूनतम त्रुटि (MAE/WAPE) एवं अनिश्चितता सीमाओं से युक्त गणितीय समय-श्रृंखला पूर्वानुमान।'}
          </p>
        </div>

        {/* Official Statistical Model Badge */}
        <div className="text-right">
          <span className="inline-block text-[11px] font-mono font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800/80 px-2.5 py-1 rounded-lg">
            TIME-SERIES STATISTICAL FORECAST ENGINE
          </span>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Holdout backtested on 24-month series</p>
        </div>
      </div>

      {/* FORECAST CONFIGURATION & OCCUPATION SELECTOR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Target Occupation Dropdown */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Target Trade / Occupation Time-Series</span>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 font-normal">NCO-2015 Classification</span>
            </label>
            <select
              value={selectedOccId}
              onChange={(e) => setSelectedOccId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:ring-1 focus:ring-teal-500 focus:outline-none"
            >
              {MOCK_OCCUPATIONS.map((occ) => (
                <option key={occ.id} value={occ.id}>
                  {occ.title} ({occ.district}) — {occ.ncoCode}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Sector: <strong className="text-slate-700 dark:text-slate-300">{occupation.sectorName}</strong> | NSQF Level {occupation.nsqfLevel}
            </p>
          </div>

          {/* Forecast Horizon Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Forecast Horizon
            </label>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => setForecastHorizon(6)}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  forecastHorizon === 6 ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                6 Months (Short)
              </button>
              <button
                onClick={() => setForecastHorizon(12)}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  forecastHorizon === 12 ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                12 Months (Annual)
              </button>
            </div>
          </div>

          {/* Confidence Intervals Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Prediction Interval Width
            </label>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => setConfidenceLevel('80')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  confidenceLevel === '80' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                80% Interval
              </button>
              <button
                onClick={() => setConfidenceLevel('95')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  confidenceLevel === '95' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                95% Interval
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FORECAST OUTPUT OR INSUFFICIENT DATA FALLBACK */}
      {!forecastResult.hasSufficientData ? (
        <div className="bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/60 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 mx-auto flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Insufficient Data for Reliable Forecasting
          </h3>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 leading-relaxed">
            {forecastResult.message}
          </p>
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-left text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <p><strong>Statistical Reliability Standard:</strong> The platform prohibits fabricating projections when observations fail the minimum statistical threshold (N ≥ 8 monthly records).</p>
            <p><strong>Recommended Planner Action:</strong> Initiate an active district employer survey in Sagar or utilize State-level proxy extrapolations.</p>
          </div>
          <button
            onClick={() => setSelectedOccId('occ-solar-tech')}
            className="mt-5 px-4 py-2 bg-[#0F9F94] hover:bg-[#0D827A] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Switch to High-Volume Series (Solar PV Rooftop Technician)
          </button>
        </div>
      ) : (
        <>
          {/* MAIN TIME-SERIES VISUALIZATION */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  {occupation.title} — Historical Signals vs {forecastHorizon}-Month Forecast
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Deduplicated hiring demand with {confidenceLevel}% prediction interval expansion factor: σ · √(step)
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#667085] dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#0F9F94] inline-block rounded"></span> Observed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#6366F1] inline-block rounded border-dashed"></span> Forecast
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#3B82F6] inline-block rounded"></span> Qualified Supply
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#6366F1]/20 border border-[#6366F1]/40 inline-block rounded"></span> {confidenceLevel}% Bound
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4EAF1" opacity={0.8} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#667085" 
                    fontSize={11} 
                    tickLine={false} 
                    interval={2}
                  />
                  <YAxis 
                    stroke="#667085" 
                    fontSize={11} 
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E4EAF1', borderRadius: '12px', fontSize: '11px', color: '#101828', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08)' }}
                    labelStyle={{ color: '#101828', fontWeight: 'bold' }}
                  />
                  {/* Confidence Interval Band */}
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stroke="none"
                    fill="#6366F1"
                    fillOpacity={0.12}
                    name={`${confidenceLevel}% Upper Bound`}
                  />
                  {/* Historical Observed Demand */}
                  <Line
                    type="monotone"
                    dataKey="observed"
                    stroke="#0F9F94"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#0F9F94' }}
                    name="Observed Job Demand"
                  />
                  {/* Projected Forecast Demand */}
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#6366F1"
                    strokeWidth={2.5}
                    strokeDasharray="4 4"
                    dot={{ r: 3.5, fill: '#6366F1' }}
                    name="Projected Forecast Demand"
                  />
                  {/* Qualified Supply Projection */}
                  <Line
                    type="monotone"
                    dataKey="supply"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Qualified Workforce Supply"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BACKTESTING EVALUATION METRICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Holdout WAPE (Model Error)
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-teal-700 dark:text-teal-400">
                  {forecastResult.metrics.wape}%
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">High Accuracy</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Weighted Absolute Percentage Error on 6-month holdout test set
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Mean Absolute Error (MAE)
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  ±{forecastResult.metrics.mae}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">jobs / mo</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Average deviation from observed deduplicated vacancies
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Gain Over Seasonal Naive
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-400">
                  +{forecastResult.metrics.improvementOverNaivePct}%
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">vs Baseline</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Naive Baseline MAE: {forecastResult.metrics.naiveMAE} jobs
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Historical Sample Size
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {forecastResult.metrics.sampleSize}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Monthly Points</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Oct 2024 to Sep 2026 (Continuous regularized frequency)
              </p>
            </div>
          </div>

          {/* METHODOLOGICAL TRANSPARENCY: ASSUMPTIONS & LIMITATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-400 mb-2 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Forecasting Model Assumptions</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {forecastResult.assumptions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 dark:text-teal-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 mb-2 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Model Limitations & Uncertainty Disclaimer</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {forecastResult.limitations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
