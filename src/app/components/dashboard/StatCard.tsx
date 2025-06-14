import React from 'react'
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material'

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  color: string
  trend?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
}) => (
  <Card 
    className="h-full shadow-sm hover:shadow-lg transition-all duration-300" 
    sx={{ 
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}
  >
    <CardContent sx={{ padding: '20px' }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Typography 
            color="textSecondary" 
            variant="body2" 
            className="mb-1"
            sx={{ fontSize: '0.75rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h5" 
            className="font-bold mb-1"
            sx={{ fontSize: '1.5rem', fontFamily: 'Inter, sans-serif' }}
          >
            {value}
          </Typography>
          {trend && (
            <Typography 
              variant="caption" 
              className="text-green-400"
              sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
            >
              {trend}
            </Typography>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} shadow-lg`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
)