import { CropYieldData, WeatherData, MergedData, CorrelationEntry } from './types';

const districts = ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar', 'Karnal'];
const crops = ['Wheat', 'Rice', 'Cotton'];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateYieldData(): CropYieldData[] {
  const data: CropYieldData[] = [];
  let seed = 42;
  for (let year = 2010; year <= 2024; year++) {
    for (const crop of crops) {
      for (const district of districts) {
        seed++;
        const baseYield = crop === 'Wheat' ? 4.2 : crop === 'Rice' ? 3.8 : 2.5;
        const area = 500 + Math.floor(seededRandom(seed) * 1500);
        const yieldVal = +(baseYield + (seededRandom(seed + 1) - 0.3) * 1.5 + (year - 2010) * 0.03).toFixed(2);
        data.push({
          year,
          crop,
          district,
          areaCultivated: area,
          production: +(area * yieldVal).toFixed(0),
          yield: yieldVal,
        });
      }
    }
  }
  return data;
}

function generateWeatherData(): WeatherData[] {
  const data: WeatherData[] = [];
  let seed = 100;
  for (let year = 2010; year <= 2024; year++) {
    for (const district of districts) {
      seed++;
      const avgTemp = +(24 + seededRandom(seed) * 6).toFixed(1);
      const rainfall = +(400 + seededRandom(seed + 2) * 800).toFixed(0);
      data.push({
        year,
        district,
        avgTemp,
        maxTemp: +(avgTemp + 8 + seededRandom(seed + 3) * 4).toFixed(1),
        minTemp: +(avgTemp - 10 - seededRandom(seed + 4) * 4).toFixed(1),
        rainfall: +rainfall,
        humidity: +(55 + seededRandom(seed + 5) * 30).toFixed(1),
        windSpeed: +(5 + seededRandom(seed + 6) * 10).toFixed(1),
      });
    }
  }
  return data;
}

export const cropYieldData = generateYieldData();
export const weatherData = generateWeatherData();

export function getMergedData(crop?: string, district?: string): MergedData[] {
  let yieldFiltered = cropYieldData;
  if (crop) yieldFiltered = yieldFiltered.filter(d => d.crop === crop);
  if (district) yieldFiltered = yieldFiltered.filter(d => d.district === district);

  return yieldFiltered.map(y => {
    const w = weatherData.find(w => w.year === y.year && w.district === y.district);
    return {
      year: y.year,
      crop: y.crop,
      district: y.district,
      yield: y.yield,
      avgTemp: w?.avgTemp ?? 0,
      maxTemp: w?.maxTemp ?? 0,
      minTemp: w?.minTemp ?? 0,
      rainfall: w?.rainfall ?? 0,
      humidity: w?.humidity ?? 0,
      windSpeed: w?.windSpeed ?? 0,
    };
  });
}

function pearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n === 0) return 0;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  let num = 0, denX = 0, denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  const den = Math.sqrt(denX * denY);
  return den === 0 ? 0 : +(num / den).toFixed(3);
}

export function getCorrelations(data: MergedData[]): CorrelationEntry[] {
  const yields = data.map(d => d.yield);
  const factors: { key: keyof MergedData; label: string }[] = [
    { key: 'rainfall', label: 'Rainfall' },
    { key: 'avgTemp', label: 'Avg Temperature' },
    { key: 'humidity', label: 'Humidity' },
    { key: 'windSpeed', label: 'Wind Speed' },
    { key: 'maxTemp', label: 'Max Temperature' },
    { key: 'minTemp', label: 'Min Temperature' },
  ];

  return factors.map(f => {
    const values = data.map(d => d[f.key] as number);
    const r = pearsonCorrelation(values, yields);
    const abs = Math.abs(r);
    const dir = r > 0 ? 'positive' : 'negative';
    const strength = abs > 0.6 ? 'Strong' : abs > 0.3 ? 'Moderate' : 'Weak';
    return { factor: f.label, correlation: r, meaning: `${strength} ${dir}` };
  });
}

export function predictYield(rainfall: number, avgTemp: number, humidity: number): number {
  // Simple linear model approximation
  const base = 3.2;
  const rainfallEffect = (rainfall - 600) * 0.0012;
  const tempEffect = -(avgTemp - 27) * 0.08;
  const humidityEffect = (humidity - 65) * 0.005;
  return +(base + rainfallEffect + tempEffect + humidityEffect).toFixed(2);
}

export const allCrops = crops;
export const allDistricts = districts;
