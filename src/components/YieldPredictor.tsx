import { useState } from 'react';
import { predictYield } from '@/data/cropData';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sprout } from 'lucide-react';

const YieldPredictor = () => {
  const [rainfall, setRainfall] = useState(600);
  const [temp, setTemp] = useState(27);
  const [humidity, setHumidity] = useState(65);
  const [prediction, setPrediction] = useState<number | null>(null);

  const handlePredict = () => {
    setPrediction(predictYield(rainfall, temp, humidity));
  };

  return (
    <div className="stat-card">
      <div className="flex items-center gap-2 mb-4">
        <Sprout className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-card-foreground">Yield Predictor</h3>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Rainfall</span>
            <span className="font-medium text-card-foreground">{rainfall} mm</span>
          </div>
          <Slider value={[rainfall]} onValueChange={v => setRainfall(v[0])} min={200} max={1200} step={10} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Avg Temperature</span>
            <span className="font-medium text-card-foreground">{temp}°C</span>
          </div>
          <Slider value={[temp]} onValueChange={v => setTemp(v[0])} min={15} max={40} step={0.5} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Humidity</span>
            <span className="font-medium text-card-foreground">{humidity}%</span>
          </div>
          <Slider value={[humidity]} onValueChange={v => setHumidity(v[0])} min={30} max={95} step={1} />
        </div>

        <Button onClick={handlePredict} className="w-full">
          Predict Yield
        </Button>

        {prediction !== null && (
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground">Estimated Yield</p>
            <p className="text-3xl font-bold text-primary">{prediction} t/ha</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldPredictor;
