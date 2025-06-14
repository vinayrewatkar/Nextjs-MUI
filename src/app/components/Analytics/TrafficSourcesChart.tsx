import React from 'react'
import { 
  Typography, 
  Card, 
  CardContent,
} from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const trafficData = [
  { name: 'Jan', organic: 4000, paid: 2400, social: 1200 },
  { name: 'Feb', organic: 3000, paid: 1398, social: 2000 },
  { name: 'Mar', organic: 2000, paid: 9800, social: 1800 },
  { name: 'Apr', organic: 2780, paid: 3908, social: 2200 },
  { name: 'May', organic: 1890, paid: 4800, social: 1600 },
  { name: 'Jun', organic: 2390, paid: 3800, social: 2400 }
]

export const TrafficSourcesChart: React.FC = () => (
  <Card sx={{ borderRadius: 2, bgcolor: 'grey.950', height: 400 }}>
    <CardContent sx={{ p: 3 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'grey.50', 
          fontWeight: 600,
          fontSize: '1.1rem',
          mb: 2
        }}
      >
        Traffic Sources Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trafficData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="organic" 
            stroke="#8884d8" 
            strokeWidth={2}
            name="Organic"
          />
          <Line 
            type="monotone" 
            dataKey="paid" 
            stroke="#82ca9d" 
            strokeWidth={2}
            name="Paid"
          />
          <Line 
            type="monotone" 
            dataKey="social" 
            stroke="#ffc658" 
            strokeWidth={2}
            name="Social"
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)