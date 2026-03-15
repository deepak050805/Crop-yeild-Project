import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MergedData } from '@/data/types';

interface TempBoxChartProps {
  data: MergedData[];
}

const TempBoxChart = ({ data }: TempBoxChartProps) => {
  // Aggregate temp stats by year
  const byYear = data.reduce((acc, d) => {
    if (!acc[d.year]) acc[d.year] = { year: d.year, maxTemps: [], minTemps: [], avgTemps: [] };
    acc[d.year].maxTemps.push(d.maxTemp);
    acc[d.year].minTemps.push(d.minTemp);
    acc[d.year].avgTemps.push(d.avgTemp);
    return acc;
  }, {} as Record<number, { year: number; maxTemps: number[]; minTemps: number[]; avgTemps: number[] }>);

  const chartData = Object.values(byYear)
    .map(v => ({
      year: v.year,
      maxTemp: +(v.maxTemps.reduce((a, b) => a + b, 0) / v.maxTemps.length).toFixed(1),
      avgTemp: +(v.avgTemps.reduce((a, b) => a + b, 0) / v.avgTemps.length).toFixed(1),
      minTemp: +(v.minTemps.reduce((a, b) => a + b, 0) / v.minTemps.length).toFixed(1),
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div className="stat-card">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Temperature Variation by Year</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '12px' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="maxTemp" fill="hsl(var(--chart-red))" name="Max Temp" radius={[2, 2, 0, 0]} />
          <Bar dataKey="avgTemp" fill="hsl(var(--chart-amber))" name="Avg Temp" radius={[2, 2, 0, 0]} />
          <Bar dataKey="minTemp" fill="hsl(var(--chart-blue))" name="Min Temp" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TempBoxChart;
