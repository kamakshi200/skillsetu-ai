import React from 'react';
import { Language } from '../types';
import { 
  Building2, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Award,
  Eye
} from 'lucide-react';

interface GovernmentFooterProps {
  language: Language;
  onNavigate?: (module: string) => void;
}

export const GovernmentFooter: React.FC<GovernmentFooterProps> = ({
  language,
  onNavigate,
}) => {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 text-xs border-t border-slate-800 font-sans select-none">
      {/* 1. National Initiatives & Associated Portals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Column 1: Ministry & Core Bodies */}
          <div>
            <h4 className="font-bold text-white text-[13px] border-b border-slate-800 pb-1.5 mb-3 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'en' ? 'Ministry & Bodies' : 'मंत्रालय एवं निकाय'}</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>
                <a href="https://msde.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  MSDE Main Portal <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://dgt.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  Directorate General of Training (DGT) <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://nsdcindia.org" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  National Skill Dev. Corp (NSDC) <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://ncvet.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  NCVET (Standard Regulator) <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Flagship Schemes */}
          <div>
            <h4 className="font-bold text-white text-[13px] border-b border-amber-500/50 pb-1.5 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'Flagship Schemes' : 'प्रमुख योजनाएं'}</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>
                <button onClick={() => onNavigate && onNavigate('gov_schemes')} className="hover:text-amber-300 hover:underline text-left cursor-pointer">
                  PMKVY 4.0 (Skill Training)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('gov_schemes')} className="hover:text-amber-300 hover:underline text-left cursor-pointer">
                  NAPS 2.0 (Apprenticeship)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('gov_schemes')} className="hover:text-amber-300 hover:underline text-left cursor-pointer">
                  PM Vishwakarma Scheme
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('gov_schemes')} className="hover:text-amber-300 hover:underline text-left cursor-pointer">
                  SANKALP & STRIVE Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen & Youth Portals */}
          <div>
            <h4 className="font-bold text-white text-[13px] border-b border-amber-500/50 pb-1.5 mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'Youth & Citizen Portals' : 'नागरिक पोर्टल'}</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>
                <button onClick={() => onNavigate && onNavigate('student_portal')} className="hover:text-amber-300 hover:underline text-left cursor-pointer text-amber-300 font-bold">
                  ★ Student Career Navigator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('industrial_sector')} className="hover:text-amber-300 hover:underline text-left cursor-pointer text-amber-300 font-bold">
                  ★ 12 Industrial Sectors Hub
                </button>
              </li>
              <li>
                <a href="https://skillindiadigital.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  Skill India Digital Hub (SIDH) <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://ncs.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  National Career Service (NCS) <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: National Databases */}
          <div>
            <h4 className="font-bold text-white text-[13px] border-b border-amber-500/50 pb-1.5 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'National Databases' : 'राष्ट्रीय डेटाबेस'}</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>
                <a href="https://eshram.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  e-Shram Portal (30 Cr+ Workers) <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://niti.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  NITI Aayog Aspirational Districts <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://india.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  National Portal of India <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://mygov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  MyGov (Citizen Engagement) <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: MSDE Helpdesk & Office */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-bold text-white text-[13px] border-b border-amber-500/50 pb-1.5 mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'Helpdesk & Office' : 'संपर्क व सहायता'}</span>
            </h4>
            <div className="space-y-2 text-[11px] text-slate-300">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Kaushal Bhawan, New Moti Bagh, New Delhi - 110023</span>
              </p>
              <p className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-bold text-amber-300">Toll Free: 1800-123-SKILL (75455)</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>support-nlmis@msde.gov.in</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mandatory Government Website Policies (GIGW 3.0 Compliance) */}
      <div className="bg-[#071326] py-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-slate-300">
            <li><a href="#terms" className="hover:text-amber-300 hover:underline">Website Policies</a></li>
            <li className="text-slate-600">•</li>
            <li><a href="#help" className="hover:text-amber-300 hover:underline">Help & Support</a></li>
            <li className="text-slate-600">•</li>
            <li><a href="#feedback" className="hover:text-amber-300 hover:underline">Feedback</a></li>
            <li className="text-slate-600">•</li>
            <li><a href="#contact" className="hover:text-amber-300 hover:underline">Contact Us</a></li>
            <li className="text-slate-600">•</li>
            <li><a href="#terms" className="hover:text-amber-300 hover:underline">Terms & Conditions</a></li>
            <li className="text-slate-600">•</li>
            <li><a href="#privacy" className="hover:text-amber-300 hover:underline">Privacy Policy</a></li>
            <li className="text-slate-600">•</li>
            <li><a href="#hyperlink" className="hover:text-amber-300 hover:underline">Hyperlinking Policy</a></li>
            <li className="text-slate-600">•</li>
            <li><a href="#copyright" className="hover:text-amber-300 hover:underline">Copyright Policy</a></li>
            <li className="text-slate-600">•</li>
            <li><a href="#accessibility" className="hover:text-amber-300 hover:underline">Accessibility Statement</a></li>
          </ul>
        </div>
      </div>

      {/* 3. Official NIC Hosting Disclaimer & Copyright */}
      <div className="bg-[#050e1a] py-6 px-4 text-center text-slate-400 text-[11px]">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="leading-relaxed">
            Website Content Managed by{' '}
            <strong className="text-slate-200">
              Ministry of Skill Development and Entrepreneurship, Government of India
            </strong>.
          </p>
          <p className="leading-relaxed text-slate-400">
            Designed, Developed and Hosted by{' '}
            <strong className="text-slate-200">National Informatics Centre (NIC)</strong> /{' '}
            <span className="text-amber-300 font-semibold">National Labour Market Intelligence System (NLMIS) Cell</span>.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-500 border-t border-slate-800 mt-3">
            <span>Last Reviewed & Updated on: <strong className="text-slate-400">13 October 2026</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-slate-400" />
              <span>Total Visitors: <strong className="text-amber-400 font-mono">48,29,140</strong></span>
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">GIGW 3.0 & STQC Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
