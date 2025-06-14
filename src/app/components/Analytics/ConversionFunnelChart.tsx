import React from 'react'
import { 
  Typography, 
  Card, 
  CardContent,
} from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const conversionData = [
  { name: 'Landing Page', conversions: 245 },
  { name: 'Product Page', conversions: 189 },
  { name: 'Checkout', conversions: 156 },
  { name: 'Thank You', conversions: 142 }
]

export const ConversionFunnelChart: React.FC = () => (
  <Card sx={{ borderRadius: 2, bgcolor: 'grey.950', height: 350 }}>
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
        Conversion Funnel
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={conversionData} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="#9CA3AF" 
            fontSize={12}
            width={80}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }} 
          />
          <Bar dataKey="conversions" fill="#8884d8" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)