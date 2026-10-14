import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Printer, 
  FileSpreadsheet, 
  Code, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Layers
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { MOCK_OCCUPATIONS, PILOT_DISTRICTS, GOVERNMENT_SCHEMES, DATA_SOURCES } from '../../data/mockData';

interface ReportsExportProps {
  language: Language;
}

export const ReportsExport: React.FC<ReportsExportProps> = ({ language }) => {
  const t = translations[language];

  const [exportType, setExportType] = useState<'brief' | 'csv' | 'api'>('brief');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Trigger CSV Download
  const downloadCsv = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(`Downloaded ${filename} successfully!`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleExportOccupationsCsv = () => {
    let csv = 'Occupation_ID,Title,NCO_Code,NSQF_Level,Sector,District,Current_Demand,Supply,Forecast_12M,Skill_Gap,Severity\n';
    MOCK_OCCUPATIONS.forEach(occ => {
      const gap = occ.forecastDemand12m - occ.estimatedSupply;
      csv += `"${occ.id}","${occ.title}","${occ.ncoCode}",${occ.nsqfLevel},"${occ.sectorName}","${occ.district}",${occ.currentDemand},${occ.estimatedSupply},${occ.forecastDemand12m},${gap},"${occ.severity}"\n`;
    });
    downloadCsv('SkillSetu_MadhyaPradesh_SkillGaps.csv', csv);
  };

  const handleExportDistrictsCsv = () => {
    let csv = 'District,State,Observed_Demand,Qualified_Supply,Net_Gap,Gap_Severity,Top_Shortage_Trade,ITIs_Count\n';
    PILOT_DISTRICTS.forEach(d => {
      csv += `"${d.district}","${d.state}",${d.observedDemand},${d.qualifiedSupply},${d.netGap},"${d.gapSeverity}","${d.topShortageOccupation}",${d.activeItiCount}\n`;
    });
    downloadCsv('SkillSetu_Pilot_Districts_Summary.csv', csv);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Institutional Publishing & Data Feeds' : 'रिपोर्ट एवं डेटा निर्यात'}
            </span>
            <span className="text-slate-300 dark:text-slate-600 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">District Skill Development Plan (DSDP) Ready</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_reports}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Generate printable official briefs, download verified CSV tabular datasets, and inspect REST JSON endpoints for state management information systems.'
              : 'मुद्रण योग्य आधिकारिक नीतियां, CSV डेटासेट डाउनलोड और राज्य MIS हेतु REST JSON एपीआई दस्तावेज़ीकरण।'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setExportType('brief')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              exportType === 'brief' ? 'bg-[#0F9F94] text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Policy Brief (Print/PDF)
          </button>
          <button
            onClick={() => setExportType('csv')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              exportType === 'csv' ? 'bg-[#0F9F94] text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Raw CSV Exports
          </button>
          <button
            onClick={() => setExportType('api')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              exportType === 'api' ? 'bg-[#0F9F94] text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            JSON REST API
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* EXPORT VIEW: 1. POLICY BRIEF (PRINT-READY) */}
      {exportType === 'brief' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Official document formatted for Government Planning Departments, State Skill Missions (SSDMs), and NCVET auditors.
            </div>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>

          {/* Formatted Document Paper View */}
          <div className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl space-y-6 max-w-4xl mx-auto border border-slate-200">
            {/* Header Government Emblems */}
            <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-700 block">
                  Government of India • Ministry of Skill Development and Entrepreneurship
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  SKILLSETU AI — LABOUR MARKET INTELLIGENCE BRIEF
                </h1>
                <p className="text-xs text-slate-600 font-mono mt-0.5">
                  National Labour Market Information System (NLMIS) | Pilot District Skill Development Plan (DSDP)
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold px-2 py-1 bg-teal-100 text-teal-800 rounded border border-teal-300">
                  OFFICIAL POLICY DRAFT — LIVE ANALYTICS
                </span>
                <p className="text-[10px] text-slate-500 mt-1 font-mono">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* 1. Intelligence Summary */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                1. Strategic Intelligence Summary & Geographic Scope
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                This document synthesizes district-level labour demand signals across 8 pilot districts in <strong>Madhya Pradesh</strong> (Bhopal, Indore, Dhar-Pithampur, Gwalior, Jabalpur, Rewa, Ujjain, Sagar) spanning 6 sunrise sectors. The analysis pairs deduplicated job postings against certified institutional completions from Directorate General of Training (DGT) ITIs and PMKK centers.
              </p>
            </div>

            {/* 2. Key Deficit Trades Table */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                2. Priority Occupational Shortage & Oversupply Summary
              </h2>
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300">Trade Title</th>
                    <th className="p-2 border-r border-slate-300">NCO Code</th>
                    <th className="p-2 border-r border-slate-300">District</th>
                    <th className="p-2 border-r border-slate-300 text-right">12M Demand</th>
                    <th className="p-2 border-r border-slate-300 text-right">Supply</th>
                    <th className="p-2 text-right">Net Gap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-bold border-r border-slate-200">Solar PV Rooftop Technician</td>
                    <td className="p-2 font-mono border-r border-slate-200">3113.0101</td>
                    <td className="p-2 border-r border-slate-200">Rewa</td>
                    <td className="p-2 text-right border-r border-slate-200">2,840</td>
                    <td className="p-2 text-right border-r border-slate-200">1,120</td>
                    <td className="p-2 text-right font-bold text-rose-700">-1,720 (Shortage)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border-r border-slate-200">EV Service Technician</td>
                    <td className="p-2 font-mono border-r border-slate-200">7231.0201</td>
                    <td className="p-2 border-r border-slate-200">Indore</td>
                    <td className="p-2 text-right border-r border-slate-200">3,490</td>
                    <td className="p-2 text-right border-r border-slate-200">1,410</td>
                    <td className="p-2 text-right font-bold text-rose-700">-2,080 (Shortage)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border-r border-slate-200">Desktop Publishing Clerk</td>
                    <td className="p-2 font-mono border-r border-slate-200">4132.0101</td>
                    <td className="p-2 border-r border-slate-200">Sagar</td>
                    <td className="p-2 text-right border-r border-slate-200">570</td>
                    <td className="p-2 text-right border-r border-slate-200">1,480</td>
                    <td className="p-2 text-right font-bold text-amber-700">+910 (Oversupply)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 3. Recommended Actions */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                3. Recommended Interventions & Budget Outlays
              </h2>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
                <li><strong>Rewa District:</strong> Sanction 600 additional Solar PV Installer seats under Suryamitra / PM Surya Ghar (Outlay: ~₹87 Lakhs).</li>
                <li><strong>Indore & Dhar Corridor:</strong> Modernize ITI workshops with high-voltage EV diagnostic test rigs under STRIVE (Outlay: ~₹1.2 Crores).</li>
                <li><strong>Sagar District:</strong> Sunset 350 basic computing seats and transition trainees into Cold Chain Agro-Logistics.</li>
              </ul>
            </div>

            {/* 4. Methodology & Disclaimer */}
            <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 space-y-1">
              <p><strong>Forecasting Pipeline:</strong> Triple Exponential Smoothing (Holt-Winters) with dampened linear trend; holdout backtesting WAPE: 6.8%.</p>
              <p><strong>Data Governance:</strong> Deduplicated against NCS job postings. Total e-Shram worker registrations are not counted as certified supply.</p>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT VIEW: 2. CSV EXPORTS */}
      {exportType === 'csv' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Occupations & Skill Gap Dataset</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Full tabular breakdown of tracked occupations, NCO-2015 codes, NSQF levels, current demand, 12M forecast, qualified supply, and net gaps.
              </p>
            </div>

            <button
              onClick={handleExportOccupationsCsv}
              className="mt-6 w-full py-2.5 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Occupations CSV (8 Records)</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-[#6366F1] flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Pilot Districts Summary Dataset</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                District-level aggregated figures for Madhya Pradesh, covering observed demand, qualified supply, net gap severity, and active ITIs count.
              </p>
            </div>

            <button
              onClick={handleExportDistrictsCsv}
              className="mt-6 w-full py-2.5 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Districts CSV (8 Districts)</span>
            </button>
          </div>
        </div>
      )}

      {/* EXPORT VIEW: 3. JSON REST API DOCUMENTATION */}
      {exportType === 'api' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              REST API Endpoints for State Skill Missions (SSDMs)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Secure REST API endpoints available in the full-stack server for data synchronization.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-teal-700 dark:text-teal-400 font-bold mb-1">
                <span>POST /api/ai/chat</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">SkillSetu Neural RAG</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] font-sans">
                Body: <code>{`{ "query": "string", "activeDistrict": "string" }`}</code>
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-indigo-700 dark:text-indigo-400 font-bold mb-1">
                <span>POST /api/ai/extract-skills</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">NLP Parser</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] font-sans">
                Body: <code>{`{ "text": "Job description or syllabus string..." }`}</code>
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-purple-700 dark:text-purple-400 font-bold mb-1">
                <span>GET /api/health</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">Engine Diagnostics</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] font-sans">
                Returns system health status, core diagnostics, and timestamp.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
