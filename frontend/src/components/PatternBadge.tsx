import { DetectedPattern } from '../types';

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#DC2626',
  high: '#F97316',
  medium: '#EAB308',
  low: '#3B82F6',
};

interface PatternBadgeProps {
  pattern: DetectedPattern;
}

export default function PatternBadge({ pattern }: PatternBadgeProps) {
  const color = SEVERITY_COLORS[pattern.severity] || '#94A3B8';

  return (
    <div className="pattern-badge" style={{ borderLeftColor: color }}>
      <span className="pattern-name">{pattern.name}</span>
      <span className="severity-pill" style={{ backgroundColor: `${color}20`, color }}>
        {pattern.severity.toUpperCase()}
      </span>
      <span className="source-pill">
        {pattern.source === 'pattern' ? 'Pattern' : 'AI'}
      </span>
    </div>
  );
}
