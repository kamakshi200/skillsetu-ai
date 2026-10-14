import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Shield, 
  Building2, 
  MapPin, 
  LogOut, 
  RefreshCw, 
  ChevronDown, 
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { translations } from '../utils/translations';

interface UserProfileMenuProps {
  user: UserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  language: Language;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  user,
  onOpenLogin,
  onLogout,
  language,
}) => {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        onClick={onOpenLogin}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F9F94] hover:bg-[#0D827A] text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
      >
        <KeyRound className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t.auth_login}</span>
        <span className="sm:hidden">{language === 'en' ? 'Login' : 'लॉगिन'}</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Officer Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer active:scale-95 text-left"
        title="Officer Account Profile"
      >
        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${user.badgeColor} text-white font-black text-[11px] flex items-center justify-center shrink-0 shadow-2xs`}>
          {user.avatarInitials}
        </div>

        <div className="hidden md:flex flex-col text-left leading-tight">
          <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[130px]">
            {language === 'en' ? user.name : user.nameHi}
          </span>
          <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold truncate max-w-[130px]">
            {language === 'en' ? user.roleLabel : user.roleLabelHi}
          </span>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {/* Card Header with Officer Details */}
          <div className="p-4 bg-gradient-to-br from-slate-50 via-teal-50/20 to-indigo-50/30 dark:from-slate-950 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-start space-x-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${user.badgeColor} text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs ring-2 ring-white dark:ring-slate-800`}>
                {user.avatarInitials}
              </div>

              <div className="space-y-0.5 overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {language === 'en' ? user.name : user.nameHi}
                  </h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                </div>
                <p className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 truncate">
                  {language === 'en' ? user.roleLabel : user.roleLabelHi}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Jurisdiction Details */}
            <div className="mt-3 p-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{language === 'en' ? user.organization : user.organizationHi}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{language === 'en' ? user.jurisdiction : user.jurisdictionHi}</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="p-2 space-y-1 text-xs">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenLogin();
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer font-semibold"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>{t.auth_switch_profile}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">RBAC</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.auth_logout}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
