import React from 'react'
import { 
  Typography, 
  Card, 
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material'
import Grid from '@mui/material/Grid'

interface AnalyticsHeaderProps {
  timeRange: string
  setTimeRange: (value: string) => void
  metric: string
  setMetric: (value: string) => void
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  timeRange,
  setTimeRange,
  metric,
  setMetric
}) => (
  <>
    <Typography 
      variant="h5" 
      sx={{ 
        fontWeight: 600, 
        color: 'grey.50',
        fontFamily: '"Inter", "Roboto", sans-serif',
        mb: 3,
        fontSize: '1.5rem'
      }}
    >
      Analytics Dashboard
    </Typography>

    {/* Control Panel */}
    <Card sx={{ mb: 3, borderRadius: 2, bgcolor: 'gray.950' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'grey.300', fontSize: '0.875rem' }}>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
                sx={{ 
                  color: 'grey.100',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.600' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.500' }
                }}
              >
                <MenuItem value="7">Last 7 days</MenuItem>
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'grey.300', fontSize: '0.875rem' }}>Metric</InputLabel>
              <Select
                value={metric}
                label="Metric"
                onChange={(e) => setMetric(e.target.value)}
                sx={{ 
                  color: 'grey.100',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.600' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.500' }
                }}
              >
                <MenuItem value="sessions">Sessions</MenuItem>
                <MenuItem value="users">Users</MenuItem>
                <MenuItem value="pageviews">Page Views</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              placeholder="Search metrics..."
              size="small"
              fullWidth
              sx={{
                '& .MuiInputBase-input': { 
                  color: 'grey.100',
                  fontSize: '0.875rem'
                },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.600' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.500' }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Button 
              variant="contained" 
              fullWidth
              size="small"
              sx={{ 
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
                textTransform: 'none'
              }}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>
)