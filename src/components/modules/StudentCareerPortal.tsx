import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  Briefcase, 
  Building2, 
  Printer, 
  Clock, 
  DollarSign, 
  MapPin, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  FileText,
  HelpCircle,
  QrCode,
  Download,
  Share2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';

interface StudentCareerPortalProps {
  language: Language;
  onNavigate?: (module: string) => void;
  subTab?: string;
}

interface CareerPathway {
  id: string;
  roleTitle: string;
  roleTitleHi: string;
  sector: string;
  entryQualification: string;
  startingSalary: string;
  salary3Yr: string;
  hiringCorridors: string[];
  topRecruiters: string[];
  baseReadinessPercent: number;
  prerequisiteSkills: string[];
  missingCriticalSkills: { 
    name: string; 
    durationWeeks: number; 
    freeResource: string;
    resourceType: 'DGT Bharatskills' | 'Skill India Digital' | 'SWAYAM' | 'NPTEL' | 'NCVET Lab';
  }[];
  recommendedGovtScheme: string;
  stipendAmount: string;
  interviewQuestions: { q: string; a: string }[];
}

export const STUDENT_CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: 'ev_battery_tech',
    roleTitle: 'EV Battery Pack & Powertrain Technician',
    roleTitleHi: 'ईवी बैटरी पैक एवं पावरट्रेन तकनीशियन',
    sector: 'Automotive & EV',
    entryQualification: 'ITI Electrician / Diploma Mechanical / Electrical',
    startingSalary: '₹22,000 / mo',
    salary3Yr: '₹42,000 / mo',
    hiringCorridors: ['Pithampur Auto Cluster (Dhar)', 'Dewas Industrial Area', 'Sanwer Road (Indore)'],
    topRecruiters: ['Eicher Motors', 'VE Commercial Vehicles', 'Force Motors', 'Ampere EV', 'Mahindra'],
    baseReadinessPercent: 72,
    prerequisiteSkills: ['Basic AC/DC Electrical Systems', 'Wiring Harness Reading', 'Industrial Safety Standards (IS 12992)'],
    missingCriticalSkills: [
      { name: 'Lithium Battery Cell Balancing & Testing', durationWeeks: 3, freeResource: 'DGT NSQF Level 5 EV Curriculum', resourceType: 'DGT Bharatskills' },
      { name: 'CAN Bus & OBD-II Diagnostics Protocol', durationWeeks: 2, freeResource: 'Skill India Digital EV Powertrain Module', resourceType: 'Skill India Digital' },
      { name: 'High-Voltage Safety NFPA 70E & Arc Flash', durationWeeks: 1, freeResource: 'PMKVY 4.0 Clean Mobility Course', resourceType: 'Skill India Digital' },
    ],
    recommendedGovtScheme: 'Mukhyamantri Sikho Kamao Yojana (MMSKY)',
    stipendAmount: '₹8,500 – ₹10,000 / mo DBT Stipend during 1-yr plant training',
    interviewQuestions: [
      { 
        q: 'What is the primary role of a Battery Management System (BMS)?', 
        a: 'The BMS monitors individual cell voltages, temperature, and current to prevent overcharging, thermal runaway, and ensure active/passive cell balancing.' 
      },
      { 
        q: 'What safety precautions must be taken before touching an EV high-voltage (HV) bus?', 
        a: 'Always pull the manual service disconnect (MSD), verify zero voltage with an insulated CAT-III 1000V multimeter, and wear Class 0 1000V rated dielectric gloves.' 
      },
    ],
  },
  {
    id: 'cnc_vmc_machinist',
    roleTitle: 'Precision CNC / VMC 5-Axis Machinist',
    roleTitleHi: 'प्रिसिजन सीएनसी / वीएमसी 5-एक्सिस मशीनिस्ट',
    sector: 'Heavy Engineering & Precision Tooling',
    entryQualification: 'ITI Fitter / ITI Machinist / Diploma Mechanical',
    startingSalary: '₹24,000 / mo',
    salary3Yr: '₹46,000 / mo',
    hiringCorridors: ['Pithampur Sector-3', 'Govindpura (Bhopal)', 'Sanwer Road (Indore)'],
    topRecruiters: ['Anand NVH', 'Bridgestone', 'BHEL Ancillaries', 'Kirloskar Brothers', 'HEG Mandideep'],
    baseReadinessPercent: 68,
    prerequisiteSkills: ['Vernier & Micrometer Metrology', 'Orthographic Projection Reading', 'Bench Fitting & Lathe Turning'],
    missingCriticalSkills: [
      { name: 'G-Code & M-Code Programming for Fanuc/Siemens', durationWeeks: 4, freeResource: 'DGT CTS Machinist Trade Portal', resourceType: 'DGT Bharatskills' },
      { name: 'CAD/CAM SolidWorks / MasterCAM Setup', durationWeeks: 3, freeResource: 'MSME Technology Centre Indore Virtual Lab', resourceType: 'NCVET Lab' },
      { name: 'Coordinate Measuring Machine (CMM) Inspection', durationWeeks: 2, freeResource: 'NCVET Quality Control Module', resourceType: 'Skill India Digital' },
    ],
    recommendedGovtScheme: 'National Apprenticeship Promotion Scheme (NAPS)',
    stipendAmount: '₹9,200 / mo + ₹1,500 govt contribution (Direct Benefit Transfer)',
    interviewQuestions: [
      { 
        q: 'What is the difference between G00 and G01 in CNC programming?', 
        a: 'G00 is rapid non-cutting positioning at max feed rate, while G01 is linear cutting interpolation with a specified controlled feed rate (F).' 
      },
      { 
        q: 'How do you compensate for tool wear during a production run?', 
        a: 'By measuring the finished dimension with a micrometer and updating the tool wear offset in the CNC controller geometry table (D-offset for radius, H-offset for length).' 
      },
    ],
  },
  {
    id: 'solar_pv_specialist',
    roleTitle: 'Solar PV Microgrid & Inverter Specialist',
    roleTitleHi: 'सोलर पीवी माइक्रोग्रिड एवं इन्वर्टर विशेषज्ञ',
    sector: 'Renewable Energy & Clean Tech',
    entryQualification: 'ITI Wireman / Electrician / Diploma Electrical',
    startingSalary: '₹20,500 / mo',
    salary3Yr: '₹38,000 / mo',
    hiringCorridors: ['Rewa Ultra Mega Solar Hub', 'Neemuch & Mandsaur Solar Parks', 'Agar-Shajapur'],
    topRecruiters: ['Tata Power Solar', 'Adani Green', 'NTPC Renewable', 'Suzlon', 'Waaree Energies'],
    baseReadinessPercent: 78,
    prerequisiteSkills: ['Earthing & Lightning Arrestor Setup', 'Single Line Diagrams (SLD)', 'Three-Phase Motor Starters'],
    missingCriticalSkills: [
      { name: 'String Inverter SCADA Communication & Modbus', durationWeeks: 2, freeResource: 'Suryamitra Skill Development Program', resourceType: 'Skill India Digital' },
      { name: 'Thermal Imaging Drone Hotspot Detection', durationWeeks: 2, freeResource: 'Skill India Green Hydrogen & Solar Lab', resourceType: 'Skill India Digital' },
      { name: 'Net Metering & HT Substation Switching', durationWeeks: 2, freeResource: 'MPSEB Grid Interconnection Manual', resourceType: 'SWAYAM' },
    ],
    recommendedGovtScheme: 'Suryamitra Skill Development Scheme (100% Free Training)',
    stipendAmount: '100% Free residential course + ₹8,000 / mo apprenticeship stipend',
    interviewQuestions: [
      { 
        q: 'What causes hot spots in solar PV panels and how are they prevented?', 
        a: 'Hot spots occur when cracked, soiled, or shaded cells consume power rather than generate it. Bypass diodes in the junction box bypass current around shaded strings.' 
      },
      { 
        q: 'What is the function of maximum power point tracking (MPPT)?', 
        a: 'MPPT dynamically adjusts the electrical operating point of the inverter to extract the maximum available power from the solar PV array under varying solar irradiance.' 
      },
    ],
  },
  {
    id: 'plc_automation_engineer',
    roleTitle: 'Industrial PLC & SCADA Automation Tech',
    roleTitleHi: 'औद्योगिक पीएलसी एवं स्काडा ऑटोमेशन तकनीशियन',
    sector: 'Electronics & Smart Manufacturing',
    entryQualification: 'Diploma EE/ECE / B.Tech / ITI Electronic Mechanic',
    startingSalary: '₹26,000 / mo',
    salary3Yr: '₹54,000 / mo',
    hiringCorridors: ['Indore Super Corridor', 'Mandideep Industrial Area', 'Pithampur'],
    topRecruiters: ['Siemens Automation', 'Schneider Electric', 'Lupin Mandideep', 'ITC Agro', 'TCS Embedded'],
    baseReadinessPercent: 64,
    prerequisiteSkills: ['Basic Relay Logic', 'Sensor Digital/Analog I/O', 'Basic Programming / C'],
    missingCriticalSkills: [
      { name: 'Ladder Logic (Siemens TIA Portal & Allen-Bradley)', durationWeeks: 4, freeResource: 'DGT Advanced Automation Lab', resourceType: 'DGT Bharatskills' },
      { name: 'HMI Screen Designing & SCADA Alarms', durationWeeks: 3, freeResource: 'NPTEL Industrial Automation Course', resourceType: 'NPTEL' },
      { name: 'Variable Frequency Drive (VFD) Calibration', durationWeeks: 2, freeResource: 'MSDE Industry 4.0 Standard', resourceType: 'Skill India Digital' },
    ],
    recommendedGovtScheme: 'Dual System of Training (DST) with Siemens Lab',
    stipendAmount: '₹10,500 / mo industry stipend during 6-month plant term',
    interviewQuestions: [
      { 
        q: 'What are the main components of a standard PLC scan cycle?', 
        a: '1. Read inputs, 2. Execute ladder logic program, 3. Diagnostics & communication tasks, 4. Update physical outputs.' 
      },
      { 
        q: 'How does a 4-20mA current loop differ from a 0-10V analog signal in factory environments?', 
        a: '4-20mA signals are immune to electrical noise and voltage drops over long factory floor distances, and 4mA allows detection of broken wire faults (live zero).' 
      },
    ],
  },
  {
    id: 'pharma_qa_analyst',
    roleTitle: 'Pharmaceutical Cleanroom & HPLC Analyst',
    roleTitleHi: 'फार्मास्युटिकल क्लीनरूम एवं एचपीएलसी विश्लेषक',
    sector: 'Pharmaceuticals & API',
    entryQualification: 'B.Sc Chemistry / B.Pharm / D.Pharm / ITI Chem Plant',
    startingSalary: '₹23,000 / mo',
    salary3Yr: '₹44,000 / mo',
    hiringCorridors: ['Pithampur Pharma SEZ', 'Dewas Pharma Zone', 'Indore Sanwer Road'],
    topRecruiters: ['Lupin Ltd', 'Cipla Ltd', 'Sun Pharma', 'Ipca Laboratories', 'Glenmark'],
    baseReadinessPercent: 70,
    prerequisiteSkills: ['Standard Solution Preparation', 'Titration & pH Metrology', 'Laboratory Safety & PPE'],
    missingCriticalSkills: [
      { name: 'High Performance Liquid Chromatography (HPLC)', durationWeeks: 4, freeResource: 'DGT Pharma Lab Training Module', resourceType: 'DGT Bharatskills' },
      { name: 'cGMP & USFDA Data Integrity 21 CFR Part 11', durationWeeks: 2, freeResource: 'Life Sciences Sector Skill Council (LSSSDC)', resourceType: 'Skill India Digital' },
      { name: 'Cleanroom Class 100 Aseptic Gowning & Airflow', durationWeeks: 1, freeResource: 'National Skill Development Corp (NSDC)', resourceType: 'Skill India Digital' },
    ],
    recommendedGovtScheme: 'NAPS Pharma Apprenticeship Scheme',
    stipendAmount: '₹9,800 / mo stipend + plant canteen & transportation',
    interviewQuestions: [
      { 
        q: 'What is the difference between Reverse Phase (RP) and Normal Phase HPLC?', 
        a: 'In Reverse Phase HPLC, the stationary phase is non-polar (e.g. C18 silica) and the mobile phase is polar (water/methanol/acetonitrile), which is the standard for 90% of drug assays.' 
      },
      { 
        q: 'What is 21 CFR Part 11 compliance in a pharma quality control lab?', 
        a: 'USFDA regulation defining criteria under which electronic records and electronic signatures are considered trustworthy, reliable, and equivalent to paper records with audit trails.' 
      },
    ],
  },
  {
    id: 'drone_avionics_tech',
    roleTitle: 'Drone Assembly, Telemetry & Avionics Tech',
    roleTitleHi: 'ड्रोन असेंबली, टेलीमेट्री एवं एवियोनिक्स तकनीशियन',
    sector: 'Aerospace & Defence',
    entryQualification: 'Diploma ECE / EE / ITI Electronic Mechanic / B.Sc Physics',
    startingSalary: '₹25,000 / mo',
    salary3Yr: '₹48,000 / mo',
    hiringCorridors: ['Bhopal Defence Hub', 'Indore Drone Testing Area', 'Jabalpur'],
    topRecruiters: ['Zen Technologies', 'Drone Federation Partners', 'Alpha Design', 'Garuda Aerospace'],
    baseReadinessPercent: 65,
    prerequisiteSkills: ['Basic Soldering & Wiring', 'Radio Frequency Basics', 'Microcontroller Interfacing'],
    missingCriticalSkills: [
      { name: 'Pixhawk Flight Controller & Mission Planner Setup', durationWeeks: 3, freeResource: 'DGT Remotely Piloted Aircraft Course', resourceType: 'DGT Bharatskills' },
      { name: 'DGCA Remote Pilot Regulations & Airspace Rules', durationWeeks: 1, freeResource: 'DigitalSky Civil Aviation Portal', resourceType: 'Skill India Digital' },
      { name: 'Brushless DC (BLDC) Motor ESC Calibration', durationWeeks: 2, freeResource: 'SWAYAM Drone Dynamics Course', resourceType: 'SWAYAM' },
    ],
    recommendedGovtScheme: 'PMKVY 4.0 Drone Shakti Initiative',
    stipendAmount: '₹9,000 / mo apprenticeship stipend + DGCA Pilot License training subsidy',
    interviewQuestions: [
      { 
        q: 'What is the function of an Electronic Speed Controller (ESC) in a multirotor drone?', 
        a: 'The ESC converts DC battery voltage into 3-phase AC signals at variable frequency to precisely regulate the RPM of brushless DC (BLDC) motors based on flight controller commands.' 
      },
      { 
        q: 'What are the DGCA drone weight classifications in India?', 
        a: 'Nano (<250g), Micro (250g–2kg), Small (2kg–25kg), Medium (25kg–150kg), and Large (>150kg).' 
      },
    ],
  },
  {
    id: 'logistics_wms_controller',
    roleTitle: 'Smart Warehouse & WMS Operations Controller',
    roleTitleHi: 'स्मार्ट वेयरहाउस एवं डब्ल्यूएमएस ऑपरेशंस कंट्रोलर',
    sector: 'Logistics & Supply Chain',
    entryQualification: '12th Pass / Graduate / ITI COPA / Diploma',
    startingSalary: '₹19,000 / mo',
    salary3Yr: '₹34,000 / mo',
    hiringCorridors: ['Pithampur MMLP', 'Tihi Inland Container Depot', 'Dewas Warehouse Hub'],
    topRecruiters: ['CONCOR', 'TCI Express', 'DHL Supply Chain', 'Delhivery Hub', 'Adani Logistics'],
    baseReadinessPercent: 74,
    prerequisiteSkills: ['Basic Inventory Auditing', 'MS Excel / Computer Operations', 'Workplace Safety'],
    missingCriticalSkills: [
      { name: 'Warehouse Management Systems (SAP MM / Oracle WMS)', durationWeeks: 3, freeResource: 'Skill India Digital Logistics Module', resourceType: 'Skill India Digital' },
      { name: 'RFID & Handheld Barcode Scanner Workflows', durationWeeks: 1, freeResource: 'Logistics Sector Skill Council (LSC)', resourceType: 'Skill India Digital' },
      { name: 'Cold Chain Temperature Logger Protocols', durationWeeks: 2, freeResource: 'NCCD Cold Chain Training Portal', resourceType: 'SWAYAM' },
    ],
    recommendedGovtScheme: 'PM Vishwakarma & NAPS Logistics Apprenticeship',
    stipendAmount: '₹8,200 / mo + free workplace insurance coverage',
    interviewQuestions: [
      { 
        q: 'What is the difference between FIFO and LIFO in inventory storage?', 
        a: 'FIFO (First-In, First-Out) ensures older batches ship first, mandatory for pharmaceuticals and perishables; LIFO (Last-In, First-Out) ships newest items first.' 
      },
      { 
        q: 'What is a Pick-to-Light system in automated fulfillment centers?', 
        a: 'An optical indicator system that lights up storage bin locations with item quantities, guiding warehouse pickers with zero scanning latency.' 
      },
    ],
  },
];

const QUALIFICATION_OPTIONS = [
  'ITI Electrician (2 Years CTS)',
  'ITI Fitter (2 Years CTS)',
  'ITI Welder (1 Year CTS)',
  'ITI Machinist / Turner (2 Years CTS)',
  'ITI Electronic Mechanic / COPA',
  'Diploma in Mechanical Engineering',
  'Diploma in Electrical & Electronics',
  'Diploma in Computer Science / IT',
  'B.Tech / B.E. (Mechanical / EE / CS / Civil)',
  'B.Sc / BCA / B.Pharm Graduate',
  '10th / 12th Pass with Vocational Subject',
];

export const StudentCareerPortal: React.FC<StudentCareerPortalProps> = ({
  language,
  onNavigate,
  subTab,
}) => {
  const t = translations[language];

  // Student Input State
  const [selectedQualification, setSelectedQualification] = useState<string>('ITI Electrician (2 Years CTS)');
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('ev_battery_tech');
  const [acquiredSkills, setAcquiredSkills] = useState<Record<string, boolean>>({});
  const [studentName, setStudentName] = useState<string>('Aman Sharma');
  const [studentDistrict, setStudentDistrict] = useState<string>('Indore / Dhar');
  const [activeInterviewTab, setActiveInterviewTab] = useState<number | null>(null);

  // Handle incoming subTab navigation
  React.useEffect(() => {
    if (!subTab) return;
    if (subTab === 'pathways') {
      const el = document.getElementById('student-pathways-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (subTab === 'courses') {
      const el = document.getElementById('student-skill-bridge');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (subTab === 'stipend') {
      const el = document.getElementById('student-stipend-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (subTab === 'viva') {
      const el = document.getElementById('student-viva-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (subTab === 'passport') {
      const el = document.getElementById('student-passport-card');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [subTab]);

  const selectedPathway = useMemo(() => {
    return STUDENT_CAREER_PATHWAYS.find((p) => p.id === selectedPathwayId) || STUDENT_CAREER_PATHWAYS[0];
  }, [selectedPathwayId]);

  // Calculate live readiness score based on checked missing skills
  const calculatedReadiness = useMemo(() => {
    const base = selectedPathway.baseReadinessPercent;
    const totalMissing = selectedPathway.missingCriticalSkills.length;
    let checkedCount = 0;
    selectedPathway.missingCriticalSkills.forEach((sk) => {
      if (acquiredSkills[`${selectedPathway.id}_${sk.name}`]) {
        checkedCount += 1;
      }
    });

    const addedPoints = totalMissing > 0 ? (checkedCount / totalMissing) * (100 - base) : 0;
    return Math.min(100, Math.round(base + addedPoints));
  }, [selectedPathway, acquiredSkills]);

  const toggleSkillAcquired = (skillKey: string) => {
    setAcquiredSkills((prev) => ({
      ...prev,
      [skillKey]: !prev[skillKey],
    }));
  };

  const handlePrintPassport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Pristine Light & Dark Mode Student Banner */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 uppercase tracking-wider">
              {language === 'en' ? 'Student & Youth Career Navigator' : 'विद्यार्थी एवं युवा करियर मार्गदर्शिका'}
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-xs text-teal-700 dark:text-teal-400 font-bold">
              Aligned with NAPS, MMSKY & DGT Bharatskills
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
            {language === 'en' ? 'Industrial Job Readiness & Student Career Portal' : 'औद्योगिक रोज़गार तत्परता एवं विद्यार्थी करियर पोर्टल'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
            {language === 'en'
              ? 'Select your current trade or diploma to discover high-paying industrial manufacturing roles, evaluate your live skill readiness score, access free government certification courses, and claim monthly apprenticeship stipends (₹8,500 – ₹10,500/mo).'
              : 'अपनी योग्यता चुनें, उच्च वेतन वाली औद्योगिक नौकरियों की पहचान करें, अपनी कौशल तत्परता स्कोर देखें और सरकारी वज़ीफ़ा (Stipend) प्राप्त करें।'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrintPassport}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-[#101828] border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4 text-[#0F9F94]" />
            <span>Print Skill Card</span>
          </button>
          {onNavigate && (
            <button
              onClick={() => onNavigate('industrial_sector')}
              className="px-3.5 py-2.5 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Building2 className="w-4 h-4" />
              <span>Explore All 12 Sectors</span>
            </button>
          )}
        </div>
      </div>

      {/* Step 1: Qualification & Target Role Selector Bar */}
      <div id="student-pathways-section" className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-teal-600" />
              <span>1. Your Current Trade / Qualification</span>
            </label>
            <select
              value={selectedQualification}
              onChange={(e) => setSelectedQualification(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
            >
              {QUALIFICATION_OPTIONS.map((q, idx) => (
                <option key={idx} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>2. Target High-Growth Industrial Role</span>
            </label>
            <select
              value={selectedPathwayId}
              onChange={(e) => setSelectedPathwayId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            >
              {STUDENT_CAREER_PATHWAYS.map((p) => (
                <option key={p.id} value={p.id}>
                  {language === 'en' ? `${p.roleTitle} (${p.sector})` : `${p.roleTitleHi} (${p.sector})`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>3. Preferred Industrial Corridor / City</span>
            </label>
            <select
              value={studentDistrict}
              onChange={(e) => setStudentDistrict(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="Indore / Dhar">Indore & Pithampur Auto Cluster</option>
              <option value="Bhopal / Mandideep">Bhopal & Mandideep Heavy Engineering</option>
              <option value="Dewas Industrial Zone">Dewas Industrial & Pharma Zone</option>
              <option value="Rewa / Singrauli">Rewa Solar Park & Singrauli Mining</option>
              <option value="Jabalpur Corridor">Jabalpur Defence & Ordnance Corridor</option>
            </select>
          </div>
        </div>

        {/* Student Name customization input for Print Card */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Candidate Name:</span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Aman Sharma"
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <span className="text-[11px] text-teal-700 font-semibold">
            🎓 Instant mapping to {selectedPathway.topRecruiters.length} top industrial employers in {studentDistrict}
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Readiness & Pathway Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Role Overview & Live Readiness Calculator (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Role Snapshot Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                  {selectedPathway.sector}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                  {language === 'en' ? selectedPathway.roleTitle : selectedPathway.roleTitleHi}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Standard Entry: {selectedPathway.entryQualification}
                </p>
              </div>

              {/* Verified Placement Badge */}
              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Starting Pay</span>
                <span className="text-base sm:text-lg font-black text-emerald-700">
                  {selectedPathway.startingSalary}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  3-Yr: {selectedPathway.salary3Yr}
                </span>
              </div>
            </div>

            {/* Recruiter Anchors */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Top Hiring Companies in {studentDistrict}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPathway.topRecruiters.map((rec, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-2xs"
                  >
                    🏢 {rec}
                  </span>
                ))}
              </div>
            </div>

            {/* Prerequisite Foundation Skills */}
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Foundational Skills (Covered by {selectedQualification})</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedPathway.prerequisiteSkills.map((sk, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-semibold flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{sk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Live Skill Readiness & Bridge Checklist */}
          <div id="student-skill-bridge" className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Interactive Skill Bridge & Live Readiness Score</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tick off skills you have completed or plan to take to unlock 100% interview readiness.
                </p>
              </div>

              {/* Readiness Score Pill */}
              <div className="text-right shrink-0">
                <span className="text-3xl font-black bg-gradient-to-r from-teal-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  {calculatedReadiness}%
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider block mt-0.5 ${
                  calculatedReadiness >= 85 
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' 
                    : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                }`}>
                  {calculatedReadiness >= 85 ? '🌟 100% Plant Eligible' : 'In Skill Upgrade'}
                </span>
              </div>
            </div>

            {/* Vibrant Multi-Color Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3.5 p-0.5 overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-500 shadow-xs"
                style={{ width: `${calculatedReadiness}%` }}
              />
            </div>

            {/* Missing Critical Skills Checklist */}
            <div className="space-y-2.5 pt-1">
              {selectedPathway.missingCriticalSkills.map((skill, idx) => {
                const skillKey = `${selectedPathway.id}_${skill.name}`;
                const isChecked = !!acquiredSkills[skillKey];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleSkillAcquired(skillKey)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-300 dark:border-teal-700 ring-1 ring-teal-300/40'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold ${isChecked ? 'text-teal-950 dark:text-teal-200 line-through' : 'text-slate-900 dark:text-white'}`}>
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded shrink-0">
                          ⏱️ {skill.durationWeeks} Weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-teal-700 dark:text-teal-400">
                          Free Course: {skill.freeResource}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.2 rounded border border-indigo-200 dark:border-indigo-800">
                          {skill.resourceType}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scheme & Stipend Callout */}
            <div id="student-stipend-section" className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Government Financial Aid & Monthly Stipend:</span>
                </span>
                <span className="font-black text-amber-800 dark:text-amber-300">
                  {selectedPathway.recommendedGovtScheme}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                💰 <strong>{selectedPathway.stipendAmount}</strong> under official DBT direct to student bank account.
              </p>
            </div>
          </div>

          {/* Plant VIVA & Technical Interview Prep */}
          <div id="student-viva-section" className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Plant Technical Interview & VIVA Questions</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click to reveal answers to commonly asked questions during shopfloor technician walk-in interviews.
            </p>

            <div className="space-y-2">
              {selectedPathway.interviewQuestions.map((qItem, qIdx) => {
                const isOpen = activeInterviewTab === qIdx;
                return (
                  <div
                    key={qIdx}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setActiveInterviewTab(isOpen ? null : qIdx)}
                      className="w-full text-left p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 flex items-center justify-between gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <span>Q{qIdx + 1}: {qItem.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 font-medium border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                        <strong className="text-teal-700 dark:text-teal-400">Recommended Answer: </strong>
                        {qItem.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Printable Student Skill Card & Career Passport (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div id="student-passport-card" className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden space-y-4">
            {/* National Seal Header */}
            <div className="border-b-2 border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Govt. of India • MSDE
                </span>
                <h4 className="text-sm font-black text-slate-900 mt-1">
                  National Digital Career Passport
                </h4>
                <p className="text-[10px] text-slate-500">
                  SkillSetu Verified Competency Credentials
                </p>
              </div>

              <div className="w-12 h-12 bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-center p-1 shrink-0">
                <QrCode className="w-10 h-10 text-slate-800" />
              </div>
            </div>

            {/* Candidate Identity */}
            <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Candidate Name:</span>
                <span className="font-black text-slate-900">{studentName || 'Student Candidate'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Trade Qualification:</span>
                <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">{selectedQualification}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Location Corridor:</span>
                <span className="font-bold text-slate-800">{studentDistrict}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Target Trade:</span>
                <span className="font-bold text-teal-800">{selectedPathway.roleTitle}</span>
              </div>
            </div>

            {/* Readiness Gauge */}
            <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-teal-900 uppercase">Live Skill Readiness</span>
                <div className="text-xl font-black text-teal-800">
                  {calculatedReadiness}% Competency
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-600 block">Status:</span>
                <span className="text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  {calculatedReadiness >= 85 ? '✓ Plant Eligible' : 'In Skill Upgrade'}
                </span>
              </div>
            </div>

            {/* Verified Skills Summary */}
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Verified Skills on Record:
              </span>
              <div className="space-y-1 text-xs">
                {selectedPathway.prerequisiteSkills.map((sk, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{sk}</span>
                  </div>
                ))}
                {selectedPathway.missingCriticalSkills.map((sk, idx) => {
                  const isChecked = !!acquiredSkills[`${selectedPathway.id}_${sk.name}`];
                  if (!isChecked) return null;
                  return (
                    <div key={idx} className="flex items-center gap-1.5 text-teal-800 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{sk.name} (Bridge Completed)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Plant Hiring Action */}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={handlePrintPassport}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Skill Card (PDF)</span>
              </button>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('industrial_sector')}
                  className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-teal-700" />
                  <span>View Industrial Plants in {studentDistrict}</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-600" />
              <span>How Apprenticeships Work (NAPS & MMSKY)</span>
            </h5>
            <p className="leading-relaxed">
              1. <strong>Register</strong> on the NAPS (apprenticeshipindia.gov.in) or MMSKY portal.
            </p>
            <p className="leading-relaxed">
              2. <strong>Attach this Skill Card</strong> showing your live skill readiness % to get preferential screening by plant HRs.
            </p>
            <p className="leading-relaxed">
              3. <strong>Stipend</strong> is paid directly into your Aadhaar-linked bank account every month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
