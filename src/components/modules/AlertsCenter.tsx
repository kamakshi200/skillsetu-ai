import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Filter, 
  Plus, 
  ShieldCheck, 
  ChevronRight, 
  Trash2, 
  CheckCheck,
  X,
  HardDrive
} from 'lucide-react';
import { Language, AlertNotification } from '../../types';
import { translations } from '../../utils/translations';
import { MOCK_NOTIFICATIONS } from '../../data/mockData';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../../utils/offlineStorage';

interface AlertsCenterProps {
  language: Language;
  onNavigate: (module: string) => void;
  onMarkAllRead?: () => void;
}

export const AlertsCenter: React.FC<AlertsCenterProps> = ({
  language,
  onNavigate,
  onMarkAllRead,
}) => {
  const t = translations[language];

  const [alerts, setAlerts] = useState<AlertNotification[]>(() => {
    return getStoredItem<AlertNotification[]>(STORAGE_KEYS.CUSTOM_ALERTS, MOCK_NOTIFICATIONS);
  });
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState<boolean>(false);
  const [subDistrict, setSubDistrict] = useState<string>('Rewa');
  const [subSector, setSubSector] = useState<string>('Renewable Energy');
  const [subThreshold, setSubThreshold] = useState<string>('30');
  const [subSuccess, setSubSuccess] = useState<boolean>(false);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.CUSTOM_ALERTS, alerts);
  }, [alerts]);

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity !== 'all' && a.severity !== filterSeverity) return false;
    return true;
  });

  const toggleRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: !a.read } : a));
  };

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
    if (onMarkAllRead) onMarkAllRead();
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleCreateSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: AlertNotification = {
      id: `alert-user-${Date.now()}`,
      title: `Surge Threshold Alert: ${subSector} in ${subDistrict}`,
      titleHi: `मांग वृद्धि अलर्ट: ${subDistrict} में ${subSector}`,
      message: `User custom rule triggered: Observed hiring demand accelerated > ${subThreshold}% over baseline. Recommended review of training seats.`,
      messageHi: `उपयोगकर्ता नियम सक्रिय: मांग में ${subThreshold}% से अधिक वृद्धि। प्रशिक्षण सीटों की समीक्षा करें।`,
      severity: 'warning',
      timestamp: 'Just now',
      read: false,
      district: subDistrict,
      sector: subSector,
      actionModule: 'dashboard'
    };

    setAlerts(prev => [newAlert, ...prev]);
    setSubSuccess(true);
    setTimeout(() => {
      setShowSubscriptionModal(false);
      setSubSuccess(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40 uppercase tracking-wider">
              {language === 'en' ? 'Early Warning System' : 'प्रारंभिक चेतावनी प्रणाली'}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Deterministic Threshold Signals</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.nav_alerts}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'en'
              ? 'Real-time alerts triggered by substantial hiring demand surges, widening forecast deficits, or structural oversupply in district ITIs.'
              : 'भर्ती मांग में भारी वृद्धि, बढ़ते कौशल घाटे या ज़िला आईटीआई में अतिरिक्त सीटों पर आधारित स्वचालित अलर्ट्स।'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Mark All Read</span>
          </button>

          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="px-3.5 py-2 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Alert Rule</span>
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs w-fit">
        <button
          onClick={() => setFilterSeverity('all')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filterSeverity === 'all' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          All Alerts ({alerts.length})
        </button>
        <button
          onClick={() => setFilterSeverity('critical')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filterSeverity === 'critical' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Critical Shortages
        </button>
        <button
          onClick={() => setFilterSeverity('warning')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filterSeverity === 'warning' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Surge Warnings
        </button>
        <button
          onClick={() => setFilterSeverity('info')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
            filterSeverity === 'info' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          System Updates
        </button>
      </div>

      {/* ALERTS LIST */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs ${
              !alert.read
                ? 'bg-white dark:bg-slate-900 border-teal-300 dark:border-teal-500/50'
                : 'bg-slate-50/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-90'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className={`p-2 rounded-xl shrink-0 ${
                alert.severity === 'critical' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' :
                alert.severity === 'warning' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400'
              }`}>
                {alert.severity === 'critical' ? <AlertTriangle className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    alert.severity === 'critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                    alert.severity === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {alert.timestamp}
                  </span>
                  {!alert.read && (
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {language === 'en' ? alert.title : alert.titleHi}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-3xl">
                  {language === 'en' ? alert.message : alert.messageHi}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {alert.actionModule && (
                <button
                  onClick={() => onNavigate(alert.actionModule!)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <span>Investigate</span>
                  <ChevronRight className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                </button>
              )}
              <button
                onClick={() => toggleRead(alert.id)}
                className="px-2.5 py-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-xs font-semibold"
                title="Toggle Read"
              >
                {alert.read ? 'Mark Unread' : 'Mark Read'}
              </button>
              <button
                onClick={() => handleDeleteAlert(alert.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                title="Delete Alert"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NEW ALERT SUBSCRIPTION MODAL */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Configure New Early Warning Rule
              </h3>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubscription} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target District
                </label>
                <select
                  value={subDistrict}
                  onChange={(e) => setSubDistrict(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="Rewa">Rewa</option>
                  <option value="Indore">Indore</option>
                  <option value="Gwalior">Gwalior</option>
                  <option value="Bhopal">Bhopal</option>
                  <option value="Dhar - Pithampur">Dhar - Pithampur</option>
                  <option value="Sagar">Sagar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sector Focus
                </label>
                <select
                  value={subSector}
                  onChange={(e) => setSubSector(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="Renewable Energy">Renewable Energy & Solar</option>
                  <option value="Automotive & EV">Automotive & Electric Vehicles</option>
                  <option value="Drone Technology">Drone Operations & Maintenance</option>
                  <option value="Smart Agriculture">Smart Agriculture & Cold Chain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Surge Notification Trigger (% YoY Spike)
                </label>
                <select
                  value={subThreshold}
                  onChange={(e) => setSubThreshold(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2"
                >
                  <option value="20">&gt; 20% Growth over 60-day baseline</option>
                  <option value="30">&gt; 30% Growth (Recommended)</option>
                  <option value="50">&gt; 50% Growth (Acute Shortage Spike)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubscriptionModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {subSuccess ? 'Rule Saved to Offline Cache!' : 'Activate Alert Rule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
