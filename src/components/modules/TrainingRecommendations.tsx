import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink, 
  Filter, 
  Search, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { Language, TrainingRecommendation } from '../../types';
import { translations } from '../../utils/translations';
import { TRAINING_RECOMMENDATIONS } from '../../data/mockData';

interface TrainingRecommendationsProps {
  language: Language;
  onNavigate: (module: string) => void;
}

export const TrainingRecommendations: React.FC<TrainingRecommendationsProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];

  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRecs = TRAINING_RECOMMENDATIONS.filter((rec) => {
    if (urgencyFilter !== 'all' && rec.urgency !== urgencyFilter) return false;
    if (districtFilter !== 'all' && rec.district !== districtFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        rec.occupationTitle.toLowerCase().includes(q) ||
        rec.courseName.toLowerCase().includes(q) ||
        rec.district.toLowerCase().includes(q) ||
        rec.associatedScheme.toLowerCase().includes(q)
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
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Institutional Interventions' : 'संस्थागत प्रशिक्षण अनुशंसाएं'}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Scheme & Sector Skill Council Aligned</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_training_recs}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Targeted vocational capacity adjustments, ITI workshop modernizations, and seat reallocation plans tied directly to documented regional skill gaps.'
              : 'प्रमाणित क्षेत्रीय कौशल अंतर से सीधे जुड़ी लक्षित व्यावसायिक क्षमता समायोजन, आईटीआई कार्यशाला आधुनिकीकरण और सीट पुनरावंटन योजनाएं।'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('policy_simulator')}
          className="px-4 py-2 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Simulate Budget & Outlay</span>
        </button>
      </div>

      {/* FILTER CONTROLS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course name, occupation, district, or government scheme..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          >
            <option value="all">All Urgency Tiers</option>
            <option value="Immediate">Immediate Priority (0-3 Months)</option>
            <option value="Medium-term">Medium-Term (3-6 Months)</option>
          </select>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          >
            <option value="all">All Pilot Districts</option>
            <option value="Rewa">Rewa</option>
            <option value="Indore">Indore</option>
            <option value="Gwalior">Gwalior</option>
            <option value="Dhar - Pithampur">Dhar - Pithampur</option>
            <option value="Sagar">Sagar</option>
            <option value="Bhopal">Bhopal</option>
          </select>
        </div>
      </div>

      {/* RECOMMENDATIONS LIST */}
      <div className="space-y-4">
        {filteredRecs.map((rec) => {
          const isExpansion = rec.recommendedAdditionalSeats > 0;

          return (
            <div
              key={rec.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Title & Core Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-teal-800 dark:text-teal-300 border border-slate-200 dark:border-slate-700">
                      {rec.district} • {rec.sector}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      rec.urgency === 'Immediate' ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}>
                      {rec.urgency} Urgency
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      {rec.qpNosCode}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {rec.courseName}
                  </h3>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                    <strong className="text-teal-700 dark:text-teal-300">Rationale:</strong> {rec.rationale}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Suggested Provider:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{rec.suggestedProvider}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Course Duration:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{rec.durationMonths} Months</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Cost Per Trainee:</span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">₹{rec.estimatedCostPerTrainee.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seat Recommendation Action Box */}
                <div className="lg:w-64 shrink-0 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Seat Adjustment</span>
                    <div className={`text-2xl font-extrabold mt-1 ${isExpansion ? 'text-teal-700 dark:text-teal-400' : 'text-amber-700 dark:text-amber-400'}`}>
                      {isExpansion ? `+${rec.recommendedAdditionalSeats}` : `${rec.recommendedAdditionalSeats}`} Seats
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Current Capacity: {rec.existingCapacity} seats
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold truncate">
                      {rec.associatedScheme}
                    </div>
                    <button
                      onClick={() => onNavigate('gov_schemes')}
                      className="w-full py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      <span>Explore Scheme</span>
                      <ExternalLink className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
