import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ValidationMessageProps {
  isValid: boolean;
  message: string;
  type?: 'error' | 'success' | 'info';
}

export const ValidationMessage = ({ isValid, message, type = 'error' }: ValidationMessageProps) => {
  if (isValid && type !== 'success') return null;
  
  const getIcon = () => {
    if (type === 'success') return <CheckCircle2 className="h-4 w-4" />;
    if (type === 'info') return <HelpCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const getVariant = () => {
    if (type === 'success') return 'default';
    if (type === 'info') return 'default';
    return 'destructive';
  };

  return (
    <Alert variant={getVariant()} className="mt-2">
      {getIcon()}
      <AlertDescription className="text-sm">
        {message}
      </AlertDescription>
    </Alert>
  );
};

interface HelpTooltipProps {
  content: string;
  title?: string;
}

export const HelpTooltip = ({ content, title }: HelpTooltipProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 text-sm">
        {title && <div className="font-medium mb-2">{title}</div>}
        <div className="text-muted-foreground">{content}</div>
      </PopoverContent>
    </Popover>
  );
};

export const validateField = (field: string, value: any, rules?: any) => {
  const validations = {
    required: (val: any) => val !== undefined && val !== null && val !== '',
    minLength: (val: string, min: number) => val && val.length >= min,
    maxLength: (val: string, max: number) => val && val.length <= max,
    min: (val: number, min: number) => val >= min,
    max: (val: number, max: number) => val <= max,
    email: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    phone: (val: string) => /^[0-9]{10}$/.test(val?.replace(/\D/g, '')),
    percentage: (val: number) => val >= 0 && val <= 100,
    positive: (val: number) => val > 0,
    date: (val: Date) => val instanceof Date && !isNaN(val.getTime()),
    pastDate: (val: Date) => val <= new Date()
  };

  if (!rules) return { isValid: true, message: '' };

  for (const [rule, ruleValue] of Object.entries(rules)) {
    const validator = validations[rule as keyof typeof validations];
    if (validator && !validator(value, ruleValue as any)) {
      return {
        isValid: false,
        message: getErrorMessage(field, rule, ruleValue)
      };
    }
  }

  return { isValid: true, message: '' };
};

const getErrorMessage = (field: string, rule: string, ruleValue: any) => {
  const messages = {
    required: `${field} is required`,
    minLength: `${field} must be at least ${ruleValue} characters`,
    maxLength: `${field} must be less than ${ruleValue} characters`,
    min: `${field} must be at least ${ruleValue}`,
    max: `${field} must be less than ${ruleValue}`,
    email: `Please enter a valid email address`,
    phone: `Please enter a valid 10-digit phone number`,
    percentage: `${field} must be between 0 and 100`,
    positive: `${field} must be greater than 0`,
    date: `Please select a valid date`,
    pastDate: `Date cannot be in the future`
  };

  return messages[rule as keyof typeof messages] || `Invalid ${field}`;
};