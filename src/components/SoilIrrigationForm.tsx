import { useState } from 'react';
import { FormStep } from './FormStep';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { TestTube } from 'lucide-react';

interface FormData {
  irrigation?: string;
  soilType?: string;
  hasSoilHealthCard?: boolean;
  soilHealthData?: any;
  [key: string]: any;
}

interface SoilIrrigationFormProps {
  formData: FormData;
  updateFormData: (data: FormData) => void;
}

export const SoilIrrigationForm = ({ formData, updateFormData }: SoilIrrigationFormProps) => {
  const irrigationTypes = [
    'None/Rainfed',
    'Tube well',
    'Canal',
    'Lift Irrigation',
    'Drip Irrigation',
    'Sprinkler',
    'Check Dam',
    'Tank/Pond'
  ];

  const soilTypes = [
    'Alluvial',
    'Lateritic',
    'Red & Black',
    'Saline',
    'Sandy',
    'Clay'
  ];

  const handleSoilHealthToggle = (enabled: boolean) => {
    updateFormData({
      ...formData,
      hasSoilHealthCard: enabled,
      soilHealthData: enabled ? (formData.soilHealthData || {}) : null
    });
  };

  const updateSoilHealthData = (field: string, value: string) => {
    updateFormData({
      ...formData,
      soilHealthData: {
        ...formData.soilHealthData,
        [field]: value
      }
    });
  };

  return (
    <FormStep
      title="Soil & Irrigation"
      description="Information about your soil conditions and water sources"
    >
      <div className="space-y-6">
        {/* Irrigation Type */}
        <div className="space-y-2">
          <Label htmlFor="irrigation">Irrigation Type *</Label>
          <Select 
            value={formData.irrigation || ''} 
            onValueChange={(value) => updateFormData({ ...formData, irrigation: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select irrigation method" />
            </SelectTrigger>
            <SelectContent>
              {irrigationTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Soil Type */}
        <div className="space-y-2">
          <Label htmlFor="soilType">Soil Type *</Label>
          <Select 
            value={formData.soilType || ''} 
            onValueChange={(value) => updateFormData({ ...formData, soilType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select soil type" />
            </SelectTrigger>
            <SelectContent>
              {soilTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Soil Health Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="soilHealthCard">Soil Health Card Available</Label>
              <p className="text-sm text-muted-foreground">
                Do you have soil test results?
              </p>
            </div>
            <Switch
              id="soilHealthCard"
              checked={formData.hasSoilHealthCard || false}
              onCheckedChange={handleSoilHealthToggle}
            />
          </div>

          {formData.hasSoilHealthCard && (
            <div className="border rounded-lg p-4 space-y-4 bg-accent/50">
              <div className="flex items-center gap-2 mb-3">
                <TestTube className="h-4 w-4 text-primary" />
                <Badge variant="secondary">Soil Test Data</Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen (N) kg/ha</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    placeholder="e.g., 250"
                    value={formData.soilHealthData?.nitrogen || ''}
                    onChange={(e) => updateSoilHealthData('nitrogen', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus (P2O5) kg/ha</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    placeholder="e.g., 45"
                    value={formData.soilHealthData?.phosphorus || ''}
                    onChange={(e) => updateSoilHealthData('phosphorus', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium (K2O) kg/ha</Label>
                  <Input
                    id="potassium"
                    type="number"
                    placeholder="e.g., 120"
                    value={formData.soilHealthData?.potassium || ''}
                    onChange={(e) => updateSoilHealthData('potassium', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ph">pH Level</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    placeholder="e.g., 6.5"
                    value={formData.soilHealthData?.ph || ''}
                    onChange={(e) => updateSoilHealthData('ph', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organicCarbon">Organic Carbon (%)</Label>
                  <Input
                    id="organicCarbon"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 0.8"
                    value={formData.soilHealthData?.organicCarbon || ''}
                    onChange={(e) => updateSoilHealthData('organicCarbon', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FormStep>
  );
};