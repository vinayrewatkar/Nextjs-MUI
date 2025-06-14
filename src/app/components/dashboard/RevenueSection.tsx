import React from 'react'
import {
  Typography,
  Chip,
} from '@mui/material'
import {
  Assessment,
} from '@mui/icons-material'
import { ChartCard } from './ChartCard'

export const RevenueChart: React.FC = () => (
  <ChartCard title="Revenue Analytics">
    <div className="h-80 flex flex-col">
      <div className="mb-4">
        <div className="flex gap-2 mb-3">
          <Chip 
            label="Revenue" 
            color="primary" 
            size="small"
            sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
          />
          <Chip 
            label="Profit" 
            variant="outlined" 
            size="small"
            sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
          />
          <Chip 
            label="Expenses" 
            variant="outlined" 
            size="small"
            sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
        <div className="text-center">
          <Assessment sx={{ fontSize: '3rem', color: 'gray', mb: 2 }} />
          <Typography 
            color="textSecondary"
            sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}
          >
            Interactive Chart Component
          </Typography>
          <Typography 
            variant="caption" 
            color="textSecondary"
            sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
          >
            Revenue trending up 12% this quarter
          </Typography>
        </div>
      </div>
    </div>
  </ChartCard>
)