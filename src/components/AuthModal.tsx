import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  KeyRound, 
  Building2, 
  MapPin, 
  Mail, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { translations } from '../utils/translations';
import { DEMO_OFFICERS } from '../data/officerProfiles';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  language: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  language,
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'quick' | 'credentials'>('quick');
  const [customName, setCustomName] = useState('Shruti Gai');
  const [customEmail, setCustomEmail] = useState('shrutikgai2538@svvv.edu.in');
  const [customRole, setCustomRole] = useState<'central_planner' | 'state_mission_director' | 'district_officer' | 'public_researcher'>('central_planner');
  const [customOrg, setCustomOrg] = useState('Ministry of Skill Development & Entrepreneurship');
  const [customState, setCustomState] = useState('madhya_pradesh');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSelectOfficer = (officer: UserProfile) => {
    setLoginSuccess(true);
    setTimeout(() => {
      onLogin(officer);
      setLoginSuccess(false);
      onClose();
    }, 450);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = customName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'OF';

    const roleLabels = {
      central_planner: { en: 'Central Planner (MSDE)', hi: 'केंद्रीय योजनाकार (MSDE)' },
      state_mission_director: { en: 'State Mission Director', hi: 'राज्य मिशन निदेशक' },
      district_officer: { en: 'District Skill Officer', hi: 'ज़िला कौशल अधिकारी' },
      public_researcher: { en: 'Lead Workforce Analyst', hi: 'प्रमुख श्रम विश्लेषक' },
    };

    const newUser: UserProfile = {
      id: `officer-custom-${Date.now()}`,
      name: customName,
      nameHi: customName,
      email: customEmail,
      role: customRole,
      roleLabel: roleLabels[customRole].en,
      roleLabelHi: roleLabels[customRole].hi,
      organization: customOrg,
      organizationHi: customOrg,
      department: 'National Labour Market Planning Unit',
      departmentHi: 'राष्ट्रीय श्रम बाज़ार नियोजन प्रभाग',
      jurisdiction: customRole === 'central_planner' ? 'National Central Level' : 'Madhya Pradesh State Mission',
      jurisdictionHi: customRole === 'central_planner' ? 'अखिल भारतीय स्तर' : 'मध्य प्रदेश राज्य मिशन',
      state: customState,
      district: 'all',
      avatarInitials: initials,
      badgeColor: 'from-teal-600 to-indigo-700',
    };

    setLoginSuccess(true);
    setTimeout(() => {
      onLogin(newUser);
      setLoginSuccess(false);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-teal-50/30 to-indigo-50/40 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F9F94] text-white flex items-center justify-center shadow-md shadow-[#0F9F94]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {t.auth_login}
                </h3>
                <span className="text-[10px] font-bold text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                  MSDE NLMIS
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.auth_login_sub}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'quick'
                ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.auth_quick_select}</span>
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'credentials'
                ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t.auth_custom_login}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {loginSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Authentication successful! Launching customized officer workspace...</span>
            </div>
          )}

          {activeTab === 'quick' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {language === 'en'
                  ? 'Select an authorized government planner persona to explore customized role-based views and jurisdictional controls:'
                  : 'विशिष्ट भूमिका-आधारित दृश्य एवं अधिकार-क्षेत्र नियंत्रणों का उपयोग करने हेतु अधिकृत योजनाकार प्रोफ़ाइल चुनें:'}
              </p>

              {DEMO_OFFICERS.map((officer) => {
                const isSelected = currentUser?.id === officer.id;

                return (
                  <div
                    key={officer.id}
                    onClick={() => handleSelectOfficer(officer)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 group ${
                      isSelected
                        ? 'bg-teal-50/70 dark:bg-teal-950/40 border-teal-500 shadow-xs ring-1 ring-teal-500/30'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-teal-400 hover:bg-slate-50/80 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Avatar Circle */}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${officer.badgeColor} text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                        {officer.avatarInitials}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {language === 'en' ? officer.name : officer.nameHi}
                          </h4>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-teal-700 bg-teal-100 dark:bg-teal-900/60 dark:text-teal-300 px-1.5 py-0.2 rounded">
                              Active
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                          {language === 'en' ? officer.roleLabel : officer.roleLabelHi}
                        </p>

                        <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            {language === 'en' ? officer.organization : officer.organizationHi}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {language === 'en' ? officer.jurisdiction : officer.jurisdictionHi}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 self-center">
                      <span className="px-2.5 py-1 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg group-hover:bg-[#0F9F94] group-hover:text-white transition-all flex items-center gap-1">
                        <span>Select</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Officer Full Name / अधिकारी का नाम
                  </label>
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.auth_email_label}
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Assigned Role / पद
                    </label>
                    <select
                      value={customRole}
                      onChange={(e: any) => setCustomRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-900 dark:text-white"
                    >
                      <option value="central_planner">{t.auth_role_central}</option>
                      <option value="state_mission_director">{t.auth_role_state}</option>
                      <option value="district_officer">{t.auth_role_district}</option>
                      <option value="public_researcher">{t.auth_role_researcher}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Jurisdiction Region / क्षेत्र
                    </label>
                    <select
                      value={customState}
                      onChange={(e) => setCustomState(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-900 dark:text-white"
                    >
                      <option value="madhya_pradesh">Madhya Pradesh (All Districts)</option>
                      <option value="central">All India / Central Planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Organization / Department
                  </label>
                  <input
                    type="text"
                    value={customOrg}
                    onChange={(e) => setCustomOrg(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberSession"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
                  />
                  <label htmlFor="rememberSession" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                    Keep signed in with offline memory cache
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0F9F94] hover:bg-[#0D827A] text-white text-xs font-bold rounded-xl shadow-md shadow-[#0F9F94]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>{t.auth_enter_portal}</span>
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#0F9F94]" />
            Role-Based Access Control (RBAC) Enabled
          </span>
          <button
            onClick={onClose}
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
