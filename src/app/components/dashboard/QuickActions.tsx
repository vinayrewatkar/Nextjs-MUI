import React from 'react'
import {
  Button,
} from '@mui/material'
import {
  Timeline,
  People,
  Notifications,
  AccountCircle,
} from '@mui/icons-material'
import { ChartCard } from './ChartCard'

export const QuickActions: React.FC = () => (
  <ChartCard title="Quick Actions">
    <div className="space-y-3">
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Timeline sx={{ fontSize: '1rem' }} />}
        sx={{ 
          justifyContent: 'flex-start',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none',
          padding: '12px 16px'
        }}
      >
        Generate Report
      </Button>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<People sx={{ fontSize: '1rem' }} />}
        sx={{ 
          justifyContent: 'flex-start',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none',
          padding: '12px 16px'
        }}
      >
        Manage Users
      </Button>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Notifications sx={{ fontSize: '1rem' }} />}
        sx={{ 
          justifyContent: 'flex-start',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none',
          padding: '12px 16px'
        }}
      >
        Send Notifications
      </Button>
      <Button
        fullWidth
        variant="contained"
        startIcon={<AccountCircle sx={{ fontSize: '1rem' }} />}
        sx={{ 
          justifyContent: 'flex-start',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none',
          padding: '12px 16px'
        }}
      >
        View Profile
      </Button>
    </div>
  </ChartCard>
)