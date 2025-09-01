import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormStepProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export const FormStep = ({ title, description, children, className }: FormStepProps) => {
  return (
    <Card className={`mb-6 ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};