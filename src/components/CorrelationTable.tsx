import { CorrelationEntry } from '@/data/types';

interface CorrelationTableProps {
  correlations: CorrelationEntry[];
}

const CorrelationTable = ({ correlations }: CorrelationTableProps) => {
  const sorted = [...correlations].sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

  const getBarColor = (r: number) => {
    if (r > 0.5) return 'bg-primary';
    if (r > 0) return 'bg-chart-teal';
    if (r > -0.3) return 'bg-accent';
    return 'bg-destructive';
  };

  return (
    <div className="stat-card">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Correlation with Yield (Pearson)</h3>
      <div className="space-y-3">
        {sorted.map(c => (
          <div key={c.factor} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-card-foreground font-medium">{c.factor}</span>
              <span className="text-muted-foreground">{c.correlation > 0 ? '+' : ''}{c.correlation} · {c.meaning}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getBarColor(c.correlation)}`}
                style={{ width: `${Math.abs(c.correlation) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorrelationTable;
