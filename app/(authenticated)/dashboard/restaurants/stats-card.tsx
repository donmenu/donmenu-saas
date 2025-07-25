'use client';

import { Card, Title, Text, Badge, Metric, Flex } from '@tremor/react';
import { useState, useEffect } from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<any>;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'indigo' | 'emerald' | 'red' | 'yellow';
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  formatValue?: (value: number) => string;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    metric: 'text-blue-900 dark:text-blue-300',
    badge: 'bg-blue-200 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    metric: 'text-green-900 dark:text-green-300',
    badge: 'bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-300'
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    metric: 'text-orange-900 dark:text-orange-300',
    badge: 'bg-orange-200 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    metric: 'text-purple-900 dark:text-purple-300',
    badge: 'bg-purple-200 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    metric: 'text-indigo-900 dark:text-indigo-300',
    badge: 'bg-indigo-200 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    metric: 'text-emerald-900 dark:text-emerald-300',
    badge: 'bg-emerald-200 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    metric: 'text-red-900 dark:text-red-300',
    badge: 'bg-red-200 dark:bg-red-900/30 text-red-800 dark:text-red-300'
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-600 dark:text-yellow-400',
    metric: 'text-yellow-900 dark:text-yellow-300',
    badge: 'bg-yellow-200 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
  }
};

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  subtitle, 
  trend, 
  formatValue 
}: StatsCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stats-card-${title}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [title]);

  useEffect(() => {
    if (isVisible && typeof value === 'number') {
      const duration = 1000; // 1 segundo
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  const colors = colorClasses[color];
  const displayValue = typeof value === 'number' ? 
    (formatValue ? formatValue(animatedValue) : animatedValue.toLocaleString()) : 
    value;

  return (
    <Card 
      id={`stats-card-${title}`}
      className={`${colors.bg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <Flex alignItems="start">
        <div className="truncate">
          <Text className={`${colors.text} font-medium`}>{title}</Text>
          <Metric className={colors.metric}>
            {displayValue}
            {trend && (
              <span className={`ml-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↗' : '↘'} {trend.value}%
              </span>
            )}
          </Metric>
          {subtitle && (
            <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">{subtitle}</Text>
          )}
        </div>
        <Badge color={color} className={colors.badge}>
          <Icon className="w-4 h-4" />
        </Badge>
      </Flex>
    </Card>
  );
} 