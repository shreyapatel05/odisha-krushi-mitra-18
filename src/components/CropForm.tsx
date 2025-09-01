import { FormStep } from './FormStep';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Info } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { HelpTooltip, ValidationMessage, validateField } from './ValidationHelpers';

interface FormData {
  crop?: string;
  season?: string;
  sowingDate?: Date;
  fieldArea?: string;
  farmCategory?: string;
  [key: string]: any;
}

interface CropFormProps {
  formData: FormData;
  updateFormData: (data: FormData) => void;
}

export const CropForm = ({ formData, updateFormData }: CropFormProps) => {
  const crops = ['Rice', 'Maize', 'Wheat', 'Groundnut', 'Mung', 'Sugarcane', 'Cotton', 'Sesame', 'Black Gram', 'Green Gram', 'Mustard', 'Sunflower', 'Niger', 'Arhar', 'Jute', 'Sweet Potato'];
  const seasons = [
    { value: 'kharif', label: 'Kharif (Jun-Oct)' },
    { value: 'rabi', label: 'Rabi (Nov-Apr)' },
    { value: 'zaid', label: 'Zaid (May-Jun)' }
  ];
  const farmCategories = [
    { value: 'marginal', label: 'Marginal (<1 ha)' },
    { value: 'small', label: 'Small (1-2 ha)' },
    { value: 'medium', label: 'Medium (2-4 ha)' },
    { value: 'large', label: 'Large (>4 ha)' }
  ];

  const getFarmCategory = (area: number) => {
    if (area < 1) return 'marginal';
    if (area <= 2) return 'small';
    if (area <= 4) return 'medium';
    return 'large';
  };

  const handleAreaChange = (area: string) => {
    const numArea = parseFloat(area) || 0;
    updateFormData({
      ...formData,
      fieldArea: area,
      farmCategory: getFarmCategory(numArea)
    });
  };

  return (
    <FormStep
      title="Crop Information"
      description="Tell us about your crop and farming details"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="crop">Primary Crop *</Label>
          <Select 
            value={formData.crop || ''} 
            onValueChange={(value) => updateFormData({ ...formData, crop: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map(crop => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Season *</Label>
          <RadioGroup 
            value={formData.season || ''} 
            onValueChange={(value) => updateFormData({ ...formData, season: value })}
            className="grid grid-cols-1 gap-2"
          >
            {seasons.map(season => (
              <div key={season.value} className="flex items-center space-x-2">
                <RadioGroupItem value={season.value} id={season.value} />
                <Label htmlFor={season.value} className="text-sm">
                  {season.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Sowing Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.sowingDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.sowingDate ? format(formData.sowingDate, "PPP") : "Pick sowing date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.sowingDate}
                onSelect={(date) => updateFormData({ ...formData, sowingDate: date })}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="fieldArea">Field Area (hectares) *</Label>
            <HelpTooltip 
              content="Enter your total cultivated land area in hectares. This helps determine farm category and appropriate recommendations."
              title="Field Area Information"
            />
          </div>
          <Input
            id="fieldArea"
            type="number"
            step="0.1"
            min="0.1"
            max="100"
            placeholder="e.g., 2.5"
            value={formData.fieldArea || ''}
            onChange={(e) => handleAreaChange(e.target.value)}
          />
          <ValidationMessage 
            isValid={!formData.fieldArea || (parseFloat(formData.fieldArea) > 0 && parseFloat(formData.fieldArea) <= 100)}
            message="Field area must be between 0.1 and 100 hectares"
          />
          {formData.fieldArea && parseFloat(formData.fieldArea) > 0 && (
            <div className="bg-accent/30 p-3 rounded-lg">
              <p className="text-sm font-medium">
                Farm Category: <span className="text-primary capitalize">{formData.farmCategory}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.farmCategory === 'marginal' && 'Marginal farmers typically focus on subsistence farming'}
                {formData.farmCategory === 'small' && 'Small farms benefit from intensive cultivation practices'}
                {formData.farmCategory === 'medium' && 'Medium farms can adopt diverse cropping systems'}
                {formData.farmCategory === 'large' && 'Large farms can implement mechanized farming efficiently'}
              </p>
            </div>
          )}
        </div>
      </div>
    </FormStep>
  );
};