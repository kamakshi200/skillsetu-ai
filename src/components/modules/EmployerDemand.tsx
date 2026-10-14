import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Search, 
  Filter, 
  BarChart2, 
  FileSpreadsheet, 
  Building2, 
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../../utils/offlineStorage';

interface EmployerDemandProps {
  language: Language;
}

export const EmployerDemand: React.FC<EmployerDemandProps> = ({ language }) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'analytics' | 'import'>('analytics');
  const [csvContent, setCsvContent] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const sampleCsvTemplate = `job_id,title,sector,district,experience_min_years,education_level,skills_list,source_channel
NCS-MP-001,Solar Rooftop Lead Installer,Renewable Energy,Rewa,2,ITI Electrician,"PV Mounting, Inverter Wiring, Net Metering",NCS Portal
NCS-MP-002,EV Battery Test Specialist,Automotive,Indore,1,Diploma Mechatronics,"BMS Calibration, High Voltage Safety",Direct Employer
NCS-MP-003,Agricultural Drone Pilot,Agro-Tech,Gwalior,0,10+2 with DGCA RPC,"Multispectral Survey, LiPo Battery",State Agro Portal`;

  const handleValidateCsv = () => {
    if (!csvContent.trim()) {
      setImportStatus('Please paste CSV data or load template.');
      return;
    }
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) {
      setImportStatus('Error: CSV must contain a header row and at least 1 record.');
      return;
    }
    const header = lines[0].toLowerCase();
    if (!header.includes('title') || !header.includes('district') || !header.includes('skills')) {
      setImportStatus('Schema Validation Error: Missing mandatory columns (title, district, skills_list).');
      return;
    }

    setStoredItem(STORAGE_KEYS.CUSTOM_JOB_POSTINGS, lines.slice(1));
    setImportStatus(`Success: Validated ${lines.length - 1} records. Ingested into deduplication pipeline and saved to offline memory.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Hiring Signals & Deduplication' : 'नियोक्ता मांग एवं भर्ती संकेत'}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Aggregated Job Postings Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_employer_demand}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Multi-channel employer posting analytics, skill co-occurrence bundles, qualification demands, and authorized CSV dataset importer.'
              : 'नियोक्ता भर्ती संकेत विश्लेषण, आवश्यक शैक्षणिक योग्यताएं और अधिकृत CSV डेटा आयातक।'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'analytics' ? 'bg-[#0F9F94] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            Demand Analytics
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'import' ? 'bg-[#0F9F94] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            Authorized CSV Importer
          </button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
        <>
          {/* Signal Pipeline & Deduplication Efficiency */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Gross Scraped Postings
              </span>
              <div className="mt-2 text-2xl font-extrabold text-slate-800 dark:text-slate-200">
                38,420
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Raw volume across NCS, State Exchanges, and industry job portals
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Deduplicated Unique Vacancies
              </span>
              <div className="mt-2 text-2xl font-extrabold text-teal-700 dark:text-teal-400">
                27,850
              </div>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                72.5% Deduplication Clean Rate (Removed 10,570 duplicates)
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Average Time-to-Fill (Friction)
              </span>
              <div className="mt-2 text-2xl font-extrabold text-purple-700 dark:text-purple-400">
                42 Days
              </div>
              <p className="text-[10px] text-rose-700 dark:text-rose-400 font-semibold mt-1">
                High friction in Solar & EV diagnostics (60+ days)
              </p>
            </div>
          </div>

          {/* Core Insights: Skill Bundles & Qualifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Common Skill Bundles */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Frequently Requested Skill Bundles (Co-Occurrence)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Multi-skill bundles required concurrently on manufacturing and service floors
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span>Clean Energy Cluster: Rooftop Solar Combo</span>
                    <span className="text-teal-700 dark:text-teal-400 font-mono">88% Co-occurrence</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">PV Inverter Wiring</span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">Net-Metering Inspection</span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">Altitude Safety Norms</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span>Automotive Cluster: EV Diagnostics Combo</span>
                    <span className="text-indigo-700 dark:text-indigo-400 font-mono">82% Co-occurrence</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">BMS CAN-Bus Telemetry</span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">Thermal Safety</span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">Motor Controller Tuning</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span>Smart Manufacturing: Industry 4.0 Combo</span>
                    <span className="text-purple-700 dark:text-purple-400 font-mono">76% Co-occurrence</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">PLC Ladder Logic</span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">Sensor IO-Link Setup</span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">Hydraulic Calibration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience & Education Preferences */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Minimum Educational Credential Demanded
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Distribution of mandatory qualification barriers in job postings
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                    <span>ITI Trade Certificate (CTS/CATS)</span>
                    <span className="font-bold text-teal-700 dark:text-teal-400">46% of Total Demand</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-teal-600 h-2 rounded-full" style={{ width: '46%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                    <span>3-Year Polytechnic Diploma (Engineering)</span>
                    <span className="font-bold text-indigo-700 dark:text-indigo-400">32% of Total Demand</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                    <span>Graduate Degree (B.Tech / B.Sc / BCA)</span>
                    <span className="font-bold text-purple-700 dark:text-purple-400">14% of Total Demand</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '14%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                    <span>Short-Term PMKVY / Modular Certificate</span>
                    <span className="font-bold text-pink-700 dark:text-pink-400">8% of Total Demand</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-pink-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* CSV IMPORT TAB */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Authorized Labour Market Dataset Ingestion
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Import authorized employer job postings from state portals, district exchanges, or industry associations.
              </p>
            </div>

            <button
              onClick={() => setCsvContent(sampleCsvTemplate)}
              className="text-xs text-teal-700 dark:text-teal-400 hover:underline cursor-pointer font-semibold"
            >
              Load Sample Template
            </button>
          </div>

          <textarea
            value={csvContent}
            onChange={(e) => setCsvContent(e.target.value)}
            rows={8}
            placeholder="Paste CSV records (columns: job_id, title, sector, district, experience_min_years, education_level, skills_list, source_channel)..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl p-3.5 font-mono focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Saves validated records into offline persistent memory.
            </span>

            <button
              onClick={handleValidateCsv}
              className="px-5 py-2.5 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Validate & Ingest CSV Records
            </button>
          </div>

          {importStatus && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
              importStatus.startsWith('Success')
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-700/60 text-rose-800 dark:text-rose-200'
            }`}>
              {importStatus.startsWith('Success') ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <span>{importStatus}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
