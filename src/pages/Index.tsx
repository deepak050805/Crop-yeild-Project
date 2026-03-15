import { useState, useMemo } from 'react';
import { Wheat } from 'lucide-react';
import FilterBar from '@/components/FilterBar';
import StatsCards from '@/components/StatsCards';
import YieldTrendChart from '@/components/YieldTrendChart';
import RainfallScatterPlot from '@/components/RainfallScatterPlot';
import CorrelationTable from '@/components/CorrelationTable';
import YieldPredictor from '@/components/YieldPredictor';
import TempBoxChart from '@/components/TempBoxChart';
import { getMergedData, getCorrelations } from '@/data/cropData';

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const mergedData = useMemo(() =>
    getMergedData(
      selectedCrop === 'all' ? undefined : selectedCrop,
      selectedDistrict === 'all' ? undefined : selectedDistrict
    ), [selectedCrop, selectedDistrict]);

  const correlations = useMemo(() => getCorrelations(mergedData), [mergedData]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wheat className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-card-foreground">Crop Yield vs Weather</h1>
              <p className="text-xs text-muted-foreground">Correlation Analysis Dashboard · Punjab Region</p>
            </div>
          </div>
          <FilterBar
            selectedCrop={selectedCrop}
            selectedDistrict={selectedDistrict}
            onCropChange={setSelectedCrop}
            onDistrictChange={setSelectedDistrict}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <StatsCards data={mergedData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <YieldTrendChart data={mergedData} />
          <RainfallScatterPlot data={mergedData} xKey="rainfall" xLabel="Rainfall (mm)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CorrelationTable correlations={correlations} />
          </div>
          <YieldPredictor />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TempBoxChart data={mergedData} />
          <RainfallScatterPlot data={mergedData} xKey="avgTemp" xLabel="Avg Temperature (°C)" />
        </div>

        {/* Data count */}
        <p className="text-xs text-muted-foreground text-center pb-4">
          Showing {mergedData.length} records · Data from 2010–2024 · {selectedCrop === 'all' ? 'All crops' : selectedCrop} · {selectedDistrict === 'all' ? 'All districts' : selectedDistrict}
        </p>
      </main>
    </div>
  );
};

export default Index;
