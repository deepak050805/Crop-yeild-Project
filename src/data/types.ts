export interface CropYieldData {
  year: number;
  crop: string;
  district: string;
  areaCultivated: number;
  production: number;
  yield: number;
}

export interface WeatherData {
  year: number;
  district: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
}

export interface MergedData {
  year: number;
  crop: string;
  district: string;
  yield: number;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
}

export interface CorrelationEntry {
  factor: string;
  correlation: number;
  meaning: string;
}
