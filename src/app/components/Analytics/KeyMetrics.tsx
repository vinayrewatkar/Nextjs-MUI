import React from 'react'
import { 
  Typography, 
  Card, 
  CardContent,
  Chip,
} from '@mui/material'
import Grid from '@mui/material/Grid'

interface Metric {
  title: string
  value: string
  change: string
  positive: boolean
}

const metricsData: Metric[] = [
  { title: 'Total Sessions', value: '24,583', change: '+12.5%', positive: true },
  { title: 'Unique Users', value: '18,247', change: '+8.2%', positive: true },
  { title: 'Bounce Rate', value: '32.4%', change: '-2.1%', positive: true },
  { title: 'Avg. Session Duration', value: '3m 42s', change: '+15.3%', positive: true }
]

export const KeyMetrics: React.FC = () => (
  <Grid container spacing={2} sx={{ mb: 3 }}>
    {metricsData.map((metric, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
        <Card sx={{ borderRadius: 2, bgcolor: 'grey.800', height: '100%' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography 
              variant="body2" 
              sx={{ color: 'grey.400', fontSize: '0.75rem', mb: 1 }}
            >
              {metric.title}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'grey.50', 
                fontWeight: 700,
                fontSize: '1.25rem',
                mb: 1
              }}
            >
              {metric.value}
            </Typography>
            <Chip 
              label={metric.change}
              size="small"
              sx={{ 
                bgcolor: metric.positive ? 'success.dark' : 'error.dark',
                color: 'white',
                fontSize: '0.7rem',
                height: 20
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)