import React from 'react'
import {
  Typography,
  LinearProgress,
} from '@mui/material'
import { ChartCard } from './ChartCard'

interface PerformanceData {
  label: string
  value: number
  color: 'success' | 'info' | 'warning' | 'error'
}

const performanceData: PerformanceData[] = [
  { label: 'Sales', value: 85, color: 'success' },
  { label: 'Marketing', value: 70, color: 'info' },
  { label: 'Support', value: 92, color: 'warning' },
  { label: 'Development', value: 78, color: 'error' },
]

export const PerformanceMetrics: React.FC = () => (
  <ChartCard title="Department Performance">
    <div className="space-y-4">
      {performanceData.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-1">
            <Typography 
              variant="body2"
              sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}
            >
              {item.label}
            </Typography>
            <Typography 
              variant="caption" 
              color="textSecondary"
              sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
            >
              {item.value}%
            </Typography>
          </div>
          <LinearProgress
            variant="determinate"
            value={item.value}
            color={item.color}
            sx={{ 
              height: 6, 
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          />
        </div>
      ))}
    </div>
  </ChartCard>
)