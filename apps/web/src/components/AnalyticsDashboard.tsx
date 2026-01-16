'use client';

interface MetricCard {
  label: string;
  value: string;
  trend: string;
}

interface AnalyticsDashboardProps {
  metrics: MetricCard[];
}

export function AnalyticsDashboard({ metrics }: AnalyticsDashboardProps) {
  return (
    <div className="analytics-dashboard">
      <div className="metric-grid">
        {metrics.map((metric, idx) => (
          <div key={idx} className="metric-card">
            <p className="label">{metric.label}</p>
            <p className="metric-value">{metric.value}</p>
            <div className="metric-trend">
              <span>{metric.trend}</span>
              <div className="metric-chart" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
