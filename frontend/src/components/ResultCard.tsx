import { ScanResult } from '../types';
import RiskMeter from './RiskMeter';
import PatternBadge from './PatternBadge';
import BypassTest from './BypassTest';

const RISK_COLORS: Record<string, string> = {
  safe: '#22C55E',
  caution: '#EAB308',
  dangerous: '#EF4444',
};

const RISK_BG: Record<string, string> = {
  safe: 'rgba(34, 197, 94, 0.08)',
  caution: 'rgba(234, 179, 8, 0.08)',
  dangerous: 'rgba(239, 68, 68, 0.08)',
};

interface ResultCardProps {
  result: ScanResult;
  visible: boolean;
  prompt: string;
}

export default function ResultCard({ result, visible, prompt }: ResultCardProps) {
  const color = RISK_COLORS[result.riskLevel];
  const bg = RISK_BG[result.riskLevel];
  const showBypass = result.riskLevel === 'caution' || result.riskLevel === 'dangerous';

  return (
    <div className={`result-card ${visible ? 'result-visible' : ''}`}>
      <div className="risk-header">
        <span className="risk-label" style={{ color, backgroundColor: bg }}>
          {result.riskLevel.toUpperCase()}
        </span>
        <span className="risk-score">
          <strong>{result.riskScore}</strong>/100
        </span>
      </div>

      <RiskMeter score={result.riskScore} />

      <div className="section-divider" />

      <div className="result-section">
        <p className="explanation-text">{result.explanation}</p>
        <p className="mitigation-inline">
          <span className="mitigation-label">Mitigation: </span>
          {result.mitigation}
        </p>
      </div>

      <div className="section-divider" />

      <div className="result-section">
        <h3 className="section-title">
          Detected Patterns
          <span className="count-badge">({result.detectedPatterns.length})</span>
        </h3>
        {result.detectedPatterns.length > 0 ? (
          <div className="patterns-list">
            {result.detectedPatterns.map((p, i) => (
              <PatternBadge key={`${p.name}-${i}`} pattern={p} />
            ))}
          </div>
        ) : (
          <p className="no-patterns">No suspicious patterns detected</p>
        )}
      </div>

      {showBypass && (
        <>
          <div className="section-divider" />
          <BypassTest prompt={prompt} />
        </>
      )}

      <div className="analysis-footer">
        Pattern Matching: {result.analysisLayers.patternMatching.matchCount} &middot; AI Analysis: {result.analysisLayers.aiAnalysis.riskScore}/100
      </div>
    </div>
  );
}
