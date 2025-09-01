import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Languages, Volume2 } from 'lucide-react';

export const LanguageToggle = () => {
  const [language, setLanguage] = useState<'en' | 'od'>('en');
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage(language === 'en' ? 'od' : 'en')}
        className="flex items-center gap-2"
      >
        <Languages className="h-4 w-4" />
        {language === 'en' ? 'English' : 'ଓଡ଼ିଆ'}
      </Button>
      <Button
        variant={voiceEnabled ? "default" : "outline"}
        size="sm"
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className="flex items-center gap-2"
      >
        <Volume2 className="h-4 w-4" />
        Voice
      </Button>
      {voiceEnabled && (
        <Badge variant="secondary" className="bg-success/10 text-success">
          Voice Active
        </Badge>
      )}
    </div>
  );
};