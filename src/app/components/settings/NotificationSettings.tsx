import React, { useState } from 'react'
import {
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Notifications, Info } from '@mui/icons-material'
import { SettingsCard } from './SettingsCard'

export const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    desktop: true,
    marketing: false
  })

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <SettingsCard title="Notification Preferences" icon={<Notifications />}>
          <div className="space-y-3">
            <FormControlLabel
              control={
                <Switch 
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Email Notifications
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Push Notifications
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  SMS Notifications
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={notifications.desktop}
                  onChange={(e) => setNotifications({...notifications, desktop: e.target.checked})}
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Desktop Notifications
                </Typography>
              }
            />
            <Divider sx={{ my: 2 }} />
            <FormControlLabel
              control={
                <Switch 
                  checked={notifications.marketing}
                  onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Marketing Communications
                </Typography>
              }
            />
          </div>
        </SettingsCard>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <SettingsCard title="Notification Schedule" icon={<Info />}>
          <Alert 
            severity="info" 
            sx={{ 
              fontSize: '0.75rem',
              fontFamily: 'Inter, sans-serif',
              mb: 2
            }}
          >
            Configure when you want to receive notifications
          </Alert>
          <div className="space-y-3">
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                Quiet Hours Start
              </InputLabel>
              <Select
                defaultValue="22:00"
                label="Quiet Hours Start"
                sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}
              >
                <MenuItem value="20:00" sx={{ fontSize: '0.8rem' }}>8:00 PM</MenuItem>
                <MenuItem value="21:00" sx={{ fontSize: '0.8rem' }}>9:00 PM</MenuItem>
                <MenuItem value="22:00" sx={{ fontSize: '0.8rem' }}>10:00 PM</MenuItem>
                <MenuItem value="23:00" sx={{ fontSize: '0.8rem' }}>11:00 PM</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                Quiet Hours End
              </InputLabel>
              <Select
                defaultValue="07:00"
                label="Quiet Hours End"
                sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}
              >
                <MenuItem value="06:00" sx={{ fontSize: '0.8rem' }}>6:00 AM</MenuItem>
                <MenuItem value="07:00" sx={{ fontSize: '0.8rem' }}>7:00 AM</MenuItem>
                <MenuItem value="08:00" sx={{ fontSize: '0.8rem' }}>8:00 AM</MenuItem>
                <MenuItem value="09:00" sx={{ fontSize: '0.8rem' }}>9:00 AM</MenuItem>
              </Select>
            </FormControl>
          </div>
        </SettingsCard>
      </Grid>
    </Grid>
  )
}