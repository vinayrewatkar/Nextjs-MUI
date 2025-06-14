'use client'

import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from '@mui/icons-material'

// Import components
import { StatCard } from './StatCard'
import { ChartCard } from './ChartCard'
import { HeaderSection } from './HeaderSection'
import { RevenueChart } from './RevenueSection'
import { RecentActivity } from './RecentActivity'
import { PerformanceMetrics } from './PerformanceMetrics'
import { QuickActions } from './QuickActions'

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    {
      title: 'Total Revenue',
      value: '$42,350',
      icon: <AttachMoney className="text-white" sx={{ fontSize: '1.2rem' }} />,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      trend: '+8.2% from last month'
    },
    {
      title: 'Active Users',
      value: '2,847',
      icon: <People className="text-white" sx={{ fontSize: '1.2rem' }} />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      trend: '+12.5% from last month'
    },
    {
      title: 'Orders',
      value: '1,423',
      icon: <ShoppingCart className="text-white" sx={{ fontSize: '1.2rem' }} />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      trend: '+6.8% from last month'
    },
    {
      title: 'Growth Rate',
      value: '+15.2%',
      icon: <TrendingUp className="text-white" sx={{ fontSize: '1.2rem' }} />,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      trend: '+2.1% from last month'
    },
  ]

  return (
    <div className="space-y-6 p-2">
      {/* Header Section */}
      <HeaderSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Charts and Analytics Section */}
      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RevenueChart />
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <RecentActivity />
        </Grid>
      </Grid>

      {/* Performance Metrics */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PerformanceMetrics />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <QuickActions />
        </Grid>
      </Grid>
    </div>
  )
}