export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';

export type ForecastHorizon = 6 | 12;

export interface FilterState {
  state: string;
  district: string;
  sector: string;
  occupation: string;
  skill: string;
  horizon: ForecastHorizon;
  timeRange: '1Y' | '2Y' | '3Y';
}

export interface MetricCard {
  id: string;
  title: string;
  titleHi: string;
  value: number | string;
  unit?: string;
  changePercent?: number;
  trend?: 'up' | 'down' | 'neutral';
  description: string;
  descriptionHi: string;
  badge?: string;
}

export interface MonthlyDataPoint {
  month: string; // YYYY-MM
  observedDemand: number;
  qualifiedSupply: number;
  grossPostings?: number;
  registeredWorkersProxy?: number;
  forecastDemand?: number;
  forecastLower80?: number;
  forecastUpper80?: number;
  forecastLower95?: number;
  forecastUpper95?: number;
  isForecast?: boolean;
}

export interface OccupationItem {
  id: string;
  title: string;
  titleHi: string;
  sectorId: string;
  sectorName: string;
  ncoCode: string; // e.g. "3113.0101"
  nsqfLevel: number;
  currentDemand: number;
  estimatedSupply: number;
  forecastDemand6m: number;
  forecastDemand12m: number;
  trainingCapacity: number;
  topSkills: string[];
  district: string;
  state: string;
  monthlyHistory: MonthlyDataPoint[];
  growthRateYoY: number;
  severity: 'critical_shortage' | 'moderate_shortage' | 'balanced' | 'oversupply';
  confidenceScore: number; // 0 to 100
  historicalMAE?: number;
  historicalWAPE?: number;
  notes?: string;
}

export interface EmergingSkill {
  id: string;
  name: string;
  nameHi: string;
  category: string;
  sector: string;
  demandGrowthRate: number; // %
  currentPostings: number;
  projectedDemand12m: number;
  velocityScore: number; // 1-100
  shortageSeverity: 'Critical' | 'High' | 'Moderate' | 'Emerging';
  primaryOccupations: string[];
  nsqfAlignment: string;
  sampleSize: number;
  confidence: number;
  keyDrivers: string[];
}

export interface TrainingRecommendation {
  id: string;
  occupationTitle: string;
  district: string;
  sector: string;
  courseName: string;
  qpNosCode: string; // Qualification Pack - National Occupational Standard
  nsqfLevel: number;
  existingCapacity: number;
  recommendedAdditionalSeats: number;
  durationMonths: number;
  suggestedProvider: string;
  associatedScheme: string;
  schemeId: string;
  rationale: string;
  urgency: 'Immediate' | 'Medium-term' | 'Long-term';
  estimatedCostPerTrainee: number; // in INR
}

export interface GovernmentScheme {
  id: string;
  name: string;
  nameHi: string;
  acronym: string;
  ministry: string;
  targetBeneficiaries: string;
  eligibleActivities: string[];
  eligibleSectors: string[];
  eligibilityCriteria: string;
  fundingModel: string;
  officialUrl: string;
  verifiedDate: string;
  status: 'Active' | 'Updated' | 'Pilot';
}

export interface DistrictMetric {
  district: string;
  state: string;
  observedDemand: number;
  qualifiedSupply: number;
  netGap: number;
  gapSeverity: 'Critical Shortage' | 'Moderate Shortage' | 'Balanced' | 'Oversupply';
  topShortageOccupation: string;
  trainingInstitutionsCount: number;
  activeItiCount: number;
  pmkkCount: number;
  coordinates: [number, number]; // [lat, lng]
}

export interface PolicyScenarioInputs {
  targetOccupationId: string;
  additionalSeats: number;
  budgetLakhs: number;
  completionRate: number; // %
  qualificationRate: number; // %
  placementRate: number; // %
  trainingDurationMonths: number;
  horizonMonths: 6 | 12 | 24;
}

export interface PolicyScenarioResult {
  scenarioName: string;
  additionalTraineesEnrolled: number;
  certifiedWorkersProduced: number;
  estimatedPlacedWorkers: number;
  remainingNetGap: number;
  costPerPlacedWorker: number;
  gapReductionPercent: number;
  uncertaintyRange: [number, number];
}

export interface AlertNotification {
  id: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  titleHi: string;
  message: string;
  messageHi: string;
  district: string;
  sector: string;
  read: boolean;
  actionLabel?: string;
  actionModule?: string;
}

export interface DataSourceItem {
  id: string;
  name: string;
  publisher: string;
  coverage: string;
  reportingPeriod: string;
  frequency: string;
  verifiedStatus: 'Verified Official' | 'Public Open Data' | 'Demonstration Proxy';
  url: string;
  notes: string;
}

export interface UserProfile {
  id: string;
  name: string;
  nameHi: string;
  email: string;
  role: 'central_planner' | 'state_mission_director' | 'district_officer' | 'training_provider' | 'public_researcher' | 'student_learner' | 'industrial_employer';
  roleLabel: string;
  roleLabelHi: string;
  organization: string;
  organizationHi: string;
  department: string;
  departmentHi: string;
  jurisdiction: string;
  jurisdictionHi: string;
  state: string;
  district?: string;
  avatarInitials: string;
  badgeColor: string;
}
