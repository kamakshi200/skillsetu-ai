import React from 'react';
import { 
  Database, 
  Scale, 
  Lock, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { Language } from '../../types';
import { DATA_SOURCES } from '../../data/mockData';
import { translations } from '../../utils/translations';

interface MethodologyGovernanceProps {
  language: Language;
}

export const MethodologyGovernance: React.FC<MethodologyGovernanceProps> = ({
  language,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Algorithmic Auditing & Ethics' : 'डेटा स्रोत व कार्यप्रणाली'}
            </span>
            <span className="text-slate-300 dark:text-slate-600 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">MSDE LMI Governance Standards</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_sources_methodology}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Comprehensive registry of official data sources, mathematical forecasting formulations, and Responsible AI governance principles.'
              : 'आधिकारिक डेटा स्रोतों की सूची, सांख्यिकीय पूर्वानुमान सूत्र और उत्तरदायी एआई (Responsible AI) शासन सिद्धांत।'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            NITI Aayog & MSDE Responsible AI Compliant
          </span>
        </div>
      </div>

      {/* 1. DATA SOURCE REGISTRY */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Official Data Source Registry & Provenance
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Every analytical indicator is mapped to an authoritative public or administrative dataset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {DATA_SOURCES.map((src) => (
            <div
              key={src.id}
              className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className={`font-bold px-2 py-0.5 rounded uppercase ${
                    src.verifiedStatus === 'Verified Official' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' :
                    src.verifiedStatus === 'Public Open Data' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800' :
                    'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  }`}>
                    {src.verifiedStatus}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">{src.frequency}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  {src.name}
                </h4>
                <p className="text-[11px] text-teal-700 dark:text-teal-400 mt-0.5 font-semibold">
                  {src.publisher}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {src.coverage}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                <span>Period: {src.reportingPeriod}</span>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Source <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. MATHEMATICAL FORMULATIONS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Mathematical & Statistical Formulations
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Transparent, reproducible formulas powering forecasting, skill gap analysis, and backtesting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-teal-750 dark:text-teal-400 uppercase tracking-wider block">
              1. Triple Exponential Smoothing with Dampened Trend
            </span>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <div>Level: L_t = α · Y_t + (1 - α) · (L_{'{t-1}'} + φ · T_{'{t-1}'})</div>
              <div>Trend: T_t = β · (L_t - L_{'{t-1}'}) + (1 - β) · φ · T_{'{t-1}'}</div>
              <div>Forecast: ŷ_{'{t+h}'} = L_t + ∑_{'{i=1}'}^h (φ^i) · T_t</div>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Smoothing parameters (α = 0.35, β = 0.15, φ = 0.94 dampening factor) ensure projections do not explode linearly over 12-month horizons.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block">
              2. Backtesting Evaluation: WAPE & Prediction Bounds
            </span>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <div>WAPE = [ ∑ |A_t - F_t| / ∑ A_t ] × 100%</div>
              <div>MAE = (1 / n) · ∑ |A_t - F_t|</div>
              <div>Interval Bound: ŷ_{'{t+h}'} ± z_α · σ_e · √(h)</div>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Holdout chronological split evaluates predictions against actuals, expanding uncertainty bands dynamically with horizon length √(h).
            </p>
          </div>
        </div>
      </div>

      {/* 3. RESPONSIBLE AI & ETHICS CONSTITUTION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Responsible AI & Data Protection Constitution
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Strict safeguards protecting individual worker privacy and preventing algorithmic bias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Personal Identifiable Data (PII)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The platform aggregates all worker indicators to district and occupational cohort levels. No Aadhaar, phone numbers, or candidate names are stored or processed.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-400">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Human-in-the-Loop Governance</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              All AI model outputs are classified strictly as <em>Decision-Support Recommendations</em>. No training center closure or individual certification decision is automated without human committee review.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Demographic & Gender Bias Auditing</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Training recommendations are audited to ensure rural districts and marginalized demographic trades (e.g. PM Vishwakarma craftspersons) receive equitable seat allocations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
