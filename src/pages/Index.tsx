import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { LocationForm } from '@/components/LocationForm';
import { CropForm } from '@/components/CropForm';
import { SoilIrrigationForm } from '@/components/SoilIrrigationForm';
import { InputsForm } from '@/components/InputsForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { Sprout, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-agricultural.jpg';

interface FormData {
  district?: string;
  block?: string;
  gpsCoordinates?: { latitude: number; longitude: number };
  gpsDetected?: boolean;
  crop?: string;
  season?: string;
  sowingDate?: Date;
  fieldArea?: string;
  farmCategory?: string;
  irrigation?: string;
  soilType?: string;
  hasSoilHealthCard?: boolean;
  soilHealthData?: any;
  seedVariety?: string;
  seedReplacementRate?: string;
  fertilizers?: any[];
  pests?: string[];
  mechanization?: boolean;
  creditAccess?: boolean;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const { toast } = useToast();

  const totalSteps = 4;

  const updateFormData = (data: FormData) => {
    setFormData(data);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.district;
      case 2:
        return formData.crop && formData.season && formData.sowingDate && formData.fieldArea && 
               parseFloat(formData.fieldArea) > 0;
      case 3:
        return formData.irrigation && formData.soilType;
      case 4:
        return formData.seedVariety;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Submit form and show results
        setShowResults(true);
        toast({
          title: "Analysis Complete!",
          description: "Your personalized agricultural recommendations are ready."
        });
      }
    } else {
      toast({
        title: "Please complete required fields",
        description: "Fill in all required information before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setShowResults(false);
    setFormData({});
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LocationForm formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <CropForm formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <SoilIrrigationForm formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <InputsForm formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
                <h1 className="text-3xl font-bold text-primary">Analysis Complete</h1>
              </div>
              <p className="text-muted-foreground">
                Based on your farm data, here are your personalized recommendations
              </p>
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="mt-4"
              >
                Start New Analysis
              </Button>
            </div>
            
            <ResultsDisplay formData={formData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <Sprout className="h-8 w-8" />
              <h1 className="text-3xl md:text-4xl font-bold">Krushi Mitra</h1>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                Odisha
              </Badge>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              AI-Powered Agricultural Advisory Platform for Smart Farming in Odisha
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-primary/5 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-xl text-primary">
                  Farm Information Collection
                </CardTitle>
                <LanguageToggle />
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <ProgressIndicator 
                currentStep={currentStep}
                totalSteps={totalSteps}
                completedSteps={completedSteps}
              />
              
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2"
                  disabled={!isStepValid(currentStep)}
                >
                  {currentStep === totalSteps ? 'Generate Recommendations' : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Smart Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered insights based on local conditions and best practices
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-earth/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-earth" />
                </div>
                <h3 className="font-semibold mb-2">Proven Results</h3>
                <p className="text-sm text-muted-foreground">
                  Increase yields by up to 20% with data-driven farming decisions
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Easy to Follow</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guidance with local language support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;