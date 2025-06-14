import React, { useState } from 'react'
import {
  Typography,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  Security,
  Smartphone,
  Computer,
  Delete,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { SettingsCard } from './SettingsCard'

export const SecuritySettings = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [preferences, setPreferences] = useState({
    twoFactor: true
  })

  const connectedDevices = [
    { name: 'iPhone 14 Pro', type: 'mobile', lastActive: '2 hours ago', location: 'New York' },
    { name: 'MacBook Pro', type: 'desktop', lastActive: 'Active now', location: 'New York' },
    { name: 'iPad Air', type: 'tablet', lastActive: '1 day ago', location: 'Boston' },
  ]

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <SettingsCard title="Security Settings" icon={<Security />}>
          <div className="space-y-4">
            <FormControlLabel
              control={
                <Switch 
                  checked={preferences.twoFactor}
                  onChange={(e) => setPreferences({...preferences, twoFactor: e.target.checked})}
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                  Two-Factor Authentication
                </Typography>
              }
            />
            
            <div className="space-y-2">
              <Typography 
                variant="body2"
                sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}
              >
                Change Password
              </Typography>
              <TextField
                fullWidth
                size="small"
                type={showPassword ? 'text' : 'password'}
                label="Current Password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, sans-serif'
                  }
                }}
              />
              <TextField
                fullWidth
                size="small"
                type="password"
                label="New Password"
                sx={{ 
                  '& .MuiInputBase-input': { 
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, sans-serif'
                  }
                }}
              />
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'none'
                }}
              >
                Update Password
              </Button>
            </div>
          </div>
        </SettingsCard>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <SettingsCard title="Connected Devices" icon={<Smartphone />}>
          <List sx={{ padding: 0 }}>
            {connectedDevices.map((device, index) => (
              <ListItem key={index} sx={{ px: 0, py: 1 }}>
                <ListItemIcon>
                  {device.type === 'mobile' ? <Smartphone /> : <Computer />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                      {device.name}
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}>
                      {device.lastActive} • {device.location}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton size="small" color="error">
                    <Delete sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </SettingsCard>
      </Grid>
    </Grid>
  )
}