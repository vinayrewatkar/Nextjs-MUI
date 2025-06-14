'use client'
import React, { useState } from 'react'
import {
  Paper,
  Tabs,
  Tab,
  Box,
} from '@mui/material'
import {
  Person,
  Notifications,
  Security,
} from '@mui/icons-material'
import { SettingsHeader } from './SettingsHeader'
import { ContactForm } from './ContactForm'
import { SecuritySettings } from './SecuritySettings'
import { NotificationSettings } from './NotificationSettings'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Settings() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <SettingsHeader />

      {/* Settings Tabs */}
      <Paper 
        sx={{ 
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            px: 2,
            '& .MuiTab-root': {
              fontSize: '0.8rem',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'none',
              minHeight: '48px'
            }
          }}
        >
          <Tab icon={<Person sx={{ fontSize: '1rem' }} />} label="Profile" />
          <Tab icon={<Notifications sx={{ fontSize: '1rem' }} />} label="Notifications" />
          <Tab icon={<Security sx={{ fontSize: '1rem' }} />} label="Security" />
        </Tabs>

        {/* Profile Tab */}
        <TabPanel value={tabValue} index={0}>
          <div className="p-4 space-y-6">
            <ContactForm />
          </div>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={1}>
          <div className="p-4">
            <NotificationSettings />
          </div>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={tabValue} index={2}>
          <div className="p-4 space-y-6">
            <SecuritySettings />
          </div>
        </TabPanel>
      </Paper>
    </div>
  )
}