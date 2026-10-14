import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Layers, 
  Building2, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Filter,
  BarChart2
} from 'lucide-react';
import { Language, DistrictMetric } from '../../types';
import { translations } from '../../utils/translations';
import { PILOT_DISTRICTS, MOCK_OCCUPATIONS } from '../../data/mockData';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../../utils/offlineStorage';

interface RegionalIntelligenceMapProps {
  language: Language;
  onNavigate: (module: string) => void;
}

type HeatmapMetric = 'gap' | 'demand' | 'training';

export const RegionalIntelligenceMap: React.FC<RegionalIntelligenceMapProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];

  const [selectedDistrictName, setSelectedDistrictName] = useState<string>('Rewa');
  const [activeMetric, setActiveMetric] = useState<HeatmapMetric>('gap');
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Selected district object
  const selectedDistrict = useMemo(() => {
    return PILOT_DISTRICTS.find(d => d.district === selectedDistrictName) || PILOT_DISTRICTS[0];
  }, [selectedDistrictName]);

  // Occupations for selected district
  const districtOccupations = useMemo(() => {
    return MOCK_OCCUPATIONS.filter(o => o.district === selectedDistrict.district);
  }, [selectedDistrict]);

  // Coordinates mapping on SVG canvas (scaled representation of MP)
  const districtMapPositions: { [key: string]: { x: number; y: number } } = {
    'Gwalior': { x: 390, y: 80 },
    'Sagar': { x: 440, y: 190 },
    'Rewa': { x: 620, y: 170 },
    'Bhopal': { x: 370, y: 240 },
    'Ujjain': { x: 260, y: 230 },
    'Indore': { x: 270, y: 280 },
    'Dhar - Pithampur': { x: 210, y: 290 },
    'Jabalpur': { x: 530, y: 240 },
  };

  // Color generator based on metric
  const getDistrictColor = (d: DistrictMetric) => {
    if (activeMetric === 'gap') {
      if (d.gapSeverity === 'Critical Shortage') return '#DC2626'; // Alert Red
      if (d.gapSeverity === 'Moderate Shortage') return '#D97706'; // Amber Warning
      if (d.gapSeverity === 'Oversupply') return '#3B82F6'; // Informational Blue
      return '#0F9F94'; // Balanced Teal
    }
    if (activeMetric === 'demand') {
      if (d.observedDemand > 5000) return '#0D827A'; // Deep Teal
      if (d.observedDemand > 2500) return '#0F9F94'; // Electric Teal
      return '#14B8A6'; // Soft Teal
    }
    // Training capacity
    if (d.trainingInstitutionsCount > 40) return '#16A34A'; // Emerald
    if (d.trainingInstitutionsCount > 25) return '#0F9F94'; // Teal
    return '#3B82F6'; // Blue
  };

  const handleFilterDashboard = () => {
    const currentFilters = getStoredItem(STORAGE_KEYS.FILTERS, {
      state: 'madhya_pradesh',
      district: 'all',
      sector: 'all',
      occupation: 'all',
      skill: 'all',
      horizon: 12,
      timeRange: '2Y'
    });
    setStoredItem(STORAGE_KEYS.FILTERS, {
      ...currentFilters,
      district: selectedDistrict.district
    });
    onNavigate('dashboard');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-[#17243A] p-5 rounded-2xl border border-[#E4EAF1] dark:border-[#1e2c42] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF0F6] text-[#0F9F94] dark:bg-teal-950/60 dark:text-teal-300 border border-[#14B8A6]/30 uppercase tracking-wider">
              {language === 'en' ? 'Spatial Workforce Cartography' : 'स्थानिक कार्यबल मानचित्र'}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-[#667085] dark:text-slate-300 font-medium">Madhya Pradesh Pilot Geometry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#101828] dark:text-white mt-1">
            {t.nav_regional_map}
          </h2>
          <p className="text-xs text-[#667085] dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Interactive district drill-down displaying localized skill shortages, industrial corridors, and vocational training hub density.'
              : 'स्थानीय कौशल कमी, औद्योगिक गलियारों और व्यावसायिक प्रशिक्षण संस्थान घनत्व को प्रदर्शित करने वाला इंटरैक्टिव ज़िला मानचित्र।'}
          </p>
        </div>

        {/* Heatmap Layer Selectors */}
        <div className="flex bg-[#EAF0F6] dark:bg-slate-800 p-1 rounded-xl border border-[#E4EAF1] dark:border-slate-700 text-xs">
          <button
            onClick={() => setActiveMetric('gap')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeMetric === 'gap' ? 'bg-[#0F9F94] text-white shadow-xs font-bold' : 'text-[#667085] hover:text-[#101828] dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            Skill Gap Severity
          </button>
          <button
            onClick={() => setActiveMetric('demand')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeMetric === 'demand' ? 'bg-[#0F9F94] text-white shadow-xs font-bold' : 'text-[#667085] hover:text-[#101828] dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            Hiring Demand
          </button>
          <button
            onClick={() => setActiveMetric('training')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeMetric === 'training' ? 'bg-[#0F9F94] text-white shadow-xs font-bold' : 'text-[#667085] hover:text-[#101828] dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            Training Centres
          </button>
        </div>
      </div>

      {/* MAP AND REGIONAL INSPECTOR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SVG Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Madhya Pradesh Regional Drill-Down
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">Click a district node to inspect</span>
            </div>

            {/* Quick District Touch Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 -mx-1 px-1 text-xs no-scrollbar">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold shrink-0 mr-1">Select:</span>
              {PILOT_DISTRICTS.map((d) => (
                <button
                  key={d.district}
                  onClick={() => setSelectedDistrictName(d.district)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedDistrict.district === d.district
                      ? 'bg-[#0F9F94] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80'
                  }`}
                >
                  {d.district}
                </button>
              ))}
            </div>

            {/* SVG Choropleth Map Area */}
            <div className="relative w-full aspect-[4/3] bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center p-2 sm:p-4">
              <svg viewBox="0 0 800 420" className="w-full h-full select-none">
                <defs>
                  {/* Subtle drop shadow for nodes */}
                  <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Stylized State Outline of Madhya Pradesh */}
                <path
                  d="M 160 270 L 220 220 L 320 180 L 370 70 L 430 60 L 460 120 L 580 130 L 680 150 L 710 210 L 640 260 L 590 320 L 480 340 L 360 330 L 220 340 Z"
                  fill="#f1f5f9"
                  className="dark:fill-slate-800/80"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Industrial Corridors & Grid Interconnects */}
                <line x1="270" y1="280" x2="210" y2="290" stroke="#0d9488" strokeWidth="3" strokeDasharray="3 3" opacity="0.8" />
                <line x1="270" y1="280" x2="370" y2="240" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="370" y1="240" x2="530" y2="240" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="530" y1="240" x2="620" y2="170" stroke="#0d9488" strokeWidth="2.5" strokeDasharray="3 3" />
                <line x1="370" y1="240" x2="390" y2="80" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />

                {/* District Interactive Nodes */}
                {PILOT_DISTRICTS.map((d) => {
                  const pos = districtMapPositions[d.district] || { x: 400, y: 200 };
                  const isSelected = selectedDistrict.district === d.district;
                  const isHovered = hoveredDistrict === d.district;
                  const nodeColor = getDistrictColor(d);

                  return (
                    <g 
                      key={d.district} 
                      className="cursor-pointer group"
                      onClick={() => setSelectedDistrictName(d.district)}
                      onMouseEnter={() => setHoveredDistrict(d.district)}
                      onMouseLeave={() => setHoveredDistrict(null)}
                    >
                      {/* Pulse ring for selected */}
                      {isSelected && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="26"
                          fill="none"
                          stroke="#0d9488"
                          strokeWidth="2.5"
                          className="animate-ping"
                          opacity="0.6"
                        />
                      )}

                      {/* Main node bubble */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? 18 : (isHovered ? 16 : 13)}
                        fill={nodeColor}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? 3.5 : 2.5}
                        filter="url(#nodeShadow)"
                        className="transition-all duration-200"
                      />

                      {/* District Label Text */}
                      <text
                        x={pos.x}
                        y={pos.y + 24}
                        textAnchor="middle"
                        fill={isSelected ? "#0d9488" : "#1e293b"}
                        className="dark:fill-slate-100"
                        fontSize="11"
                        fontWeight={isSelected ? "800" : "600"}
                      >
                        {d.district}
                      </text>

                      {/* Value pill underneath */}
                      <text
                        x={pos.x}
                        y={pos.y + 36}
                        textAnchor="middle"
                        fill="#475569"
                        className="dark:fill-slate-400"
                        fontSize="9"
                        fontWeight="700"
                      >
                        {activeMetric === 'gap' ? `${d.netGap > 0 ? '-' : '+'}${Math.abs(d.netGap)}` : `${d.observedDemand}`}
                      </text>
                    </g>
                  );
                })}

                {/* Floating Interactive Hover Card Tooltip inside SVG */}
                {hoveredDistrict && (() => {
                  const hDist = PILOT_DISTRICTS.find(d => d.district === hoveredDistrict);
                  if (!hDist) return null;
                  const pos = districtMapPositions[hDist.district] || { x: 400, y: 200 };
                  const tooltipX = Math.min(620, Math.max(30, pos.x - 85));
                  const tooltipY = Math.max(20, pos.y - 75);

                  return (
                    <g transform={`translate(${tooltipX}, ${tooltipY})`} className="pointer-events-none transition-all">
                      <rect
                        width="170"
                        height="58"
                        rx="8"
                        fill="#ffffff"
                        className="dark:fill-slate-900"
                        stroke="#0d9488"
                        strokeWidth="1.5"
                        filter="url(#nodeShadow)"
                      />
                      <text x="10" y="16" fill="#0f172a" className="dark:fill-white" fontSize="11" fontWeight="bold">
                        {hDist.district}
                      </text>
                      <text x="160" y="16" textAnchor="end" fill="#0d9488" fontSize="9" fontWeight="bold">
                        {hDist.gapSeverity}
                      </text>
                      <text x="10" y="32" fill="#475569" className="dark:fill-slate-300" fontSize="9">
                        Demand: {hDist.observedDemand.toLocaleString()} • Supply: {hDist.qualifiedSupply.toLocaleString()}
                      </text>
                      <text x="10" y="47" fill={hDist.netGap > 0 ? '#e11d48' : '#d97706'} fontSize="9" fontWeight="bold">
                        {hDist.netGap > 0 ? `Gap: -${hDist.netGap.toLocaleString()} Deficit` : `Surplus: +${Math.abs(hDist.netGap).toLocaleString()}`}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Map Legend */}
          <div className="mt-4 pt-3 border-t border-[#E4EAF1] dark:border-[#1e2c42] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#667085] dark:text-slate-400">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#101828] dark:text-slate-300">Legend:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#DC2626] inline-block"></span> Critical Shortage
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#D97706] inline-block"></span> Moderate Warning
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#3B82F6] inline-block"></span> Oversupply / Tech
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#0F9F94] inline-block"></span> Balanced
              </span>
            </div>

            <div className="text-[10px] text-[#667085] dark:text-slate-400">
              Teal dashed lines: Pithampur Auto & Rewa Solar Green Corridors
            </div>
          </div>
        </div>

        {/* District Detail Flyout Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-start justify-between border-b border-[#E4EAF1] dark:border-[#1e2c42] pb-3">
            <div>
              <span className="text-[10px] font-bold text-[#0F9F94] dark:text-teal-400 uppercase tracking-wider">
                District Profile & Intelligence
              </span>
              <h3 className="text-lg font-extrabold text-[#101828] dark:text-white">
                {selectedDistrict.district} District
              </h3>
              <p className="text-xs text-[#667085] dark:text-slate-400">
                Madhya Pradesh • Coordinates: [{selectedDistrict.coordinates[0].toFixed(2)}°N, {selectedDistrict.coordinates[1].toFixed(2)}°E]
              </p>
            </div>

            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
              selectedDistrict.gapSeverity === 'Critical Shortage' ? 'bg-red-50 dark:bg-red-950/60 text-[#DC2626] border border-red-200 dark:border-red-800' :
              selectedDistrict.gapSeverity === 'Oversupply' ? 'bg-blue-50 dark:bg-blue-950/60 text-[#3B82F6] border border-blue-200 dark:border-blue-800' :
              'bg-teal-50 dark:bg-teal-950/60 text-[#0F9F94] border border-teal-200 dark:border-teal-800'
            }`}>
              {selectedDistrict.gapSeverity}
            </span>
          </div>

          {/* District KPI Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#EAF0F6] dark:bg-slate-900 rounded-xl border border-[#E4EAF1] dark:border-slate-800">
              <span className="text-[10px] font-semibold text-[#667085] dark:text-slate-400 uppercase">Observed Demand</span>
              <div className="text-lg font-bold text-[#101828] dark:text-white mt-1">
                {selectedDistrict.observedDemand.toLocaleString()}
              </div>
              <span className="text-[10px] text-[#0F9F94] font-semibold">Active Postings</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Qualified Supply</span>
              <div className="text-lg font-bold text-indigo-700 dark:text-indigo-300 mt-1">
                {selectedDistrict.qualifiedSupply.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Certified Pool</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Training Institutes</span>
              <div className="text-lg font-bold text-purple-700 dark:text-purple-300 mt-1">
                {selectedDistrict.trainingInstitutionsCount}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">{selectedDistrict.activeItiCount} ITIs • {selectedDistrict.pmkkCount} PMKKs</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Net Skill Gap</span>
              <div className={`text-lg font-bold mt-1 ${selectedDistrict.netGap > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {selectedDistrict.netGap > 0 ? `-${selectedDistrict.netGap.toLocaleString()}` : `+${Math.abs(selectedDistrict.netGap).toLocaleString()}`}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">{selectedDistrict.netGap > 0 ? 'Deficit' : 'Surplus'}</span>
            </div>
          </div>

          {/* Top Shortage Occupation in District */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Acute Deficit Anchor Trade
              </span>
              <span className="text-[10px] bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded border border-rose-300 dark:border-rose-800">
                Action Required
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {selectedDistrict.topShortageOccupation}
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Industrial investments in {selectedDistrict.district} outpace certified local technician throughput. Recommend prioritizing seat sanction in upcoming District Skill Development Plan (DSDP).
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleFilterDashboard}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <Filter className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Filter Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate('training_recs')}
              className="flex-1 py-2 px-3 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>View Training Plan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* District Comparison Table */}
      <div className="bg-white dark:bg-[#17243A] border border-[#E4EAF1] dark:border-[#1e2c42] rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-[#101828] dark:text-white mb-1 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#0F9F94]" />
          Madhya Pradesh Pilot Districts Comparative Matrix
        </h3>
        <p className="text-xs text-[#667085] dark:text-slate-400 mb-4">
          Overview of verified demand, estimated workforce supply, training hub counts, and primary trade deficits
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold bg-slate-50 dark:bg-slate-950/60">
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Severity Status</th>
                <th className="py-2.5 px-3 text-right">Observed Demand</th>
                <th className="py-2.5 px-3 text-right">Qualified Supply</th>
                <th className="py-2.5 px-3 text-right">Net Gap</th>
                <th className="py-2.5 px-3 text-right">Training Hubs</th>
                <th className="py-2.5 px-3">Anchor Trade Deficit</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {PILOT_DISTRICTS.map((d) => (
                <tr 
                  key={d.district}
                  onClick={() => setSelectedDistrictName(d.district)}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                    selectedDistrict.district === d.district ? 'bg-teal-50/60 dark:bg-teal-950/30 font-semibold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>{d.district}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.gapSeverity === 'Critical Shortage' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                      d.gapSeverity === 'Oversupply' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' :
                      'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {d.gapSeverity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-800 dark:text-slate-200">{d.observedDemand.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-800 dark:text-slate-200">{d.qualifiedSupply.toLocaleString()}</td>
                  <td className={`py-2.5 px-3 text-right font-bold ${d.netGap > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {d.netGap > 0 ? `-${d.netGap.toLocaleString()}` : `+${Math.abs(d.netGap).toLocaleString()}`}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-800 dark:text-slate-200">{d.trainingInstitutionsCount}</td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 truncate max-w-xs">{d.topShortageOccupation}</td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDistrictName(d.district);
                      }}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
