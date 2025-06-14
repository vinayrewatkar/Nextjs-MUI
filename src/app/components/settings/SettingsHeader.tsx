import React from 'react'
import { Typography, Chip } from '@mui/material'

export const SettingsHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <Typography 
          variant="h4" 
          className="font-bold text-gray-50 mb-1"
          sx={{ fontSize: '1.75rem', fontFamily: 'Inter, sans-serif' }}
        >
          Settings
        </Typography>
        <Typography 
          variant="body2" 
          className="text-gray-300"
          sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}
        >
          Manage your account settings and preferences
        </Typography>
      </div>
      <Chip 
        label="Premium Account" 
        color="primary" 
        size="small"
        sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
      />
    </div>
  )
}