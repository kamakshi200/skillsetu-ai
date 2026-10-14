import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Factory, 
  Zap, 
  Cpu, 
  Pill, 
  Wheat, 
  Shirt, 
  Wrench, 
  Filter, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Briefcase, 
  Download,
  Search,
  Sparkles,
  Plane,
  Truck,
  Flame,
  HardHat,
  ChevronRight,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';

interface IndustrialSectorHubProps {
  language: Language;
  onNavigate?: (module: string) => void;
  subTab?: string;
}

export interface IndustrialSector {
  id: string;
  name: string;
  nameHi: string;
  category: 'Heavy Manufacturing' | 'High-Tech & Electronics' | 'Clean Energy' | 'Life Sciences' | 'Consumer & Textiles' | 'Agro & Food' | 'Logistics & Infrastructure';
  icon: React.ComponentType<{ className?: string }>;
  clusterLocations: string[];
  majorCompanies: string[];
  totalUnits: number;
  openVacancies: number;
  apprenticeshipSeats: number;
  avgStartingWage: string;
  skilledTechnicianWage: string;
  shortageLevel: 'Critical' | 'High' | 'Moderate';
  keyTrades: string[];
  topDemandedSkills: string[];
  studentPathwayId: string;
  description: string;
  descriptionHi: string;
}

export const ALL_INDUSTRIAL_SECTORS: IndustrialSector[] = [
  {
    id: 'automotive_ev',
    name: 'Automotive & EV Manufacturing',
    nameHi: 'ऑटोमोटिव एवं ईवी निर्माण (Automotive & EV)',
    category: 'Heavy Manufacturing',
    icon: Factory,
    clusterLocations: ['Pithampur Auto Cluster (Dhar)', 'Dewas Industrial Area', 'Sanwer Road (Indore)', 'Mandideep'],
    majorCompanies: ['Eicher Motors', 'VE Commercial Vehicles', 'Mahindra 2-Wheelers', 'Force Motors', 'Bridgestone', 'Anand NVH'],
    totalUnits: 840,
    openVacancies: 6850,
    apprenticeshipSeats: 3200,
    avgStartingWage: '₹18,500 / mo',
    skilledTechnicianWage: '₹34,000 / mo',
    shortageLevel: 'Critical',
    keyTrades: ['Automotive Assembly Technician', 'EV Battery Pack Specialist', 'CNC VMC Programmer', 'Robotic Welding Operator'],
    topDemandedSkills: ['Battery Management Systems (BMS)', 'CAN Bus Diagnostics', 'High Voltage Safety (NFPA 70E)', 'Fanuc/KUKA Robotics'],
    studentPathwayId: 'ev_battery_tech',
    description: 'Central India\'s premier automotive manufacturing corridor with rapid electrification across commercial buses, 2-wheelers, tractors, and precision gear assemblies.',
    descriptionHi: 'पीथमपुर मध्य भारत का प्रमुख ऑटोमोटिव हब है जहाँ इलेक्ट्रिक वाहन (EV), वाणिज्यिक वाहन और ट्रांसमिशन निर्माण में भारी विस्तार हो रहा है।',
  },
  {
    id: 'it_electronics',
    name: 'IT, Electronics & Semiconductor Ancillaries',
    nameHi: 'आईटी, इलेक्ट्रॉनिक्स एवं सेमीकंडक्टर (IT & Electronics)',
    category: 'High-Tech & Electronics',
    icon: Cpu,
    clusterLocations: ['Super Corridor (Indore)', 'Crystal IT Park (Indore)', 'Bhopal IT Park', 'Electronic Complex Pardesipura'],
    majorCompanies: ['TCS', 'Infosys', 'Yash Technologies', 'Impetus Technologies', 'Teleperformance', 'Optiemus Electronics'],
    totalUnits: 520,
    openVacancies: 5400,
    apprenticeshipSeats: 2100,
    avgStartingWage: '₹24,000 / mo',
    skilledTechnicianWage: '₹48,000 / mo',
    shortageLevel: 'Critical',
    keyTrades: ['Embedded Systems Technician', 'PCB Surface Mount Specialist', 'Data Ops & Cloud Associate', 'Full-Stack Developer'],
    topDemandedSkills: ['Python & FastApi', 'IoT Sensor Protocols (MQTT)', 'PCB Soldering IPC-A-610', 'Linux Kernel Diagnostics'],
    studentPathwayId: 'plc_automation_engineer',
    description: 'Tier-2 technology engine with Tier-3/4 IT parks, smart device assembly, and embedded semiconductor design units expanding under the India Semiconductor Mission (ISM).',
    descriptionHi: 'इंदौर सुपर कॉरिडोर एवं भोपाल आईटी पार्क में सॉफ्टवेयर विकास, एंबेडेड सिस्टम और क्लाउड ऑपरेशंस में तीव्र विस्तार।',
  },
  {
    id: 'renewable_energy',
    name: 'Renewable Energy, Solar & Wind',
    nameHi: 'नवीकरणीय ऊर्जा, सोलर एवं पवन ऊर्जा (Renewable Energy)',
    category: 'Clean Energy',
    icon: Zap,
    clusterLocations: ['Rewa Ultra Mega Solar (750MW)', 'Neemuch Solar Park', 'Mandsaur Wind Corridors', 'Agar-Shajapur Solar Park'],
    majorCompanies: ['Rewa Ultra Mega Solar Ltd', 'NTPC Renewable', 'Tata Power Solar', 'Adani Green', 'Suzlon', 'Waaree Energies'],
    totalUnits: 290,
    openVacancies: 3100,
    apprenticeshipSeats: 1650,
    avgStartingWage: '₹19,000 / mo',
    skilledTechnicianWage: '₹36,000 / mo',
    shortageLevel: 'High',
    keyTrades: ['Solar PV Installation Engineer', 'Grid Inverter Specialist', 'Wind Turbine Maintenance Technician', 'Green Hydrogen Plant Associate'],
    topDemandedSkills: ['Solar PV String Sizing', 'Microgrid SCADA Controls', 'High Voltage Substation Switching', 'Thermal Drone Inspection'],
    studentPathwayId: 'solar_pv_specialist',
    description: 'Leading national clean energy producer with massive utility-scale solar parks, grid-tied battery storage (BESS), and rising green hydrogen projects.',
    descriptionHi: 'रीवा और नीमच सोलर पार्कों के साथ मध्य प्रदेश भारत का प्रमुख स्वच्छ ऊर्जा केंद्र है, जहाँ सौर तकनीशियनों की भारी मांग है।',
  },
  {
    id: 'pharma_healthcare',
    name: 'Pharmaceuticals, API & Medical Devices',
    nameHi: 'फार्मास्यूटिकल्स एवं दवा निर्माण (Pharmaceuticals & API)',
    category: 'Life Sciences',
    icon: Pill,
    clusterLocations: ['Pithampur Pharma SEZ', 'Dewas Pharma Zone', 'Indore Sanwer Road', 'Mandideep Industrial Estate'],
    majorCompanies: ['Lupin Ltd', 'Cipla Ltd', 'Sun Pharma', 'Glenmark Pharmaceuticals', 'Ipca Laboratories', 'Ajanta Pharma'],
    totalUnits: 430,
    openVacancies: 4200,
    apprenticeshipSeats: 1950,
    avgStartingWage: '₹20,000 / mo',
    skilledTechnicianWage: '₹38,000 / mo',
    shortageLevel: 'Critical',
    keyTrades: ['Pharmaceutical Formulations Operator', 'HPLC Quality Analyst', 'Cleanroom HVAC Maintenance', 'Packaging Machine Operator'],
    topDemandedSkills: ['cGMP & USFDA Compliance', 'High Performance Liquid Chromatography (HPLC)', 'Cleanroom Class 100/1000 Protocol', 'Sterile Filtration'],
    studentPathwayId: 'pharma_qa_analyst',
    description: 'Global export formulations hub manufacturing active pharmaceutical ingredients (API) and sterile injectable medicines complying with strict USFDA & WHO guidelines.',
    descriptionHi: 'पीथमपुर और देवास में यूएसएफडीए (USFDA) अनुपालन युक्त आधुनिक दवा निर्माण इकाइयाँ और गुणवत्ता विश्लेषकों की मांग।',
  },
  {
    id: 'advanced_precision_machining',
    name: 'Precision Engineering & CNC Tooling',
    nameHi: 'प्रिसिजन इंजीनियरिंग एवं सीएनसी टूलिंग (Precision Tooling)',
    category: 'Heavy Manufacturing',
    icon: Wrench,
    clusterLocations: ['Govindpura Industrial Area (Bhopal)', 'Pithampur Sector-3', 'Sanwer Road (Indore)', 'Gwalior Tool Hub'],
    majorCompanies: ['BHEL Ancillaries', 'Indo German Tool Room (IGTR)', 'Kirloskar Brothers', 'HEG Limited', 'Crompton Greaves'],
    totalUnits: 620,
    openVacancies: 3800,
    apprenticeshipSeats: 2100,
    avgStartingWage: '₹19,500 / mo',
    skilledTechnicianWage: '₹36,500 / mo',
    shortageLevel: 'High',
    keyTrades: ['CNC VMC 5-Axis Operator', 'Die & Mould Maker', 'CMM Metrology Inspector', 'Tool Room Fitter'],
    topDemandedSkills: ['G-Code & M-Code Programming', 'MasterCAM / Siemens NX Toolpath', 'Coordinate Measuring Machine (CMM)', 'GD&T Tolerancing'],
    studentPathwayId: 'cnc_vmc_machinist',
    description: 'High-precision dies, moulds, fixtures, and aerospace component machining supplying national defence and global export customers.',
    descriptionHi: 'गोविंदपुरा और पीथमपुर में 5-एक्सिस सीएनसी मशीनिंग, डाई एवं मोल्ड निर्माण, तथा रक्षा क्षेत्र हेतु सूक्ष्म उपकरण।',
  },
  {
    id: 'agro_foodtech',
    name: 'Agro-Processing & Food Technology',
    nameHi: 'कृषि-प्रसंस्करण एवं खाद्य प्रसंस्करण (Agro & Food Processing)',
    category: 'Agro & Food',
    icon: Wheat,
    clusterLocations: ['Malwa Mega Food Park (Khargone)', 'Hoshangabad Grain Corridor', 'Ujjain Soy-Processing Zone', 'Sehore Agro Complex'],
    majorCompanies: ['Ruchi Soya (Patanjali)', 'ITC Agro Business', 'Dabur India', 'Cargill', 'Adani Wilmar', 'Haldiram Foods'],
    totalUnits: 720,
    openVacancies: 3450,
    apprenticeshipSeats: 2200,
    avgStartingWage: '₹16,500 / mo',
    skilledTechnicianWage: '₹28,000 / mo',
    shortageLevel: 'Moderate',
    keyTrades: ['Cold Chain Logistics Operator', 'Food Safety & HACCP Inspector', 'Industrial Grain Miller', 'Dairy Processing Technician'],
    topDemandedSkills: ['HACCP & FSSAI Standards', 'Ammonia Chilling Plant Maintenance', 'Automated Grain Silo Operations', 'Aseptic Tetra Packaging'],
    studentPathwayId: 'agro_coldchain_tech',
    description: 'Transforming central India\'s agricultural heartland into high-value processed flour, soybean oil extracts, organic dairy products, and refrigerated logistics chains.',
    descriptionHi: 'मालवा और नर्मदा घाटी के कृषि उत्पादों को मूल्य संवर्धित खाद्य उत्पादों, सोया तेल और कोल्ड स्टोरेज लॉजिस्टिक्स में बदलना।',
  },
  {
    id: 'textiles_apparel',
    name: 'Textiles, Garments & Technical Fabrics',
    nameHi: 'वस्त्र, परिधान एवं तकनीकी टेक्सटाइल्स (Textiles & Garments)',
    category: 'Consumer & Textiles',
    icon: Shirt,
    clusterLocations: ['Pithampur Textile SEZ', 'Burhanpur Powerloom Cluster', 'Chhindwara Cotton Belt', 'Ujjain & Gwalior Weaving Mills'],
    majorCompanies: ['Pratibha Syntex', 'Grasim Industries', 'Vardhman Textiles', 'Raymond Ltd', 'Maral Overseas', 'Naharm Spinning'],
    totalUnits: 610,
    openVacancies: 3200,
    apprenticeshipSeats: 2150,
    avgStartingWage: '₹15,000 / mo',
    skilledTechnicianWage: '₹26,000 / mo',
    shortageLevel: 'Moderate',
    keyTrades: ['Automated Loom Tuner', 'Garment Quality Inspector', 'Eco-Dyeing Plant Operator', 'Pattern Master (CAD/CAM)'],
    topDemandedSkills: ['Airjet & Rapier Loom Tuning', 'Oeko-Tex Standard 100', 'Gerber/Lectra Garment CAD', 'Effluent Treatment Plant (ETP) Ops'],
    studentPathwayId: 'textile_cad_operator',
    description: 'Cotton-rich spinning and sustainable organic garment manufacturing corridor with heavy exports to leading European and US apparel brands.',
    descriptionHi: 'मध्य प्रदेश का कपास-आधारित कताई, बुनाई और परिधान निर्यात हब जो हज़ारों कुशल ऑपरेटरों को रोज़गार देता है।',
  },
  {
    id: 'aerospace_defence',
    name: 'Aerospace, Defence & Drone Technology',
    nameHi: 'एयरोस्पेस, रक्षा उपकरण एवं ड्रोन (Aerospace & Defence)',
    category: 'High-Tech & Electronics',
    icon: Plane,
    clusterLocations: ['Bhopal Defence Ancillary Zone', 'Jabalpur Ordnance Corridor', 'Indore Aerospace Testing Hub'],
    majorCompanies: ['Ordnance Factory Board (Yantra India)', 'BHEL Defence Division', 'Zen Technologies', 'Drone Federation Partners', 'Alpha Design'],
    totalUnits: 180,
    openVacancies: 1950,
    apprenticeshipSeats: 980,
    avgStartingWage: '₹23,000 / mo',
    skilledTechnicianWage: '₹44,000 / mo',
    shortageLevel: 'High',
    keyTrades: ['Drone Assembly & Avionics Technician', 'Defence Shell Fabricator', 'Optical Target Inspector', 'Aircraft Sheet Metal Worker'],
    topDemandedSkills: ['DGCA Drone Pilot & Maintenance', 'MIL-STD Quality Inspection', 'Titanium Welding (TIG)', 'Telemetry & RF Jamming Systems'],
    studentPathwayId: 'drone_avionics_tech',
    description: 'Specialized fabrication of heavy ammunition shells, military vehicles, optical fire control sensors, and agricultural/surveillance commercial drones.',
    descriptionHi: 'जबलपुर व भोपाल में रक्षा आयुध निर्माण, बख्तरबंद वाहन और डीजीसीए-अनुमोदित वाणिज्यिक ड्रोन तकनीक का विस्तार।',
  },
  {
    id: 'chemicals_petrochem',
    name: 'Chemicals, Petrochemicals & Polymers',
    nameHi: 'रसायन, पेट्रोकेमिकल्स एवं पॉलिमर (Chemicals & Polymers)',
    category: 'Life Sciences',
    icon: Flame,
    clusterLocations: ['Bina Refinery Petrochem Hub (Sagar)', 'Nagda Chemical Complex (Ujjain)', 'Dewas Polymer Zone'],
    majorCompanies: ['Bharat Petroleum (BPCL Bina Refinery)', 'Grasim Staple Fibre', 'LANXESS India', 'United Phosphorus (UPL)', 'Deepak Fertilisers'],
    totalUnits: 310,
    openVacancies: 2650,
    apprenticeshipSeats: 1200,
    avgStartingWage: '₹21,000 / mo',
    skilledTechnicianWage: '₹40,000 / mo',
    shortageLevel: 'High',
    keyTrades: ['Chemical Plant Operator', 'Distillation Column Technician', 'Industrial Safety Officer', 'Boiler Water Chemist'],
    topDemandedSkills: ['DCS Process Automation', 'HAZOP & Process Safety Management', 'Polymer Extrusion & Granulation', 'Effluent Bio-Treatment'],
    studentPathwayId: 'chemical_process_tech',
    description: 'Anchored by the massive ₹49,000 Cr Bina Refinery Ethylene Cracker Complex, driving downstream plastic moulding, paints, and agro-fertilizers.',
    descriptionHi: 'बीना रिफाइनरी पेट्रोकेमिकल विस्तार और नागदा विस्कोस फाइबर संयंत्रों में प्रोसेस ऑपरेटरों और सुरक्षा विशेषज्ञों की मांग।',
  },
  {
    id: 'logistics_supplychain',
    name: 'Multimodal Logistics & Cold Supply Chain',
    nameHi: 'मल्टीमॉडल लॉजिस्टिक्स एवं कोल्ड सप्लाई चेन (Logistics & Supply Chain)',
    category: 'Logistics & Infrastructure',
    icon: Truck,
    clusterLocations: ['Pithampur Multi-Modal Logistics Park (MMLP)', 'Tihi Inland Container Depot', 'Dewas Warehousing Corridor', 'Bhopal Dry Port'],
    majorCompanies: ['Container Corporation of India (CONCOR)', 'TCI Express', 'DHL Supply Chain', 'Delhivery Hub', 'Adani Logistics'],
    totalUnits: 340,
    openVacancies: 3150,
    apprenticeshipSeats: 1400,
    avgStartingWage: '₹17,000 / mo',
    skilledTechnicianWage: '₹30,000 / mo',
    shortageLevel: 'Moderate',
    keyTrades: ['Forklift & Reach Truck Operator', 'WMS Inventory Controller', 'Fleet Telematics Analyst', 'Cold Storage Plant Associate'],
    topDemandedSkills: ['Warehouse Management Systems (SAP/Oracle)', 'Electric Forklift Certified', 'RFID/Barcode Inventory Scanners', 'GPS Route Optimization'],
    studentPathwayId: 'logistics_wms_controller',
    description: 'Central India\'s logistical heartland benefiting from golden quadrilateral connectivity, western dedicated freight corridor links, and mega automated fulfilment hubs.',
    descriptionHi: 'पीथमपुर मल्टीमॉडल लॉजिस्टिक्स पार्क और टिही आईसीडी में आधुनिक वेयरहाउसिंग, स्वचालित फोर्कलिफ्ट संचालन और सप्लाई चेन।',
  },
  {
    id: 'heavy_power_engineering',
    name: 'Heavy Engineering & Power Systems',
    nameHi: 'भारी इंजीनियरिंग एवं विद्युत उपकरण (Heavy Engineering & Power)',
    category: 'Heavy Manufacturing',
    icon: Wrench,
    clusterLocations: ['Govindpura (Bhopal)', 'Mandideep Industrial Estate', 'Gwalior Industrial Area', 'Ratlam Railway Works'],
    majorCompanies: ['BHEL Bhopal', 'HEG Limited (Mandideep)', 'Crompton Greaves', 'Anand NVH', 'Kirloskar Brothers'],
    totalUnits: 580,
    openVacancies: 2950,
    apprenticeshipSeats: 1550,
    avgStartingWage: '₹18,000 / mo',
    skilledTechnicianWage: '₹32,000 / mo',
    shortageLevel: 'High',
    keyTrades: ['Structural Welder (TIG/MIG 6G)', 'Heavy Transformer Assembler', 'Boiler Maintenance Technician', 'Hydraulic Press Operator'],
    topDemandedSkills: ['ASME Boiler Code Welding', 'Transformer Core Stacking', 'Hydraulic Circuit Troubleshooting', 'Metrology & CMM Inspection'],
    studentPathwayId: 'cnc_vmc_machinist',
    description: 'Hydro and thermal power turbines, world-class ultra-high voltage transformers, industrial graphite electrodes (HEG Mandideep), and rail traction motors.',
    descriptionHi: 'भोपाल और मंडीदीप में टरबाइन, भारी ट्रांसफार्मर, ग्रेफाइट इलेक्ट्रोड और रेलवे ट्रैक्शन मोटरों का राष्ट्रीय निर्माण केंद्र।',
  },
  {
    id: 'construction_mining',
    name: 'Green Infrastructure, Heavy Mining & Cement',
    nameHi: 'हरित अवसंरचना, खनन एवं सीमेंट (Infrastructure & Mining)',
    category: 'Logistics & Infrastructure',
    icon: HardHat,
    clusterLocations: ['Singrauli Mining Belt', 'Katni-Satna Cement Corridor', 'Panna Diamond Field', 'Bhopal Metro Project'],
    majorCompanies: ['Northern Coalfields Ltd (NCL)', 'Prism Johnson Cement', 'UltraTech Cement', 'Dilip Buildcon', 'NMDC Majhgawan'],
    totalUnits: 410,
    openVacancies: 2800,
    apprenticeshipSeats: 1300,
    avgStartingWage: '₹18,500 / mo',
    skilledTechnicianWage: '₹33,000 / mo',
    shortageLevel: 'Moderate',
    keyTrades: ['Heavy Earth Moving Machinery (HEMM) Operator', 'Surveyor & BIM Modeler', 'Cement Kiln Instrumentation Tech', 'Shotfirer / Blasting Safety Associate'],
    topDemandedSkills: ['Excavator & Dumper Hydraulics', 'Total Station & GPS Surveying', 'BIM Revit Architecture', 'DGMS Mine Safety Standards'],
    studentPathwayId: 'heavy_machinery_operator',
    description: 'Open-cast coal mining draglines, Asia\'s largest cement limestone belts in Katni-Satna, and high-speed expressway/metro transit infrastructure development.',
    descriptionHi: 'सिंगरौली कोयला खदानों, कटनी-सतना सीमेंट कॉरिडोर तथा भोपाल-इंदौर मेट्रो परियोजनाओं में भारी मशीनरी ऑपरेटरों की भारी मांग।',
  },
];

export const IndustrialSectorHub: React.FC<IndustrialSectorHubProps> = ({
  language,
  onNavigate,
  subTab,
}) => {
  const t = translations[language];

  const [selectedSectorId, setSelectedSectorId] = useState<string>('automotive_ev');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle incoming subTab navigation
  React.useEffect(() => {
    if (!subTab) return;
    if (subTab === 'candidate_pool') {
      const el = document.getElementById('candidate-pool-simulator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (subTab === 'all_sectors' || subTab === 'all') {
      setSelectedCategory('All');
      const el = document.getElementById('sectors-explorer-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Direct sector id (e.g. automotive_ev, renewable_clean_energy, precision_cnc_robotics, pharma_biotech, electronics_semiconductor)
      const found = ALL_INDUSTRIAL_SECTORS.find((s) => s.id === subTab);
      if (found) {
        setSelectedSectorId(found.id);
        const el = document.getElementById('sector-detail-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [subTab]);
  
  // Employer Candidate Pool Simulator State
  const [simTrade, setSimTrade] = useState<string>('EV Battery Pack Specialist');
  const [simDistrict, setSimDistrict] = useState<string>('Dhar (Pithampur)');
  const [simQuantity, setSimQuantity] = useState<number>(45);
  const [simShowNotice, setSimShowNotice] = useState<boolean>(false);

  const categories = [
    'All',
    'Heavy Manufacturing',
    'High-Tech & Electronics',
    'Clean Energy',
    'Life Sciences',
    'Agro & Food',
    'Consumer & Textiles',
    'Logistics & Infrastructure'
  ];

  const selectedSector = useMemo(() => {
    return ALL_INDUSTRIAL_SECTORS.find((s) => s.id === selectedSectorId) || ALL_INDUSTRIAL_SECTORS[0];
  }, [selectedSectorId]);

  const filteredSectors = useMemo(() => {
    return ALL_INDUSTRIAL_SECTORS.filter((s) => {
      if (selectedCategory !== 'All' && s.category !== selectedCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.nameHi.toLowerCase().includes(q) ||
        s.clusterLocations.some((c) => c.toLowerCase().includes(q)) ||
        s.majorCompanies.some((c) => c.toLowerCase().includes(q)) ||
        s.keyTrades.some((tr) => tr.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  // Aggregate Totals across all 12 industrial sectors
  const totalVacancies = useMemo(() => ALL_INDUSTRIAL_SECTORS.reduce((acc, s) => acc + s.openVacancies, 0), []);
  const totalUnits = useMemo(() => ALL_INDUSTRIAL_SECTORS.reduce((acc, s) => acc + s.totalUnits, 0), []);
  const totalApprentices = useMemo(() => ALL_INDUSTRIAL_SECTORS.reduce((acc, s) => acc + s.apprenticeshipSeats, 0), []);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setSimShowNotice(true);
    setTimeout(() => setSimShowNotice(false), 5000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Pristine Light-Mode Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 uppercase tracking-wider">
              {language === 'en' ? 'Industrial Sector & Enterprise Hub' : 'औद्योगिक क्षेत्र एवं क्लस्टर हब'}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-600 font-semibold">
              Covering All 12 Priority Industrial Sectors • MPIDC & MSDE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
            {language === 'en' ? 'All Industrial Sectors, Manufacturing Clusters & Jobs' : 'समस्त 12 औद्योगिक क्षेत्र, विनिर्माण क्लस्टर एवं रोज़गार'}
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {language === 'en'
              ? 'Comprehensive real-time intelligence for Automotive, EV, Semiconductors, Clean Tech, Pharma, Aerospace, Agro, Heavy Engineering, and Logistics. Connect shopfloor vacancies with skilled student apprentices.'
              : 'ऑटोमोटिव, ईवी, इलेक्ट्रॉनिक्स, सोलर, फार्मा, एयरोस्पेस, कृषि प्रसंस्करण और लॉजिस्टिक्स सहित सभी 12 औद्योगिक क्षेत्रों में संयंत्र रिक्तियां, वेतन और शिक्षुता अवसर।'}
          </p>
        </div>

        {/* Quick Nav to Student Portal */}
        <div className="flex items-center gap-2 shrink-0">
          {onNavigate && (
            <button
              onClick={() => onNavigate('student_portal')}
              className="px-4 py-2.5 bg-[#0F9F94] hover:bg-[#0D827A] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Career Portal</span>
            </button>
          )}
        </div>
      </div>

      {/* Macro Industrial Sector KPI Cards - High Contrast, Vibrant Government Enterprise Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Industrial Plants */}
        <div className="bg-white dark:bg-slate-900 border-2 border-[#0F9F94]/80 dark:border-[#0F9F94] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-[#0F9F94] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-black text-teal-800 dark:text-teal-300 uppercase tracking-wider">
              Total Industrial Plants
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#0F9F94] text-white shadow-xs shrink-0">
              <Factory className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {totalUnits.toLocaleString()}+
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-teal-700 dark:text-teal-300">
            <span>Across 12 Priority Corridors</span>
            <span className="text-slate-400 font-normal">MPIDC</span>
          </div>
        </div>

        {/* Card 2: Verified Open Vacancies */}
        <div className="bg-white dark:bg-slate-900 border-2 border-[#6366F1]/80 dark:border-[#6366F1] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-[#6366F1] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-black text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
              Verified Open Vacancies
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#6366F1] text-white shadow-xs shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-blue-900 dark:text-blue-300 tracking-tight">
            {totalVacancies.toLocaleString()}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-blue-700 dark:text-blue-300">
            <span>Live NCS & Enterprise Demands</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">+14% MoM</span>
          </div>
        </div>

        {/* Card 3: NAPS Apprenticeship Seats */}
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/80 dark:border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-emerald-600 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              NAPS Apprenticeship Seats
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs shrink-0">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-900 dark:text-emerald-300 tracking-tight">
            {totalApprentices.toLocaleString()}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
            <span>With Govt Stipend (₹8.5k–₹10.5k)</span>
            <span className="text-slate-400 font-normal">MMSKY Aligned</span>
          </div>
        </div>

        {/* Card 4: Avg Skilled Operator Pay */}
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-500/80 dark:border-amber-500 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-amber-600 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              Avg Skilled Operator Pay
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500 text-white shadow-xs shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-amber-950 dark:text-amber-200 tracking-tight">
            ₹34,200 / mo
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-amber-700 dark:text-amber-300">
            <span>+18% YoY in High-Tech Trades</span>
            <span className="text-slate-400 font-normal">NSQF L5</span>
          </div>
        </div>
      </div>

      {/* Industrial Category Filter Pills */}
      <div id="sectors-explorer-grid" className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider shrink-0 pl-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0F9F94] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sector Directory & Detailed Sector Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sector Directory List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#101828] dark:text-white flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#0F9F94]" />
              <span>{language === 'en' ? 'Industrial Sector Directory' : 'औद्योगिक क्षेत्र चयन'}</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              {filteredSectors.length} of 12 Sectors
            </span>
          </div>

          {/* Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search sector, cluster, company, or trade...' : 'उद्योग, क्लस्टर, कंपनी या ट्रेड खोजें...'}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F9F94] shadow-2xs"
            />
          </div>

          {/* Scrollable Sector List */}
          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredSectors.map((sector) => {
              const Icon = sector.icon;
              const isSelected = sector.id === selectedSectorId;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSectorId(sector.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-teal-50/90 dark:bg-teal-950/60 border-[#0F9F94] shadow-xs ring-1 ring-[#0F9F94]/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800/60 shadow-2xs'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-[#0F9F94] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className={`text-xs font-bold truncate ${
                        isSelected ? 'text-teal-950 dark:text-teal-200 font-black' : 'text-slate-900 dark:text-white'
                      }`}>
                        {language === 'en' ? sector.name : sector.nameHi}
                      </h4>
                      <span className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded uppercase shrink-0 ${
                        sector.shortageLevel === 'Critical'
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          : sector.shortageLevel === 'High'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {sector.shortageLevel}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-medium">
                      {sector.clusterLocations[0]}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[10.5px] text-slate-600 dark:text-slate-300 font-semibold">
                      <span><strong className="text-slate-900 dark:text-white">{sector.openVacancies.toLocaleString()}</strong> Openings</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span><strong className="text-teal-700 dark:text-teal-400">{sector.apprenticeshipSeats.toLocaleString()}</strong> NAPS Seats</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Sector Profile (7 cols) */}
        <div id="sector-detail-section" className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
            {/* Sector Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-2xl text-teal-700 dark:text-teal-400 shrink-0">
                  <selectedSector.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                      {selectedSector.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {selectedSector.totalUnits} Units
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                    {language === 'en' ? selectedSector.name : selectedSector.nameHi}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {language === 'en' ? selectedSector.description : selectedSector.descriptionHi}
                  </p>
                </div>
              </div>

              {/* Action Button: Connect with Student Portal */}
              {onNavigate && (
                <button
                  onClick={() => onNavigate('student_portal')}
                  className="shrink-0 px-3 py-2 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student View</span>
                </button>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Open Vacancies</span>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {selectedSector.openVacancies.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">NAPS Seats</span>
                <div className="text-lg font-black text-teal-700 dark:text-teal-400 mt-0.5">
                  {selectedSector.apprenticeshipSeats.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Starting Wage</span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedSector.avgStartingWage}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Skilled Tech Wage</span>
                <div className="text-sm font-bold text-indigo-700 dark:text-indigo-400 mt-0.5">
                  {selectedSector.skilledTechnicianWage}
                </div>
              </div>
            </div>

            {/* Key Corridors & Clusters */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Major Industrial Corridors & Clusters</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedSector.clusterLocations.map((loc, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    📍 {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Leading Anchors & Employers */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Major Hiring Employers & Anchor Plants</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedSector.majorCompanies.map((comp, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800"
                  >
                    🏢 {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* In-Demand Technical Trades & Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>High-Demand Trades (NCO Codes)</span>
                </h5>
                <ul className="space-y-1.5">
                  {selectedSector.keyTrades.map((trade, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5 font-medium">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{trade}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/40">
                <h5 className="text-xs font-bold text-teal-900 dark:text-teal-200 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Critical Skills in Short Supply</span>
                </h5>
                <ul className="space-y-1.5">
                  {selectedSector.topDemandedSkills.map((sk, idx) => (
                    <li key={idx} className="text-xs text-teal-900 dark:text-teal-200 flex items-start gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Bridge to Student Portal */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 via-indigo-50 to-sky-50 dark:from-teal-950/60 dark:via-indigo-950/40 dark:to-slate-900 border border-teal-200 dark:border-teal-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>🎓 Are you a student interested in {selectedSector.name}?</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                  Assess your skill readiness %, access free DGT/SWAYAM courses, and claim ₹8.5k–₹10k/mo stipend.
                </p>
              </div>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('student_portal')}
                  className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Open Student Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Plant Hiring Requisition Simulator (For HR & District Officers) */}
          <div id="candidate-pool-simulator" className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Industry Candidate Pool & NAPS Requisition Simulator</span>
              </h4>
              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                Live ITI Matching
              </span>
            </div>

            <form onSubmit={handleSimulate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Required Trade</label>
                <select
                  value={simTrade}
                  onChange={(e) => setSimTrade(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  {selectedSector.keyTrades.map((tr, idx) => (
                    <option key={idx} value={tr}>{tr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Cluster / District</label>
                <select
                  value={simDistrict}
                  onChange={(e) => setSimDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="Dhar (Pithampur)">Dhar (Pithampur Auto SEZ)</option>
                  <option value="Indore (Sanwer Road)">Indore (Sanwer Road / Super Corridor)</option>
                  <option value="Bhopal (Govindpura)">Bhopal (Govindpura & Mandideep)</option>
                  <option value="Dewas Industrial Zone">Dewas Industrial Area</option>
                  <option value="Jabalpur Ordnance Corridor">Jabalpur Defence Corridor</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Seats Required ({simQuantity})</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={simQuantity}
                    onChange={(e) => setSimQuantity(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  >
                    Match
                  </button>
                </div>
              </div>
            </form>

            {simShowNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Found <strong>{Math.round(simQuantity * 1.8)} certified ITI/Polytechnic candidates</strong> available in {simDistrict} with readiness &gt;75%!
                  </span>
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('student_portal')}
                  className="text-xs font-bold text-teal-800 underline ml-2"
                >
                  View candidates
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
