export type SeverityLevel = "low" | "medium" | "high";

export type DiseaseScanResult = {
  id: string;
  imageUrl: string;
  disease: string;
  confidence: number;
  severity: SeverityLevel;
  symptoms: string[];
  treatments: string[];
  organicTreatment: string;
  preventionTips: string[];
  cropLossRisk: number;
  language: "en" | "hi" | "hinglish";
  createdAt: string;
  location?: string;
};

export type WeatherDay = {
  date: string;
  minTemp: number;
  maxTemp: number;
  rainChance: number;
  humidity: number;
  windSpeed: number;
};

export type WeatherSnapshot = {
  locationLabel: string;
  latitude: number;
  longitude: number;
  currentTemp: number;
  humidity: number;
  rainChance: number;
  condition: string;
  forecast: WeatherDay[];
  advisory: string[];
};

export type CropRecommendation = {
  crop: string;
  expectedProfitScore: number;
  waterNeed: "Low" | "Medium" | "High";
  riskScore: number;
  why: string;
  marketDemand: string;
};

export type OutbreakPoint = {
  id: string;
  disease: string;
  locationName: string;
  lat: number;
  lng: number;
  severity: SeverityLevel;
  reports: number;
  updatedAt: string;
};

export type Scheme = {
  id: string;
  title: string;
  summary: string;
  eligibility: string;
  benefit: string;
  applyLink: string;
};

export type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  language: "en" | "hi" | "hinglish";
  createdAt: string;
};

export type DashboardMetrics = {
  totalScans: number;
  activeAlerts: number;
  savedReports: number;
  yieldScore: number;
};
