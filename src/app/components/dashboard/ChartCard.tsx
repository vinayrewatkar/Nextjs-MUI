import React from 'react'
import {
  Paper,
  Typography,
} from '@mui/material'

interface ChartCardProps {
  title: string
  children: React.ReactNode
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
  <Paper 
    className="p-5 h-full"
    sx={{ 
      borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}
  >
    <Typography 
      variant="h6" 
      className="mb-4 font-semibold"
      sx={{ fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}
    >
      {title}
    </Typography>
    {children}
  </Paper>
)