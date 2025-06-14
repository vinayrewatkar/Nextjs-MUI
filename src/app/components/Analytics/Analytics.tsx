'use client'

import React, { useState } from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'

// Import components
import { AnalyticsHeader } from './AnalyticsHeader'
import { KeyMetrics } from './KeyMetrics'
import { TrafficSourcesChart } from './TrafficSourcesChart'
import { TrafficDistributionChart } from './TrafficDistributionChart'
import { ConversionFunnelChart } from './ConversionFunnelChart'
import { PerformanceMetricsChart } from './PerformanceMetricsChart'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30')
  const [metric, setMetric] = useState('sessions')

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.950', minHeight: '100vh' }}>
      {/* Header Section */}
      <AnalyticsHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        metric={metric}
        setMetric={setMetric}
      />

      {/* Key Metrics */}
      <KeyMetrics />

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Traffic Sources Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <TrafficSourcesChart />
        </Grid>

        {/* Traffic Distribution Pie Chart */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <TrafficDistributionChart />
        </Grid>

        {/* Conversion Funnel */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <ConversionFunnelChart />
        </Grid>

        {/* Performance Metrics */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <PerformanceMetricsChart />
        </Grid>
      </Grid>
    </Box>
  )
}