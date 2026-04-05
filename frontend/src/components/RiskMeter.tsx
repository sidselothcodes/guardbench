interface RiskMeterProps {
  score: number;
}

export default function RiskMeter({ score }: RiskMeterProps) {
  return (
    <div className="risk-meter">
      <div className="risk-meter-bar">
        <div
          className="risk-meter-fill"
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
        <div
          className="risk-meter-marker"
          style={{ left: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
      <div className="risk-meter-labels">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}
