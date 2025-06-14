import React from 'react'
import { 
  Typography, 
  Card, 
  CardContent,
  Box,
} from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const pieData = [
  { name: 'Organic', value: 45, color: '#8884d8' },
  { name: 'Paid', value: 30, color: '#82ca9d' },
  { name: 'Social', value: 15, color: '#ffc658' },
  { name: 'Direct', value: 10, color: '#ff7c7c' }
]

export const TrafficDistributionChart: React.FC = () => (
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
        Traffic Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
      <Box sx={{ mt: 2 }}>
        {pieData.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                bgcolor: item.color, 
                borderRadius: '50%',
                mr: 1 
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ color: 'grey.300', fontSize: '0.8rem' }}
            >
              {item.name}: {item.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
)