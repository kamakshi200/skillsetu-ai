import React, { useState } from 'react';
import { 
  Radar, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Info, 
  ArrowUpRight, 
  ShieldCheck, 
  Search, 
  Filter 
} from 'lucide-react';
import { Language, EmergingSkill } from '../../types';
import { translations } from '../../utils/translations';
import { EMERGING_SKILLS } from '../../data/mockData';

interface EmergingSkillsRadarProps {
  language: Language;
  onNavigate: (module: string) => void;
}

export const EmergingSkillsRadar: React.FC<EmergingSkillsRadarProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSkills = EMERGING_SKILLS.filter((s) => {
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q) ||
        s.nsqfAlignment.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories = Array.from(new Set(EMERGING_SKILLS.map(s => s.category)));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Sunrise Competencies & Future of Work' : 'उभरते भविष्य के कौशल'}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Empirical Velocity Score Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_emerging_skills}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Tracking rapid growth skills from deduplicated hiring volumes, technological shifts, and national industrial missions.'
              : 'भर्ती विज्ञापनों की वृद्धि, तकनीकी बदलावों और राष्ट्रीय औद्योगिक अभियानों से उभरते हुए उच्च-मांग कौशलों की निगरानी।'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-teal-800 dark:text-teal-400 font-mono bg-teal-50 dark:bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-800/80">
            Composite Scoring: Growth (30%) + Deficit (25%) + Forecast (25%) + Persistence (10%) + Reliability (10%)
          </span>
        </div>
      </div>

      {/* SEARCH AND CATEGORY FILTER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search emerging skills (e.g. BMS, Drone, SCADA, Cobot, TinyML)..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
          >
            <option value="all">All Sunrise Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* SKILLS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-xs relative group overflow-hidden"
          >
            {/* Top Badge & Velocity Score */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {skill.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Velocity:</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40 font-mono">
                    {skill.velocityScore}/100
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                {language === 'en' ? skill.name : skill.nameHi}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Sector: {skill.sector}
              </p>

              {/* Demand & Growth Metrics Box */}
              <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">YoY Demand Growth</span>
                  <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                    +{skill.demandGrowthRate}%
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">12M Demand Proj.</span>
                  <div className="text-base font-extrabold text-purple-700 dark:text-purple-400 mt-0.5">
                    {skill.projectedDemand12m.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* NSQF & Occupations Mapping */}
              <div className="mt-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">NSQF Standard:</span>
                  <span className="font-mono text-teal-800 dark:text-teal-300 font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {skill.nsqfAlignment}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Sample Size:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    N = {skill.sampleSize.toLocaleString()} postings
                  </span>
                </div>
              </div>

              {/* Key Drivers */}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Key Catalysts:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {skill.keyDrivers.map((driver, dIdx) => (
                    <span key={dIdx} className="text-[10px] text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      {driver}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                skill.shortageSeverity === 'Critical' ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800' :
                'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}>
                {skill.shortageSeverity} Shortage
              </span>

              <button
                onClick={() => onNavigate('training_recs')}
                className="text-xs text-teal-700 dark:text-teal-400 hover:underline font-semibold cursor-pointer"
              >
                View Course Mappings →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
