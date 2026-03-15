import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MergedData } from '@/data/types';

interface ScatterPlotProps {
  data: MergedData[];
  xKey: keyof MergedData;
  xLabel: string;
}

const RainfallScatterPlot = ({ data, xKey, xLabel }: ScatterPlotProps) => {
  const chartData = data.map(d => ({
    x: d[xKey] as number,
    y: d.yield,
  }));

  return (
    <div className="stat-card">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">{xLabel} vs Yield</h3>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="x" name={xLabel} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" label={{ value: xLabel, position: 'insideBottom', offset: -5, fontSize: 11 }} />
          <YAxis dataKey="y" name="Yield" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft', fontSize: 11 }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '12px' }} />
          <Scatter data={chartData} fill="hsl(var(--primary))" fillOpacity={0.6} r={4} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RainfallScatterPlot;
