import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Configuration types
interface MetricConfig {
    id: string;
    title: string;
    value: number | string;
    format: 'currency' | 'number' | 'percentage' | 'text';
    variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
    trend?: {
        value: number;
        direction: 'up' | 'down' | 'neutral';
        label: string;
    };
    description?: string;
    icon?: React.ReactNode;
}

// Theme system
const VARIANTS = {
    success: {
        container: 'bg-green-50 border-green-200',
        title: 'text-green-900',
        accent: 'text-green-600',
        trend: { up: 'text-green-600', down: 'text-red-500', neutral: 'text-gray-500' }
    },
    warning: {
        container: 'bg-yellow-50 border-yellow-200',
        title: 'text-yellow-900',
        accent: 'text-yellow-600',
        trend: { up: 'text-green-600', down: 'text-red-500', neutral: 'text-gray-500' }
    },
    error: {
        container: 'bg-red-50 border-red-200',
        title: 'text-red-900',
        accent: 'text-red-600',
        trend: { up: 'text-green-600', down: 'text-red-500', neutral: 'text-gray-500' }
    },
    info: {
        container: 'bg-blue-50 border-blue-200',
        title: 'text-blue-900',
        accent: 'text-blue-600',
        trend: { up: 'text-green-600', down: 'text-red-500', neutral: 'text-gray-500' }
    },
    neutral: {
        container: 'bg-gray-50 border-gray-200',
        title: 'text-gray-900',
        accent: 'text-gray-600',
        trend: { up: 'text-green-600', down: 'text-red-500', neutral: 'text-gray-500' }
    }
} as const;

// Formatters
const formatters = {
    currency: (value: number) => value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }),
    number: (value: number) => value.toLocaleString(),
    percentage: (value: number) => `${value}%`,
    text: (value: string | number) => String(value)
};

// Trend icons
const TrendIcon = ({ direction }: { direction: 'up' | 'down' | 'neutral' }) => {
    const icons = {
        up: '↗',
        down: '↘',
        neutral: '→'
    };
    return <span className="mr-1">{icons[direction]}</span>;
};

// Single metric card component
interface MetricCardProps {
    config: MetricConfig;
    className?: string;
}

export function MetricCard({ config, className }: MetricCardProps) {
    const theme = VARIANTS[config.variant];
    const formattedValue = formatters[config.format](config.value as any);

    return (
        <Card className={cn(theme.container, 'border w-full', className)}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardDescription className={cn(theme.title, 'font-medium')}>
                        {config.title}
                    </CardDescription>
                    {config.icon && <div className={theme.accent}>{config.icon}</div>}
                </div>
                <CardTitle className="text-3xl font-mono tabular-nums">
                    {formattedValue}
                </CardTitle>
            </CardHeader>

            {(config.trend || config.description) && (
                <CardFooter className="pt-2">
                    <div className="space-y-1">
                        {config.trend && (
                            <div className={cn('font-medium text-sm', theme.trend[config.trend.direction])}>
                                <TrendIcon direction={config.trend.direction} />
                                {config.trend.value}% {config.trend.label}
                            </div>
                        )}
                        {config.description && (
                            <div className="text-sm text-muted-foreground">
                                {config.description}
                            </div>
                        )}
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

// Grid container for multiple cards
interface MetricGridProps {
    metrics: MetricConfig[];
    columns?: 1 | 2 | 3 | 4;
    className?: string;
}

export function MetricGrid({ metrics, columns = 3, className }: MetricGridProps) {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <div className={cn('grid gap-4', gridCols[columns], className)}>
            {metrics.map((metric) => (
                <MetricCard key={metric.id} config={metric} />
            ))}
        </div>
    );
}

// Usage example with sample data
export function ExampleDashboard() {
    const sampleMetrics: MetricConfig[] = [
        {
            id: 'revenue',
            title: 'Total Revenue',
            value: 125000,
            format: 'currency',
            variant: 'success',
            trend: { value: 12, direction: 'up', label: 'from last month' },
            description: 'Strong performance across all segments'
        },
        {
            id: 'orders',
            title: 'Pending Orders',
            value: 42,
            format: 'number',
            variant: 'warning',
            trend: { value: 8, direction: 'up', label: 'from yesterday' },
            description: 'Requires attention for processing'
        },
        {
            id: 'conversion',
            title: 'Conversion Rate',
            value: 3.2,
            format: 'percentage',
            variant: 'info',
            trend: { value: 0.5, direction: 'up', label: 'from last week' }
        },
        {
            id: 'errors',
            title: 'Error Rate',
            value: 0.1,
            format: 'percentage',
            variant: 'error',
            trend: { value: 0.02, direction: 'down', label: 'from yesterday' },
            description: 'Within acceptable limits'
        }
    ];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Dashboard Metrics</h1>
            <MetricGrid metrics={sampleMetrics} columns={2} />
        </div>
    );
}