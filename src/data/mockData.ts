import {
  OccupationItem,
  EmergingSkill,
  TrainingRecommendation,
  GovernmentScheme,
  DistrictMetric,
  AlertNotification,
  DataSourceItem,
  MonthlyDataPoint
} from '../types';

// Helper to generate realistic monthly trend data
function createMonthlySeries(baseDemand: number, baseSupply: number, trend: number, noiseFactor: number = 0.08): MonthlyDataPoint[] {
  const points: MonthlyDataPoint[] = [];
  const startYear = 2024;
  const startMonth = 10; // Oct 2024

  for (let i = 0; i < 24; i++) {
    const totalMonths = startMonth - 1 + i;
    const y = startYear + Math.floor(totalMonths / 12);
    const m = (totalMonths % 12) + 1;
    const monthKey = `${y}-${String(m).padStart(2, '0')}`;

    // Cyclical seasonal swing (Q4 festival spike, Q1 fiscal cycle)
    const seasonal = Math.sin((m / 12) * 2 * Math.PI) * 0.12;
    // Deterministic pseudo-random variation based on index
    const pseudoNoise = Math.sin(i * 1.7) * noiseFactor;
    
    const dVal = Math.round(baseDemand * (1 + trend * i + seasonal + pseudoNoise));
    const sVal = Math.round(baseSupply * (1 + (trend * 0.4) * i + pseudoNoise * 0.5));
    
    // Scraped postings is typically 1.35x of deduplicated unique demand
    const grossPostings = Math.round(dVal * 1.38);
    // e-Shram registered workers is a crude proxy, often 3x-5x larger than certified qualified workforce
    const registeredProxy = Math.round(sVal * 3.8);

    points.push({
      month: monthKey,
      observedDemand: Math.max(10, dVal),
      qualifiedSupply: Math.max(8, sVal),
      grossPostings,
      registeredWorkersProxy: registeredProxy
    });
  }
  return points;
}

export const PILOT_DISTRICTS: DistrictMetric[] = [
  {
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    observedDemand: 4850,
    qualifiedSupply: 3620,
    netGap: 1230,
    gapSeverity: 'Critical Shortage',
    topShortageOccupation: 'Solar Rooftop Installation Technician',
    trainingInstitutionsCount: 38,
    activeItiCount: 16,
    pmkkCount: 4,
    coordinates: [23.2599, 77.4126]
  },
  {
    district: 'Indore',
    state: 'Madhya Pradesh',
    observedDemand: 7920,
    qualifiedSupply: 6150,
    netGap: 1770,
    gapSeverity: 'Critical Shortage',
    topShortageOccupation: 'Electric Vehicle (EV) Assembly & Service Technician',
    trainingInstitutionsCount: 52,
    activeItiCount: 22,
    pmkkCount: 6,
    coordinates: [22.7196, 75.8577]
  },
  {
    district: 'Dhar - Pithampur',
    state: 'Madhya Pradesh',
    observedDemand: 3940,
    qualifiedSupply: 2890,
    netGap: 1050,
    gapSeverity: 'Critical Shortage',
    topShortageOccupation: 'Industrial Automation & PLC Technician',
    trainingInstitutionsCount: 24,
    activeItiCount: 9,
    pmkkCount: 2,
    coordinates: [22.6100, 75.3100]
  },
  {
    district: 'Gwalior',
    state: 'Madhya Pradesh',
    observedDemand: 2650,
    qualifiedSupply: 2810,
    netGap: -160,
    gapSeverity: 'Oversupply',
    topShortageOccupation: 'Drone Maintenance & Repair Technician',
    trainingInstitutionsCount: 31,
    activeItiCount: 14,
    pmkkCount: 3,
    coordinates: [26.2183, 78.1828]
  },
  {
    district: 'Jabalpur',
    state: 'Madhya Pradesh',
    observedDemand: 3120,
    qualifiedSupply: 3050,
    netGap: 70,
    gapSeverity: 'Balanced',
    topShortageOccupation: 'General Duty Healthcare Assistant',
    trainingInstitutionsCount: 34,
    activeItiCount: 15,
    pmkkCount: 4,
    coordinates: [23.1815, 79.9864]
  },
  {
    district: 'Rewa',
    state: 'Madhya Pradesh',
    observedDemand: 2180,
    qualifiedSupply: 1340,
    netGap: 840,
    gapSeverity: 'Critical Shortage',
    topShortageOccupation: 'Grid-Tied Solar Plant Maintenance Specialist',
    trainingInstitutionsCount: 18,
    activeItiCount: 8,
    pmkkCount: 2,
    coordinates: [24.5362, 81.3037]
  },
  {
    district: 'Ujjain',
    state: 'Madhya Pradesh',
    observedDemand: 1890,
    qualifiedSupply: 1720,
    netGap: 170,
    gapSeverity: 'Moderate Shortage',
    topShortageOccupation: 'Solar Water Pump Service Technician',
    trainingInstitutionsCount: 22,
    activeItiCount: 10,
    pmkkCount: 3,
    coordinates: [23.1765, 75.7885]
  },
  {
    district: 'Sagar',
    state: 'Madhya Pradesh',
    observedDemand: 1410,
    qualifiedSupply: 1560,
    netGap: -150,
    gapSeverity: 'Oversupply',
    topShortageOccupation: 'Smart Agri-Sensor Field Operator',
    trainingInstitutionsCount: 19,
    activeItiCount: 9,
    pmkkCount: 2,
    coordinates: [23.8388, 78.7378]
  }
];

export const MOCK_OCCUPATIONS: OccupationItem[] = [
  // 1. Critical Shortage in Solar / Renewable
  {
    id: 'occ-solar-tech',
    title: 'Solar PV Rooftop Technician',
    titleHi: 'सोलर पीवी रूफटॉप तकनीशियन',
    sectorId: 'renewable_energy',
    sectorName: 'Renewable Energy & Green Jobs',
    ncoCode: '3113.0101',
    nsqfLevel: 4,
    currentDemand: 1850,
    estimatedSupply: 1120,
    forecastDemand6m: 2320,
    forecastDemand12m: 2840,
    trainingCapacity: 950,
    topSkills: ['PV Panel Mounting', 'Inverter Wiring', 'Net Metering Testing', 'Earthing & Lightning Protection', 'SCADA Monitoring'],
    district: 'Rewa',
    state: 'Madhya Pradesh',
    monthlyHistory: createMonthlySeries(1100, 850, 0.024, 0.06),
    growthRateYoY: 38.4,
    severity: 'critical_shortage',
    confidenceScore: 92,
    historicalMAE: 44.2,
    historicalWAPE: 6.8,
    notes: 'Surge driven by PM-Surya Ghar Muft Bijli Yojana & Rewa Ultra Mega Solar cluster expansion.'
  },
  // 2. Critical Shortage in EV Technology
  {
    id: 'occ-ev-service',
    title: 'Electric Vehicle (EV) Service Technician',
    titleHi: 'इलेक्ट्रिक वाहन (EV) सर्विस तकनीशियन',
    sectorId: 'automotive_ev',
    sectorName: 'Automotive & EV Technology',
    ncoCode: '7231.0201',
    nsqfLevel: 4,
    currentDemand: 2280,
    estimatedSupply: 1410,
    forecastDemand6m: 2860,
    forecastDemand12m: 3490,
    trainingCapacity: 1200,
    topSkills: ['High Voltage Battery Diagnostics', 'BMS Calibration', 'Motor Controller Repair', 'Regenerative Braking Systems', 'EV Safety Protocols'],
    district: 'Indore',
    state: 'Madhya Pradesh',
    monthlyHistory: createMonthlySeries(1350, 1050, 0.028, 0.07),
    growthRateYoY: 42.1,
    severity: 'critical_shortage',
    confidenceScore: 89,
    historicalMAE: 52.1,
    historicalWAPE: 7.4,
    notes: 'Pithampur auto corridor transitioning assembly lines to 2W/3W EV variants; high localized shortage.'
  },
  // 3. Shortage in Industrial Automation
  {
    id: 'occ-automation-plc',
    title: 'Industrial Automation & PLC Technician',
    titleHi: 'औद्योगिक स्वचालन एवं पीएलसी तकनीशियन',
    sectorId: 'manufacturing',
    sectorName: 'Manufacturing & Industry 4.0',
    ncoCode: '3123.0102',
    nsqfLevel: 5,
    currentDemand: 1640,
    estimatedSupply: 1080,
    forecastDemand6m: 1980,
    forecastDemand12m: 2360,
    trainingCapacity: 920,
    topSkills: ['PLC Ladder Programming', 'Pneumatics & Hydraulics', 'SCADA Integration', 'Industrial IoT Sensor Nodes', 'Robotic Arm Arming'],
    district: 'Dhar - Pithampur',
    state: 'Madhya Pradesh',
    monthlyHistory: createMonthlySeries(1050, 890, 0.019, 0.05),
    growthRateYoY: 26.5,
    severity: 'critical_shortage',
    confidenceScore: 88,
    historicalMAE: 38.6,
    historicalWAPE: 5.9,
    notes: 'Automated discrete manufacturing lines in Dhar cluster requiring immediate mechatronics upskilling.'
  },
  // 4. Critical Shortage in Cybersecurity & Cloud
  {
    id: 'occ-cybersecurity',
    title: 'Cybersecurity SOC Analyst',
    titleHi: 'साइबर सुरक्षा एसओसी विश्लेषक',
    sectorId: 'it_software',
    sectorName: 'IT & Digital Services',
    ncoCode: '2529.0101',
    nsqfLevel: 6,
    currentDemand: 2150,
    estimatedSupply: 1490,
    forecastDemand6m: 2620,
    forecastDemand12m: 3140,
    trainingCapacity: 1100,
    topSkills: ['SIEM Tool Monitoring', 'Incident Response Playbooks', 'Threat Hunting', 'Vulnerability Assessment', 'Network Forensics'],
    district: 'Indore',
    state: 'Madhya Pradesh',
    monthlyHistory: createMonthlySeries(1400, 1150, 0.021, 0.06),
    growthRateYoY: 31.8,
    severity: 'critical_shortage',
    confidenceScore: 91,
    historicalMAE: 46.0,
    historicalWAPE: 6.2,
    notes: 'Indore Super Corridor IT hubs hosting growing BFSI and enterprise remote SOC teams.'
  },
  // 5. Shortage in Drone Operations
  {
    id: 'occ-drone-pilot',
    title: 'Commercial Drone Pilot & Maintenance Tech',
    titleHi: 'ड्रोन पायलट एवं रख-रखाव तकनीशियन',
    sectorId: 'aerospace_agri',
    sectorName: 'Agro-Tech & Logistics',
    ncoCode: '3153.0301',
    nsqfLevel: 4,
    currentDemand: 980,
    estimatedSupply: 420,
    forecastDemand6m: 1390,
    forecastDemand12m: 1850,
    trainingCapacity: 350,
    topSkills: ['DGCA DG Rule Compliance', 'Payload Swapping', 'Gimbal Calibration', 'Multispectral Agricultural Imaging', 'Lithium Polymer Battery Care'],
    district: 'Gwalior',
    state: 'Madhya Pradesh',
    monthlyHistory: createMonthlySeries(450, 290, 0.035, 0.09),
    growthRateYoY: 54.2,
    severity: 'critical_shortage',
    confidenceScore: 84,
    historicalMAE: 32.4,
    historicalWAPE: 9.1,
    notes: 'SVAMITVA village mapping scheme & drone spray fertilizer subsidy accelerating local demand.'
  },
  // 6. Balanced in Healthcare
  {
    id: 'occ-health-nurse',
    title: 'General Duty Assistant & Emergency Paramedic',
    titleHi: 'जनरल ड्यूटी असिस्टेंट एवं इमरजेंसी पैरामेडिक',
    sectorId: 'healthcare',
    sectorName: 'Healthcare & Allied Services',
    ncoCode: '5321.0101',
    nsqfLevel: 4,
    currentDemand: 1720,
    estimatedSupply: 1680,
    forecastDemand6m: 1840,
    forecastDemand12m: 1960,
    trainingCapacity: 1650,
    topSkills: ['Patient Triage', 'BLS (Basic Life Support)', 'Vital Signs Telemetry', 'Sterilization Protocol', 'EHR Entry'],
    district: 'Jabalpur',
    state: 'Madhya Pradesh',
    monthlyHistory: createMonthlySeries(1550, 1520, 0.006, 0.04),
    growthRateYoY: 8.4,
    severity: 'balanced',
    confidenceScore: 94,
    historicalMAE: 28.5,
    historicalWAPE: 4.1,
    notes: 'Jabalpur medical college and private district hospitals show stable, balanced demand-supply.'
  },
  // 7. Oversupply: Traditional Desktop Publishing / Basic Computer Operator
  {
    id: 'occ-dtp-operator',
    title: 'Desktop Publishing & Basic Data Entry Clerk',
    titleHi: 'डेस्कटॉप पब्लिशिंग एवं बेसिक डेटा एंट्री ऑपरेटर',
    sectorId: 'office_admin',
    sectorName: 'Traditional Administrative Services',
    ncoCode: '4132.0101',
    nsqfLevel: 3,
    currentDemand: 680,
    estimatedSupply: 1480,
    forecastDemand6m: 620,
    forecastDemand12m: 570,
    trainingCapacity: 1600,
    topSkills: ['Basic Typing Hindi/English', 'MS Office 2013', 'Laser Printer Setup', 'Document Scanning'],
    district: 'Sagar',
    state: 'Madhya Pradesh',
    monthlyHistory: createMonthlySeries(820, 1380, -0.012, 0.05),
    growthRateYoY: -14.2,
    severity: 'oversupply',
    confidenceScore: 93,
    historicalMAE: 35.8,
    historicalWAPE: 7.2,
    notes: 'High historical seat allocation in private ITIs; demand saturated due to cloud workflows & OCR automation.'
  },
  // 8. Oversupply: Conventional Manual Lathe Machinist
  {
    id: 'occ-manual-machinist',
    title: 'Conventional Manual Lathe / Shaper Machinist',
    titleHi: 'पारंपरिक लेथ / शेपर मशीनिस्ट',
    sectorId: 'manufacturing',
    sectorName: 'Manufacturing & Industry 4.0',
    ncoCode: '7223.0101',
    nsqfLevel: 3,
    currentDemand: 520,
    estimatedSupply: 1120,
    forecastDemand6m: 490,
    forecastDemand12m: 460,
    trainingCapacity: 1250,
    topSkills: ['Manual Turning', 'Vernier Caliper Reading', 'Tool Grinding', 'Threading'],
    district: 'Gwalior',
    state: 'Madhya Pradesh',
    monthlyHistory: createMonthlySeries(650, 1150, -0.015, 0.05),
    growthRateYoY: -18.6,
    severity: 'oversupply',
    confidenceScore: 90,
    historicalMAE: 29.4,
    historicalWAPE: 6.9,
    notes: 'Industry moving to 4-axis CNC and VMC machining centers. Manual lathe trades facing structural oversupply.'
  },
  // 9. Case with Insufficient Data (Sparse Pilot series to test acceptance criteria!)
  {
    id: 'occ-cryogenic-welder',
    title: 'Cryogenic Tank Welder & Piping Specialist',
    titleHi: 'क्रायोजेनिक टैंक वेल्डर एवं पाइपिंग विशेषज्ञ',
    sectorId: 'manufacturing',
    sectorName: 'Manufacturing & Industry 4.0',
    ncoCode: '7212.0302',
    nsqfLevel: 5,
    currentDemand: 45,
    estimatedSupply: 18,
    forecastDemand6m: 50,
    forecastDemand12m: 62,
    trainingCapacity: 20,
    topSkills: ['TIG Inconel Welding', 'Helium Leak Detection', 'Cryogenic ASME Sec IX', 'Radiographic Testing'],
    district: 'Sagar',
    state: 'Madhya Pradesh',
    monthlyHistory: [
      { month: '2026-06', observedDemand: 38, qualifiedSupply: 15 },
      { month: '2026-07', observedDemand: 41, qualifiedSupply: 16 },
      { month: '2026-08', observedDemand: 43, qualifiedSupply: 18 },
      { month: '2026-09', observedDemand: 45, qualifiedSupply: 18 }
    ], // Sparse: only 4 points, triggers insufficient data rule!
    growthRateYoY: 12.0,
    severity: 'moderate_shortage',
    confidenceScore: 35,
    notes: 'Highly niche specialized skill; sample size below statistical threshold for time-series modeling.'
  }
];

export const EMERGING_SKILLS: EmergingSkill[] = [
  {
    id: 'es-1',
    name: 'Battery Management System (BMS) Calibration',
    nameHi: 'बैटरी प्रबंधन प्रणाली (BMS) कैलिब्रेशन',
    category: 'Clean Energy & E-Mobility',
    sector: 'Automotive & EV Technology',
    demandGrowthRate: 84.5,
    currentPostings: 940,
    projectedDemand12m: 1820,
    velocityScore: 96,
    shortageSeverity: 'Critical',
    primaryOccupations: ['EV Service Technician', 'Battery Pack Assembly Operator'],
    nsqfAlignment: 'ASC/Q1411 (NSQF Level 5)',
    sampleSize: 1840,
    confidence: 91,
    keyDrivers: ['Pithampur battery pack manufacturing expansion', 'FAME-II & state EV subsidies']
  },
  {
    id: 'es-2',
    name: 'Drone Multispectral Aerial Surveying',
    nameHi: 'ड्रोन मल्टीस्पेक्ट्रल एरियल सर्वेयर',
    category: 'Agritech & Geomatics',
    sector: 'Agro-Tech & Logistics',
    demandGrowthRate: 76.2,
    currentPostings: 680,
    projectedDemand12m: 1240,
    velocityScore: 92,
    shortageSeverity: 'Critical',
    primaryOccupations: ['Commercial Drone Pilot', 'GIS Mapping Technician'],
    nsqfAlignment: 'AGR/Q7004 (NSQF Level 4)',
    sampleSize: 1220,
    confidence: 88,
    keyDrivers: ['SVAMITVA land parcel digitization', 'Precision pesticide spraying mandates']
  },
  {
    id: 'es-3',
    name: 'Solar SCADA & Inverter Telemetry',
    nameHi: 'सोलर स्काडा एवं इन्वर्टर टेलीमेट्री',
    category: 'Renewable Power Systems',
    sector: 'Renewable Energy & Green Jobs',
    demandGrowthRate: 68.0,
    currentPostings: 1120,
    projectedDemand12m: 1940,
    velocityScore: 90,
    shortageSeverity: 'High',
    primaryOccupations: ['Solar PV Rooftop Technician', 'Grid Maintenance Specialist'],
    nsqfAlignment: 'SGJ/Q0105 (NSQF Level 4)',
    sampleSize: 2150,
    confidence: 93,
    keyDrivers: ['Rewa Ultra Mega Solar Park phase-2', 'C&I rooftop solar adoption']
  },
  {
    id: 'es-4',
    name: 'AI Model Edge Deployment & TinyML',
    nameHi: 'एआई मॉडल एज डिप्लॉयमेंट एवं टाइनी-एमएल',
    category: 'Deep Tech & Software',
    sector: 'IT & Digital Services',
    demandGrowthRate: 64.8,
    currentPostings: 810,
    projectedDemand12m: 1390,
    velocityScore: 89,
    shortageSeverity: 'High',
    primaryOccupations: ['IoT Firmware Engineer', 'AI Application Developer'],
    nsqfAlignment: 'SSC/Q8103 (NSQF Level 6)',
    sampleSize: 1450,
    confidence: 87,
    keyDrivers: ['Indore smart city cameras', 'Industrial IoT edge gateways']
  },
  {
    id: 'es-5',
    name: 'Cobot (Collaborative Robot) Programming',
    nameHi: 'सहयोगी रोबोट (कोबॉट) प्रोग्रामिंग',
    category: 'Smart Manufacturing',
    sector: 'Manufacturing & Industry 4.0',
    demandGrowthRate: 59.4,
    currentPostings: 540,
    projectedDemand12m: 890,
    velocityScore: 85,
    shortageSeverity: 'High',
    primaryOccupations: ['Industrial Automation Technician', 'Mechatronics Specialist'],
    nsqfAlignment: 'ELE/Q6202 (NSQF Level 5)',
    sampleSize: 980,
    confidence: 85,
    keyDrivers: ['Automotive tier-1 suppliers adopting flexible assembly lines']
  },
  {
    id: 'es-6',
    name: 'Green Hydrogen Electrolyzer Maintenance',
    nameHi: 'ग्रीन हाइड्रोजन इलेक्ट्रोलिसिस रख-रखाव',
    category: 'Zero-Carbon Technologies',
    sector: 'Renewable Energy & Green Jobs',
    demandGrowthRate: 52.0,
    currentPostings: 240,
    projectedDemand12m: 460,
    velocityScore: 81,
    shortageSeverity: 'Emerging',
    primaryOccupations: ['Chemical Plant Operator', 'Renewable Plant Technician'],
    nsqfAlignment: 'SGJ/Q0901 (NSQF Level 5 - Draft)',
    sampleSize: 420,
    confidence: 79,
    keyDrivers: ['National Green Hydrogen Mission pilot projects in MP industrial corridor']
  }
];

export const TRAINING_RECOMMENDATIONS: TrainingRecommendation[] = [
  {
    id: 'tr-1',
    occupationTitle: 'Solar PV Rooftop Technician',
    district: 'Rewa',
    sector: 'Renewable Energy & Green Jobs',
    courseName: 'Suryamitra Skill Development Program (Solar PV Installer)',
    qpNosCode: 'SGJ/Q0101 (NSQF Level 4)',
    nsqfLevel: 4,
    existingCapacity: 250,
    recommendedAdditionalSeats: 600,
    durationMonths: 3,
    suggestedProvider: 'Govt ITI Rewa & National Institute of Solar Energy (NISE) Partner Hub',
    associatedScheme: 'PM Surya Ghar: Muft Bijli Yojana / PMKVY 4.0',
    schemeId: 'scheme-suryamitra',
    rationale: 'Projected demand will outpace local certified pool by 1,720 workers in 12 months. Rewa Solar Park requires ongoing O&M technicians.',
    urgency: 'Immediate',
    estimatedCostPerTrainee: 14500
  },
  {
    id: 'tr-2',
    occupationTitle: 'Electric Vehicle (EV) Service Technician',
    district: 'Indore',
    sector: 'Automotive & EV Technology',
    courseName: 'EV Assembly & Diagnostics Technician (QP-NOS Certified)',
    qpNosCode: 'ASC/Q1411 (NSQF Level 4)',
    nsqfLevel: 4,
    existingCapacity: 400,
    recommendedAdditionalSeats: 850,
    durationMonths: 4,
    suggestedProvider: 'Indore NSTI (National Skill Training Institute) & ASDC Partner Centers',
    associatedScheme: 'PMKVY 4.0 (Special Projects) / NAPS Apprenticeship',
    schemeId: 'scheme-pmkvy',
    rationale: 'Pithampur auto corridor has 14 OEM tier-1 units ramping 2W EV production lines with acute dearth of certified high-voltage technicians.',
    urgency: 'Immediate',
    estimatedCostPerTrainee: 18200
  },
  {
    id: 'tr-3',
    occupationTitle: 'Commercial Drone Pilot & Maintenance Tech',
    district: 'Gwalior',
    sector: 'Agro-Tech & Logistics',
    courseName: 'DGCA Remote Pilot Certification + Agri Drone Technician',
    qpNosCode: 'AGR/Q7004 (NSQF Level 4)',
    nsqfLevel: 4,
    existingCapacity: 90,
    recommendedAdditionalSeats: 300,
    durationMonths: 2,
    suggestedProvider: 'Madhav Institute of Technology & Science (MITS) Drone School, Gwalior',
    associatedScheme: 'Sub-Mission on Agricultural Mechanization (SMAM) & SANKALP',
    schemeId: 'scheme-sankalp',
    rationale: 'District agricultural department deploying 180 drone clusters; current certified pilot availability is below 35% of sanctioned tenders.',
    urgency: 'Immediate',
    estimatedCostPerTrainee: 24000
  },
  {
    id: 'tr-4',
    occupationTitle: 'Industrial Automation & PLC Technician',
    district: 'Dhar - Pithampur',
    sector: 'Manufacturing & Industry 4.0',
    courseName: 'Mechatronics & Automated Systems Operator (ITI Modernization)',
    qpNosCode: 'ELE/Q6202 (NSQF Level 5)',
    nsqfLevel: 5,
    existingCapacity: 300,
    recommendedAdditionalSeats: 450,
    durationMonths: 6,
    suggestedProvider: 'Govt ITI Pithampur in PPP mode with Automotive Manufacturers Association',
    associatedScheme: 'STRIVE (Skills Strengthening for Industrial Value Enhancement)',
    schemeId: 'scheme-strive',
    rationale: 'Shift from mechanical machining to CNC/PLC line supervisors creates high vacancy friction in Pithampur Special Economic Zone.',
    urgency: 'Medium-term',
    estimatedCostPerTrainee: 21500
  },
  {
    id: 'tr-5',
    occupationTitle: 'Desktop Publishing & Basic Data Entry Clerk',
    district: 'Sagar',
    sector: 'Traditional Administrative Services',
    courseName: 'CURRICULUM SUNSET / RESKILLING: Transition to Digital Financial Services & CRM',
    qpNosCode: 'BSC/Q0102 (NSQF Level 4)',
    nsqfLevel: 4,
    existingCapacity: 600,
    recommendedAdditionalSeats: -350, // Capacity reduction recommendation!
    durationMonths: 3,
    suggestedProvider: 'District ITI Sagar',
    associatedScheme: 'State Skill Development Mission (SSDM) Rationalization',
    schemeId: 'scheme-pmkvy',
    rationale: 'Observed 18.6% drop in clerical job postings due to software automation. Recommend reallocating 350 seats into Logistics & Cold Chain.',
    urgency: 'Medium-term',
    estimatedCostPerTrainee: 9800
  }
];

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'scheme-pmkvy',
    name: 'Pradhan Mantri Kaushal Vikas Yojana 4.0',
    nameHi: 'प्रधानमंत्री कौशल विकास योजना 4.0',
    acronym: 'PMKVY 4.0',
    ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
    targetBeneficiaries: 'Youth seeking short-term wage employment, recognition of prior learning (RPL), and future skills.',
    eligibleActivities: ['Short Term Training (STT)', 'Recognition of Prior Learning (RPL)', 'Special Projects in Industry 4.0 & AI'],
    eligibleSectors: ['Green Energy', 'Electronics & Semi', 'Automotive', 'Healthcare', 'IT/ITeS'],
    eligibilityCriteria: 'Indian nationals aged 15-45 with Aadhaar-linked bank account and minimum 8th/10th pass depending on NSQF level.',
    fundingModel: '100% centrally sponsored with direct trainee incentive and training provider milestone payout.',
    officialUrl: 'https://www.pmkvyofficial.org',
    verifiedDate: '2024-04-15',
    status: 'Active'
  },
  {
    id: 'scheme-vishwakarma',
    name: 'PM Vishwakarma Scheme',
    nameHi: 'पीएम विश्वकर्मा योजना',
    acronym: 'PM-Vishwakarma',
    ministry: 'Ministry of MSME and MSDE (Joint Implementation)',
    targetBeneficiaries: 'Traditional artisans and craftspeople working with hands and tools across 18 family-based trades.',
    eligibleActivities: ['Basic Skill Training (5-7 days)', 'Advanced Skill Training (15 days)', 'Toolkit Incentive (₹15,000)', 'Collateral-free Enterprise Loans'],
    eligibleSectors: ['Carpentry', 'Blacksmithing', 'Masonry', 'Sculpting', 'Cobbling', 'Tailoring'],
    eligibilityCriteria: 'Minimum 18 years age, currently practicing one of the 18 identified trades, one beneficiary per family.',
    fundingModel: 'Central sector scheme; stipend of ₹500/day during training plus subsidized loans at 5% interest rate.',
    officialUrl: 'https://pmvishwakarma.gov.in',
    verifiedDate: '2024-05-10',
    status: 'Active'
  },
  {
    id: 'scheme-suryamitra',
    name: 'Suryamitra Skill Development Programme',
    nameHi: 'सूर्यमित्र कौशल विकास कार्यक्रम',
    acronym: 'Suryamitra',
    ministry: 'Ministry of New & Renewable Energy (MNRE) & MSDE',
    targetBeneficiaries: 'ITI (Electrician/Wireman/Fitter/Welder) certificate holders and 10th+2 diploma students.',
    eligibleActivities: ['600-Hour Residential Solar Training', 'Hands-on Rooftop & Ground Mounted PV O&M', 'Safety & Grid Interconnection Certification'],
    eligibleSectors: ['Renewable Energy', 'Solar Photovoltaic'],
    eligibilityCriteria: 'Candidates must possess ITI diploma or 3-year polytechnic engineering in relevant electrical/mechanical trades.',
    fundingModel: 'MNRE sponsored via National Institute of Solar Energy (NISE); free boarding and lodging.',
    officialUrl: 'https://solarrooftop.gov.in',
    verifiedDate: '2024-06-01',
    status: 'Active'
  },
  {
    id: 'scheme-sankalp',
    name: 'Skills Acquisition and Knowledge Awareness for Livelihood Promotion',
    nameHi: 'संकल्प (SANKALP) योजना',
    acronym: 'SANKALP',
    ministry: 'Ministry of Skill Development & Entrepreneurship (World Bank Assisted)',
    targetBeneficiaries: 'State Skill Development Missions (SSDMs), District Skill Committees (DSCs), women, marginalized groups.',
    eligibleActivities: ['Institutional Strengthening at District Level', 'Quality Assurance & Assessment Frameworks', 'Inclusion of Disadvantaged Populations'],
    eligibleSectors: ['All NSDC & State priority trades'],
    eligibilityCriteria: 'Implemented via District Skill Committees (DSCs) chaired by District Collector / Magistrate.',
    fundingModel: 'Outcome-based grant financing from World Bank and Central Government.',
    officialUrl: 'https://sankalp.msde.gov.in',
    verifiedDate: '2024-03-20',
    status: 'Active'
  },
  {
    id: 'scheme-naps',
    name: 'National Apprenticeship Promotion Scheme 2.0',
    nameHi: 'राष्ट्रीय शिक्षुता संवर्धन योजना 2.0',
    acronym: 'NAPS 2.0',
    ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
    targetBeneficiaries: 'Apprentices undergoing on-the-job industrial training in registered establishments.',
    eligibleActivities: ['Direct Benefit Transfer (DBT) of 25% of stipend (up to ₹1,500/month)', 'Basic Training Provider (BTP) reimbursement'],
    eligibleSectors: ['Manufacturing', 'Automotive', 'Logistics', 'Services', 'Retail'],
    eligibilityCriteria: 'Candidates above 14 years registered on Apprenticeship India portal undergoing designated or optional trades.',
    fundingModel: 'Direct Benefit Transfer (DBT) credited straight to apprentice account.',
    officialUrl: 'https://www.apprenticeshipindia.gov.in',
    verifiedDate: '2024-06-15',
    status: 'Active'
  },
  {
    id: 'scheme-strive',
    name: 'Skills Strengthening for Industrial Value Enhancement',
    nameHi: 'स्ट्राइव (STRIVE) परियोजना',
    acronym: 'STRIVE',
    ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
    targetBeneficiaries: 'Industrial Training Institutes (ITIs) and Industrial Clusters (IC) for dual training modernization.',
    eligibleActivities: ['Upgrading ITI Workshop Infrastructure', 'Industry-led Apprenticeship consortia', 'Trainer capacity building'],
    eligibleSectors: ['Heavy Engineering', 'Automotive', 'Plastics', 'Electronics'],
    eligibilityCriteria: 'Competitive selection of state ITIs and formally registered industry associations.',
    fundingModel: 'World Bank assisted result-oriented milestone disbursements.',
    officialUrl: 'https://dgt.gov.in/STRIVE',
    verifiedDate: '2024-02-18',
    status: 'Active'
  }
];

export const MOCK_NOTIFICATIONS: AlertNotification[] = [
  {
    id: 'alert-1',
    timestamp: '2026-10-12 14:30',
    severity: 'critical',
    title: 'Severe Skill Shortage: Solar PV Rooftop Installers',
    titleHi: 'गंभीर कौशल कमी: सोलर पीवी रूफटॉप इंस्टॉलर',
    message: 'Rewa district 12-month projected deficit crossed 1,720 workers due to new C&I grid mandates. Training capacity at 32% of required intake.',
    messageHi: 'रीवा जिले में 12 महीने का अनुमानित अंतर 1,720 कामगारों को पार कर गया। वर्तमान प्रशिक्षण क्षमता मात्र 32% है।',
    district: 'Rewa',
    sector: 'Renewable Energy & Green Jobs',
    read: false,
    actionLabel: 'View Interventions',
    actionModule: 'training_recommendations'
  },
  {
    id: 'alert-2',
    timestamp: '2026-10-11 09:15',
    severity: 'critical',
    title: 'Automotive EV Assembly Technician Deficit Surge',
    titleHi: 'ऑटोमोटिव ईवी असेंबली तकनीशियन घाटे में वृद्धि',
    message: 'Indore and Dhar industrial corridors observed 42.1% YoY increase in unique hiring signals; local certified pipeline remains constrained.',
    messageHi: 'इंदौर और धार में भर्ती संकेतों में 42.1% की भारी वृद्धि; स्थानीय प्रमाणित उम्मीदवार सीमित हैं।',
    district: 'Indore',
    sector: 'Automotive & EV Technology',
    read: false,
    actionLabel: 'Inspect Regional Map',
    actionModule: 'regional_map'
  },
  {
    id: 'alert-3',
    timestamp: '2026-10-09 17:00',
    severity: 'warning',
    title: 'Potential Oversupply: Basic Desktop Publishing in Sagar',
    titleHi: 'संभावित अधिशेष: सागर में बेसिक डेस्कटॉप पब्लिशिंग',
    message: 'Sagar ITIs graduating 1,480 basic computer operators against 680 annual observed job postings. Recommend seat reallocation.',
    messageHi: 'सागर आईटीआई में 680 मांग के विरुद्ध 1,480 ऑपरेटर निकल रहे हैं। सीट पुनरावंटन की सिफारिश।',
    district: 'Sagar',
    sector: 'Traditional Administrative Services',
    read: true,
    actionLabel: 'Review Policy Simulation',
    actionModule: 'policy_simulator'
  },
  {
    id: 'alert-4',
    timestamp: '2026-10-08 11:20',
    severity: 'info',
    title: 'Model Forecast Pipeline Recalibration Complete',
    titleHi: 'पूर्वानुमान पाइपलाइन पुन: अंशांकन पूर्ण',
    message: 'Triple Exponential Smoothing model backtested against 24-month historical series with average holdout WAPE of 6.8%.',
    messageHi: 'ट्रिपल एक्सपोनेंशियल स्मूथिंग मॉडल का 24 महीने के आंकड़ों पर परीक्षण पूर्ण, औसत WAPE 6.8% दर्ज।',
    district: 'All Districts',
    sector: 'All Priority Sectors',
    read: true,
    actionLabel: 'View Methodology',
    actionModule: 'methodology'
  }
];

export const DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'src-ncs',
    name: 'National Career Service (NCS) Portal Signals',
    publisher: 'Ministry of Labour and Employment (MoLE)',
    coverage: 'District-level registered employer postings, verified job openings, candidate resumes.',
    reportingPeriod: 'Monthly Aggregated Data (2024-2026)',
    frequency: 'Monthly Sync',
    verifiedStatus: 'Verified Official',
    url: 'https://www.ncs.gov.in',
    notes: 'Used for deduplicated demand counts and occupational hierarchy mapping (NCO-2015).'
  },
  {
    id: 'src-plfs',
    name: 'Periodic Labour Force Survey (PLFS) 2023-24',
    publisher: 'National Statistical Office (NSO), MoSPI',
    coverage: 'State and rural/urban workforce participation rates, formal vs informal employment ratios.',
    reportingPeriod: 'Annual Report (July 2023 - June 2024)',
    frequency: 'Annual',
    verifiedStatus: 'Verified Official',
    url: 'https://mospi.gov.in',
    notes: 'Provides foundational benchmark for labour force participation rates (LFPR) and worker population ratios (WPR).'
  },
  {
    id: 'src-ncvet',
    name: 'National Council for Vocational Education and Training (NCVET)',
    publisher: 'NCVET / MSDE',
    coverage: 'National Qualification Register (NQR), NSQF Levels 1-10, Qualification Packs (QP-NOS).',
    reportingPeriod: '2024-2025 Revised Register',
    frequency: 'Bi-annual',
    verifiedStatus: 'Verified Official',
    url: 'https://ncvet.gov.in',
    notes: 'Used to validate NSQF alignment and standard competencies across courses.'
  },
  {
    id: 'src-dgt',
    name: 'Directorate General of Training (DGT) ITI MIS & Seat Allocation',
    publisher: 'DGT / MSDE',
    coverage: 'Govt & Private ITI seat capacity, trade affiliations, CTS/CATS enrolment, passing counts.',
    reportingPeriod: 'Academic Years 2024-25 & 2025-26',
    frequency: 'Annual',
    verifiedStatus: 'Verified Official',
    url: 'https://ncvtmis.gov.in',
    notes: 'Baseline for institutional workforce supply estimates and seat availability.'
  },
  {
    id: 'src-eshram',
    name: 'e-Shram Public Aggregates (Proxy Reference)',
    publisher: 'Ministry of Labour and Employment (MoLE)',
    coverage: 'Unorganized sector worker voluntary registrations by broad occupational category.',
    reportingPeriod: 'Aggregated Cumulative to Sep 2026',
    frequency: 'Public Summary',
    verifiedStatus: 'Public Open Data',
    url: 'https://eshram.gov.in',
    notes: 'Used exclusively as a proxy indicator for informal workforce density; NOT counted as immediately qualified supply.'
  },
  {
    id: 'src-state-benchmark',
    name: 'MSDE State Skill Mission Benchmark Matrix (Madhya Pradesh)',
    publisher: 'Ministry of Skill Development & Entrepreneurship (MSDE) & MPSSDEGB',
    coverage: '8 Priority Districts in Madhya Pradesh across 6 Sunrise Industrial Sectors.',
    reportingPeriod: 'Historical Series (2024–2026) & Horizon Projections to 2027',
    frequency: 'Quarterly Synchronized Feed',
    verifiedStatus: 'Verified Official',
    url: 'https://skillsetu.gov.in/msde-benchmark',
    notes: 'Validated against NCVET National Qualification Register and DGT ITI Management Information System.'
  }
];
