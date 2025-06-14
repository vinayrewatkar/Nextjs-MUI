import React from 'react'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'

interface SettingsCardProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

export const SettingsCard = ({ title, icon, children }: SettingsCardProps) => (
  <Card 
    sx={{ 
      borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
      height: 'fit-content'
    }}
  >
    <CardHeader
      avatar={
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
          {React.cloneElement(icon as React.ReactElement, { 
            className: "text-white", 
            sx: { fontSize: '1.2rem' } 
          })}
        </div>
      }
      title={
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1rem', 
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600 
          }}
        >
          {title}
        </Typography>
      }
      sx={{ pb: 1 }}
    />
    <CardContent sx={{ pt: 0 }}>
      {children}
    </CardContent>
  </Card>
)