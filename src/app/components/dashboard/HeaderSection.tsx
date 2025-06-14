import React from 'react'
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  Search,
  FilterList,
} from '@mui/icons-material'

interface HeaderSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  timeRange: string
  setTimeRange: (range: string) => void
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  searchQuery,
  setSearchQuery,
  timeRange,
  setTimeRange,
}) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div>
      <Typography 
        variant="h4" 
        className="font-bold text-gray-50 mb-1"
        sx={{ fontSize: '1.75rem', fontFamily: 'Inter, sans-serif' }}
      >
        Dashboard Overview
      </Typography>
      <Typography 
        variant="body2" 
        className="text-gray-300"
        sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}
      >
        Monitor your business performance and key metrics
      </Typography>
    </div>
    
    {/* Control Panel */}
    <div className="flex flex-wrap gap-3">
      <TextField
        size="small"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ color: 'gray', mr: 1, fontSize: '1rem' }} />,
        }}
        sx={{ 
          minWidth: '200px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontFamily: 'Inter, sans-serif'
          }
        }}
      />
      <FormControl size="small" sx={{ minWidth: '120px' }}>
        <InputLabel sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
          Time Range
        </InputLabel>
        <Select
          value={timeRange}
          label="Time Range"
          onChange={(e) => setTimeRange(e.target.value)}
          sx={{ 
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          <MenuItem value="1d" sx={{ fontSize: '0.8rem' }}>Last 24h</MenuItem>
          <MenuItem value="7d" sx={{ fontSize: '0.8rem' }}>Last 7 days</MenuItem>
          <MenuItem value="30d" sx={{ fontSize: '0.8rem' }}>Last 30 days</MenuItem>
          <MenuItem value="90d" sx={{ fontSize: '0.8rem' }}>Last 90 days</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        startIcon={<FilterList sx={{ fontSize: '1rem' }} />}
        sx={{ 
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none'
        }}
      >
        Filter
      </Button>
    </div>
  </div>
)