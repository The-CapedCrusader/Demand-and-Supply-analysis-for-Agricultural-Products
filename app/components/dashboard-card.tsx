import type React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { cn } from '~/lib/utils';

interface DashboardCardProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export function DashboardCard({
  title,
  className,
  children,
}: DashboardCardProps) {
  return (
    <Card className={cn('shadow-sm', className)}>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
