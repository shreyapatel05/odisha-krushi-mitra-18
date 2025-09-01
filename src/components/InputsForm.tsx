import { useState } from 'react';
import { FormStep } from './FormStep';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, Bug, Leaf, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { HelpTooltip, ValidationMessage } from './ValidationHelpers';

interface FormData {
  seedVariety?: string;
  seedReplacementRate?: string;
  fertilizers?: any[];
  pests?: string[];
  mechanization?: boolean;
  creditAccess?: boolean;
  [key: string]: any;
}

interface InputsFormProps {
  formData: FormData;
  updateFormData: (data: FormData) => void;
}

export const InputsForm = ({ formData, updateFormData }: InputsFormProps) => {
  const seedVarieties = ['Local', 'High Yielding Variety (HYV)', 'Hybrid'];
  
  const fertilizers = [
    'Urea (N)',
    'DAP (N-P)',
    'MOP (K)',
    'SSP (P)',
    'Compost',
    'FYM',
    'NPK Complex'
  ];

  const commonPests = [
    'Brown Plant Hopper',
    'Stem Borer',
    'Leaf Folder',
    'Rice Bug',
    'Gall Midge',
    'White Backed Plant Hopper',
    'Sheath Blight',
    'Blast Disease',
    'Bacterial Leaf Blight'
  ];

  const addFertilizerRow = () => {
    const newFertilizers = [...(formData.fertilizers || []), {
      type: '',
      quantity: '',
      date: null,
      id: Date.now()
    }];
    updateFormData({ ...formData, fertilizers: newFertilizers });
  };

  const removeFertilizerRow = (id: number) => {
    const updatedFertilizers = formData.fertilizers?.filter((f: any) => f.id !== id) || [];
    updateFormData({ ...formData, fertilizers: updatedFertilizers });
  };

  const updateFertilizer = (id: number, field: string, value: any) => {
    const updatedFertilizers = formData.fertilizers?.map((f: any) => 
      f.id === id ? { ...f, [field]: value } : f
    ) || [];
    updateFormData({ ...formData, fertilizers: updatedFertilizers });
  };

  const togglePest = (pest: string) => {
    const currentPests = formData.pests || [];
    
    // If "None" is selected, clear all other pests
    if (pest === 'None') {
      updateFormData({ ...formData, pests: [] });
      return;
    }
    
    // If any other pest is selected, remove "None"
    const pestsWithoutNone = currentPests.filter((p: string) => p !== 'None');
    const updatedPests = pestsWithoutNone.includes(pest)
      ? pestsWithoutNone.filter((p: string) => p !== pest)
      : [...pestsWithoutNone, pest];
    
    updateFormData({ ...formData, pests: updatedPests });
  };

  const handleNoneToggle = (checked: boolean) => {
    if (checked) {
      updateFormData({ ...formData, pests: [] });
    }
  };

  return (
    <FormStep
      title="Inputs & Practices"
      description="Information about seeds, fertilizers, and farming practices"
    >
      <div className="space-y-6">
        {/* Seed Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="seedVariety">Seed Variety *</Label>
              <HelpTooltip 
                content="Local varieties are traditional seeds adapted to local conditions. HYV (High Yielding Varieties) are scientifically improved seeds. Hybrid seeds offer the highest yield potential."
                title="Seed Variety Types"
              />
            </div>
            <Select 
              value={formData.seedVariety || ''} 
              onValueChange={(value) => updateFormData({ ...formData, seedVariety: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select seed variety" />
              </SelectTrigger>
              <SelectContent>
                {seedVarieties.map(variety => (
                  <SelectItem key={variety} value={variety}>
                    {variety}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="seedReplacementRate">Seed Replacement Rate (%)</Label>
              <HelpTooltip 
                content="Percentage of seeds replaced with new/certified seeds this season. Higher replacement rates generally lead to better yields."
              />
            </div>
            <Input
              id="seedReplacementRate"
              type="number"
              min="0"
              max="100"
              step="5"
              placeholder="e.g., 80"
              value={formData.seedReplacementRate || ''}
              onChange={(e) => updateFormData({ ...formData, seedReplacementRate: e.target.value })}
            />
            <ValidationMessage 
              isValid={!formData.seedReplacementRate || (parseFloat(formData.seedReplacementRate) >= 0 && parseFloat(formData.seedReplacementRate) <= 100)}
              message="Seed replacement rate must be between 0 and 100%"
            />
          </div>
        </div>

        {/* Fertilizer Applications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Fertilizer Applications</Label>
              <p className="text-sm text-muted-foreground">Record all fertilizer applications made so far</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFertilizerRow}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {(formData.fertilizers || []).map((fertilizer: any) => (
              <div key={fertilizer.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border rounded-lg bg-muted/20">
                <Select 
                  value={fertilizer.type} 
                  onValueChange={(value) => updateFertilizer(fertilizer.id, 'type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fertilizer type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fertilizers.map(fert => (
                      <SelectItem key={fert} value={fert}>
                        {fert}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Quantity (kg/ha)"
                  value={fertilizer.quantity}
                  onChange={(e) => updateFertilizer(fertilizer.id, 'quantity', e.target.value)}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !fertilizer.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fertilizer.date ? format(fertilizer.date, "PPP") : "Date applied"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fertilizer.date}
                      onSelect={(date) => updateFertilizer(fertilizer.id, 'date', date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFertilizerRow(fertilizer.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {(!formData.fertilizers || formData.fertilizers.length === 0) && (
            <div className="text-center py-6 text-muted-foreground">
              <Leaf className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No fertilizer applications recorded yet</p>
              <p className="text-sm">Click "Add" to record fertilizer usage</p>
            </div>
          )}
        </div>

        {/* Pest and Disease */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Pest & Disease Presence</Label>
            <p className="text-sm text-muted-foreground">Select any pests or diseases currently affecting your crop</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="no-pests"
                checked={!formData.pests || formData.pests.length === 0}
                onCheckedChange={handleNoneToggle}
              />
              <Label htmlFor="no-pests" className="text-sm font-medium text-success">
                No pests/diseases detected
              </Label>
            </div>

            {commonPests.map(pest => (
              <div key={pest} className="flex items-center space-x-2">
                <Checkbox
                  id={pest}
                  checked={formData.pests?.includes(pest) || false}
                  onCheckedChange={() => togglePest(pest)}
                  disabled={formData.pests && formData.pests.length === 0}
                />
                <Label htmlFor={pest} className={cn(
                  "text-sm cursor-pointer",
                  (formData.pests && formData.pests.length === 0) && "text-muted-foreground"
                )}>
                  {pest}
                </Label>
              </div>
            ))}
          </div>

          {formData.pests && formData.pests.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              <Bug className="h-4 w-4 text-warning mt-1" />
              {formData.pests.map((pest: string) => (
                <Badge key={pest} variant="outline" className="border-warning text-warning">
                  {pest}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Access to Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="mechanization">Mechanization Access</Label>
              <p className="text-sm text-muted-foreground">
                Access to tractors, harvesters, etc.
              </p>
            </div>
            <Switch
              id="mechanization"
              checked={formData.mechanization || false}
              onCheckedChange={(checked) => updateFormData({ ...formData, mechanization: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="creditAccess">Credit Access</Label>
              <p className="text-sm text-muted-foreground">
                Access to agricultural loans/credit
              </p>
            </div>
            <Switch
              id="creditAccess"
              checked={formData.creditAccess || false}
              onCheckedChange={(checked) => updateFormData({ ...formData, creditAccess: checked })}
            />
          </div>
        </div>
      </div>
    </FormStep>
  );
};