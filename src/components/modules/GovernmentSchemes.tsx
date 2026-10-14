import React, { useState } from 'react';
import { 
  Landmark, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  ChevronRight, 
  Info 
} from 'lucide-react';
import { Language, GovernmentScheme } from '../../types';
import { translations } from '../../utils/translations';
import { GOVERNMENT_SCHEMES } from '../../data/mockData';

interface GovernmentSchemesProps {
  language: Language;
}

export const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ language }) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(GOVERNMENT_SCHEMES[0]);

  const filteredSchemes = GOVERNMENT_SCHEMES.filter((scheme) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        scheme.name.toLowerCase().includes(q) ||
        scheme.acronym.toLowerCase().includes(q) ||
        scheme.ministry.toLowerCase().includes(q) ||
        scheme.eligibleSectors.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Central & State Skill Missions' : 'केंद्रीय एवं राज्य कौशल योजनाएं'}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Verified Government Catalog</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_gov_schemes}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Official repository of national skill schemes, funding structures, eligible training trades, and beneficiary criteria across MSDE, MNRE, and MSME.'
              : 'कौशल विकास मंत्रालय, नवीन एवं नवीकरणीय ऊर्जा मंत्रालय, एवं एमएसएमई की आधिकारिक योजनाओं, वित्तपोषण और पात्रता मानदंडों का डेटाबेस।'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-emerald-800 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            100% Verified Official Sources
          </span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scheme title, acronym (e.g. PMKVY, Suryamitra, Vishwakarma), ministry, or sector..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* SCHEMES MASTER-DETAIL WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Schemes List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredSchemes.map((scheme) => {
            const isSelected = selectedScheme?.id === scheme.id;

            return (
              <div
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/70 dark:bg-slate-800/90 border-teal-500 shadow-sm ring-1 ring-teal-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-black text-teal-700 dark:text-teal-400 tracking-wider">
                    {scheme.acronym}
                  </span>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50">
                    {scheme.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {language === 'en' ? scheme.name : scheme.nameHi}
                </h3>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {scheme.ministry}
                </p>

                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                  <span>Verified: {scheme.verifiedDate}</span>
                  <span className="text-teal-700 dark:text-teal-400 font-semibold flex items-center gap-0.5">
                    View Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Scheme Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
          {selectedScheme ? (
            <>
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-black text-teal-700 dark:text-teal-400 font-mono tracking-wider">
                    {selectedScheme.acronym}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {language === 'en' ? selectedScheme.name : selectedScheme.nameHi}
                  </h3>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium mt-1">
                    {selectedScheme.ministry}
                  </p>
                </div>

                <a
                  href={selectedScheme.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                </a>
              </div>

              {/* Target Beneficiaries */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Target Beneficiaries
                </span>
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  {selectedScheme.targetBeneficiaries}
                </p>
              </div>

              {/* Eligible Activities */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                  Eligible Training & Employment Activities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScheme.eligibleActivities.map((act, aIdx) => (
                    <span
                      key={aIdx}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800/80 text-xs font-medium"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Priority Sectors */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                  Priority Sectors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScheme.eligibleSectors.map((sec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Eligibility Criteria & Funding Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">
                    Eligibility Criteria
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedScheme.eligibilityCriteria}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">
                    Funding & Incentive Model
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedScheme.fundingModel}
                  </p>
                </div>
              </div>

              {/* Audit Metadata */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  Verified on: {selectedScheme.verifiedDate}
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active Government Programme
                </span>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs">
              Select a scheme on the left to inspect guidelines.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
