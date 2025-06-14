import React from 'react'
import { 
  Typography, 
  Card, 
  CardContent,
  LinearProgress,
  Box,
} from '@mui/material'

interface PerformanceMetric {
  label: string
  value: number
  target: number
}

const performanceData: PerformanceMetric[] = [
  { label: 'Page Load Speed', value: 85, target: 90 },
  { label: 'SEO Score', value: 92, target: 95 },
  { label: 'Mobile Responsiveness', value: 88, target: 90 },
  { label: 'Accessibility', value: 76, target: 85 }
]

export const PerformanceMetricsChart: React.FC = () => (
  <Card sx={{ borderRadius: 2, bgcolor: 'grey.950', height: 350 }}>
    <CardContent sx={{ p: 3 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'grey.50', 
          fontWeight: 600,
          fontSize: '1.1rem',
          mb: 3
        }}
      >
        Performance Metrics
      </Typography>
      {performanceData.map((metric, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ color: 'grey.300', fontSize: '0.85rem' }}
            >
              {metric.label}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ color: 'grey.300', fontSize: '0.85rem' }}
            >
              {metric.value}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={metric.value} 
            sx={{ 
              height: 6,
              borderRadius: 3,
              bgcolor: 'grey.700',
              '& .MuiLinearProgress-bar': {
                bgcolor: metric.value >= metric.target ? '#4ade80' : '#f59e0b',
                borderRadius: 3
              }
            }}
          />
        </Box>
      ))}
    </CardContent>
  </Card>
)