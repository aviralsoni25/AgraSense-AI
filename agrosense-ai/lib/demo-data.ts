import type {
  CropRecommendation,
  DashboardMetrics,
  DiseaseScanResult,
  Scheme,
  WeatherSnapshot,
} from "@/types";

export const dashboardMetrics: DashboardMetrics = {
  totalScans: 184,
  activeAlerts: 7,
  savedReports: 29,
  yieldScore: 82,
};

export const monthlyScans = [
  { month: "Jan", scans: 14 },
  { month: "Feb", scans: 21 },
  { month: "Mar", scans: 19 },
  { month: "Apr", scans: 25 },
  { month: "May", scans: 31 },
  { month: "Jun", scans: 28 },
  { month: "Jul", scans: 34 },
  { month: "Aug", scans: 37 },
  { month: "Sep", scans: 29 },
  { month: "Oct", scans: 33 },
  { month: "Nov", scans: 30 },
  { month: "Dec", scans: 39 },
];

export const diseaseCategoryData = [
  { name: "Fungal", value: 48 },
  { name: "Bacterial", value: 22 },
  { name: "Viral", value: 17 },
  { name: "Nutrient", value: 13 },
];

export const recentScans: DiseaseScanResult[] = [
  {
    id: "scan-101",
    imageUrl:
      "https://images.unsplash.com/photo-1592982537447-9a35a7db1778?auto=format&fit=crop&w=1200&q=80",
    disease: "Early Blight",
    confidence: 86,
    severity: "medium",
    symptoms: ["Brown spots", "Leaf curl", "Yellow halo"],
    treatments: ["Use fungicide", "Prune infected leaves", "Reduce overhead watering"],
    organicTreatment: "Neem oil foliar spray every 6 days",
    preventionTips: ["Crop rotation", "Soil drainage improvement"],
    cropLossRisk: 36,
    language: "en",
    createdAt: new Date().toISOString(),
    location: "Agra, Uttar Pradesh",
  },
  {
    id: "scan-102",
    imageUrl:
      "https://images.unsplash.com/photo-1646279200865-99decc84f762?auto=format&fit=crop&w=1200&q=80",
    disease: "Leaf Spot",
    confidence: 73,
    severity: "low",
    symptoms: ["Small spots", "Mild discoloration"],
    treatments: ["Use copper spray", "Monitor 48 hours"],
    organicTreatment: "Cow urine diluted foliar spray",
    preventionTips: ["Do not over-irrigate", "Field sanitation"],
    cropLossRisk: 18,
    language: "hi",
    createdAt: new Date().toISOString(),
    location: "Mathura, Uttar Pradesh",
  },
];

export const defaultWeather: WeatherSnapshot = {
  locationLabel: "Agra, Uttar Pradesh",
  latitude: 27.1767,
  longitude: 78.0081,
  currentTemp: 32,
  humidity: 62,
  rainChance: 28,
  condition: "Partly cloudy",
  forecast: [
    {
      date: new Date().toISOString(),
      minTemp: 23,
      maxTemp: 34,
      rainChance: 28,
      humidity: 61,
      windSpeed: 14,
    },
  ],
  advisory: ["Irrigate lightly in evening.", "Monitor fungal risk after humidity spikes."],
};

export const demoRecommendations: CropRecommendation[] = [
  {
    crop: "Pearl Millet",
    expectedProfitScore: 81,
    waterNeed: "Low",
    riskScore: 21,
    why: "Strong drought tolerance and low input costs.",
    marketDemand: "Growing demand in flour and feed segments.",
  },
  {
    crop: "Green Gram",
    expectedProfitScore: 76,
    waterNeed: "Low",
    riskScore: 29,
    why: "Short season crop with favorable rotation benefits.",
    marketDemand: "Consistent pulse demand in local mandis.",
  },
  {
    crop: "Mustard",
    expectedProfitScore: 71,
    waterNeed: "Medium",
    riskScore: 33,
    why: "Suitable winter crop with stable input requirement.",
    marketDemand: "Edible oil demand supports good price realization.",
  },
];

export const demoSchemes: Scheme[] = [
  {
    id: "pm-kisan",
    title: "PM-KISAN",
    summary: "Income support of Rs. 6,000 annually paid in 3 installments.",
    eligibility: "Small and marginal farmer families.",
    benefit: "Direct benefit transfer to registered bank account.",
    applyLink: "https://pmkisan.gov.in/",
  },
  {
    id: "pmfby",
    title: "PM Fasal Bima Yojana",
    summary: "Crop insurance against natural calamities and yield loss.",
    eligibility: "Farmers growing notified crops in notified areas.",
    benefit: "Low premium with broad crop loss protection.",
    applyLink: "https://pmfby.gov.in/",
  },
  {
    id: "kcc",
    title: "Kisan Credit Card",
    summary: "Timely short-term credit for crop cultivation and farm operations.",
    eligibility: "Cultivator farmers and allied activity farmers.",
    benefit: "Easy credit access and subsidized interest rates.",
    applyLink: "https://www.myscheme.gov.in/",
  },
];
