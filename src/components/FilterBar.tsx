import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCrops, allDistricts } from '@/data/cropData';

interface FilterBarProps {
  selectedCrop: string;
  selectedDistrict: string;
  onCropChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
}

const FilterBar = ({ selectedCrop, selectedDistrict, onCropChange, onDistrictChange }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Select value={selectedCrop} onValueChange={onCropChange}>
        <SelectTrigger className="w-[160px] bg-card">
          <SelectValue placeholder="All Crops" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Crops</SelectItem>
          {allCrops.map(c => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedDistrict} onValueChange={onDistrictChange}>
        <SelectTrigger className="w-[160px] bg-card">
          <SelectValue placeholder="All Districts" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Districts</SelectItem>
          {allDistricts.map(d => (
            <SelectItem key={d} value={d}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
