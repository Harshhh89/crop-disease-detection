export interface AnalysisResult {
  plantName: string;
  plantCategory: string;
  diseaseName: string;
  isHealthy: boolean;
  confidence: number;
  description: string;
  cause: string;
  treatment: string;
  prevention: string;
  pesticide: string;
}

const diseases: AnalysisResult[] = [
  {
    plantName: "Tomato",
    plantCategory: "Solanaceae (Nightshade family)",
    diseaseName: "Early Blight",
    isHealthy: false,
    confidence: 94.2,
    description: "Early blight is caused by the fungus Alternaria solani. It appears as dark brown to black spots with concentric rings on older leaves.",
    cause: "Fungus Alternaria solani, spread through wind, rain splash, and contaminated soil.",
    treatment: "Apply chlorothalonil or copper-based fungicide. Remove and destroy infected leaves immediately.",
    prevention: "Use disease-resistant varieties, practice crop rotation, and ensure proper plant spacing for air circulation.",
    pesticide: "Chlorothalonil, Mancozeb, or Copper Hydroxide",
  },
  {
    plantName: "Potato",
    plantCategory: "Solanaceae (Nightshade family)",
    diseaseName: "Late Blight",
    isHealthy: false,
    confidence: 91.7,
    description: "Late blight is caused by Phytophthora infestans. It creates water-soaked lesions that turn brown and spread rapidly.",
    cause: "Oomycete Phytophthora infestans, favored by cool, wet conditions.",
    treatment: "Apply metalaxyl-based fungicide. Remove and burn all infected plants.",
    prevention: "Avoid overhead irrigation, use certified seed potatoes, and apply protective fungicides.",
    pesticide: "Metalaxyl (Ridomil), Cymoxanil, or Phosphorous acid",
  },
  {
    plantName: "Apple",
    plantCategory: "Rosaceae (Rose family)",
    diseaseName: "Apple Scab",
    isHealthy: false,
    confidence: 88.5,
    description: "Apple scab is caused by the fungus Venturia inaequalis. It produces olive-green to black lesions on leaves and fruit.",
    cause: "Fungus Venturia inaequalis, spreading via wind-dispersed ascospores in spring.",
    treatment: "Apply captan or myclobutanil fungicide during early growth stages.",
    prevention: "Plant resistant varieties, rake and destroy fallen leaves, prune for good air circulation.",
    pesticide: "Captan, Myclobutanil, or Sulfur sprays",
  },
  {
    plantName: "Corn",
    plantCategory: "Poaceae (Grass family)",
    diseaseName: "Common Rust",
    isHealthy: false,
    confidence: 96.1,
    description: "Common rust produces small, round to elongate reddish-brown pustules on both leaf surfaces.",
    cause: "Fungus Puccinia sorghi, spread by wind-borne spores.",
    treatment: "Apply triazole or strobilurin fungicide if infection is severe.",
    prevention: "Plant resistant hybrids and scout fields regularly during warm, humid weather.",
    pesticide: "Propiconazole, Azoxystrobin, or Trifloxystrobin",
  },
  {
    plantName: "Grape",
    plantCategory: "Vitaceae (Grape family)",
    diseaseName: "Healthy",
    isHealthy: true,
    confidence: 97.8,
    description: "The leaf appears healthy with no visible signs of disease, pest damage, or nutrient deficiency.",
    cause: "N/A — No disease detected.",
    treatment: "No treatment required. Continue regular care and monitoring.",
    prevention: "Maintain proper watering, fertilization, and periodic inspection.",
    pesticide: "None required",
  },
];

export function simulateAnalysis(): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    const delay = 1500 + Math.random() * 1500;
    const result = diseases[Math.floor(Math.random() * diseases.length)];
    setTimeout(() => resolve(result), delay);
  });
}
