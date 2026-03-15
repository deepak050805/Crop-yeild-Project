import { TrendingUp, TrendingDown, Droplets, Thermometer, Wind, CloudRain } from 'lucide-react';
import { MergedData } from '@/data/types';

interface StatsCardsProps {
  data: MergedData[];
}

const StatsCards = ({ data }: StatsCardsProps) => {
  if (data.length === 0) return null;

  const avgYield = (data.reduce((a, b) => a + b.yield, 0) / data.length).toFixed(2);
  const avgRainfall = (data.reduce((a, b) => a + b.rainfall, 0) / data.length).toFixed(0);
  const avgTemp = (data.reduce((a, b) => a + b.avgTemp, 0) / data.length).toFixed(1);
  const avgHumidity = (data.reduce((a, b) => a + b.humidity, 0) / data.length).toFixed(1);

  const latestYield = data.filter(d => d.year === 2024);
  const prevYield = data.filter(d => d.year === 2023);
  const latestAvg = latestYield.length > 0 ? latestYield.reduce((a, b) => a + b.yield, 0) / latestYield.length : 0;
  const prevAvg = prevYield.length > 0 ? prevYield.reduce((a, b) => a + b.yield, 0) / prevYield.length : 0;
  const yieldTrend = prevAvg > 0 ? ((latestAvg - prevAvg) / prevAvg * 100).toFixed(1) : '0';
  const isUp = Number(yieldTrend) >= 0;

  const stats = [
    { label: 'Avg Yield', value: `${avgYield} t/ha`, icon: isUp ? TrendingUp : TrendingDown, trend: `${isUp ? '+' : ''}${yieldTrend}%`, trendUp: isUp },
    { label: 'Avg Rainfall', value: `${avgRainfall} mm`, icon: CloudRain, trend: null, trendUp: false },
    { label: 'Avg Temperature', value: `${avgTemp}°C`, icon: Thermometer, trend: null, trendUp: false },
    { label: 'Avg Humidity', value: `${avgHumidity}%`, icon: Droplets, trend: null, trendUp: false },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="stat-card flex items-start gap-3">
          <div className="p-2 rounded-md bg-primary/10">
            <s.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-xl font-semibold text-card-foreground">{s.value}</p>
            {s.trend && (
              <p className={`text-xs font-medium ${s.trendUp ? 'text-primary' : 'text-destructive'}`}>
                {s.trend} vs last year
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
