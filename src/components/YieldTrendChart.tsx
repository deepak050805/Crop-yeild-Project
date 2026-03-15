import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MergedData } from '@/data/types';

interface YieldTrendChartProps {
  data: MergedData[];
}

const YieldTrendChart = ({ data }: YieldTrendChartProps) => {
  // Aggregate by year
  const byYear = data.reduce((acc, d) => {
    if (!acc[d.year]) acc[d.year] = { year: d.year, yields: [], rainfalls: [] };
    acc[d.year].yields.push(d.yield);
    acc[d.year].rainfalls.push(d.rainfall);
    return acc;
  }, {} as Record<number, { year: number; yields: number[]; rainfalls: number[] }>);

  const chartData = Object.values(byYear)
    .map(v => ({
      year: v.year,
      yield: +(v.yields.reduce((a, b) => a + b, 0) / v.yields.length).toFixed(2),
      rainfall: +(v.rainfalls.reduce((a, b) => a + b, 0) / v.rainfalls.length).toFixed(0),
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div className="stat-card">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Yield Trend Over Years</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '12px' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line yAxisId="left" type="monotone" dataKey="yield" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Yield (t/ha)" />
          <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="hsl(var(--chart-blue))" strokeWidth={2} dot={{ r: 3 }} name="Rainfall (mm)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YieldTrendChart;
