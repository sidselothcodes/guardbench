export interface DetectedPattern {
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  source: 'pattern' | 'ai';
}

export interface ScanResult {
  riskLevel: 'safe' | 'caution' | 'dangerous';
  riskScore: number;
  detectedPatterns: DetectedPattern[];
  explanation: string;
  mitigation: string;
  analysisLayers: {
    patternMatching: {
      matchCount: number;
      patterns: string[];
    };
    aiAnalysis: {
      riskScore: number;
      patterns: string[];
    };
  };
}

export interface BypassResult {
  unprotected: {
    response: string;
    bypassed: boolean;
    explanation: string;
  };
  protected: {
    response: string;
    bypassed: boolean;
    explanation: string;
  };
  defenseEffective: boolean;
  systemPromptUsed: string;
}
