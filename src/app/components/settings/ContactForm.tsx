import React, { useState } from 'react'
import {
  Typography,
  Button,
  TextField,
  Avatar,
  Badge,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Person, Language, PhotoCamera } from '@mui/icons-material'
import { SettingsCard } from './SettingsCard'
import useAuth from '../../hooks/UseAuth' // Adjust import path as needed

interface ContactFormData {
  fullName: string
  email: string
  phone: string
  company: string
}

export const ContactForm = () => {
  const { user, isAdmin, canSaveContacts } = useAuth()
  
  const [contactData, setContactData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  })

  // Handle form submission
  const handleSaveContact = async () => {
    // Validate required fields
    if (!contactData.fullName.trim() || !contactData.email.trim()) {
      setSnackbar({
        open: true,
        message: 'Full Name and Email are required',
        severity: 'error'
      })
      return
    }

    setLoading(true)
    
    try {
      const token = localStorage.getItem('jwt')
      if (!token) {
        setSnackbar({
          open: true,
          message: 'Authentication required',
          severity: 'error'
        })
        return
      }

      const response = await fetch('http://localhost:8080/api/contact/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSnackbar({
          open: true,
          message: 'Contact saved successfully!',
          severity: 'success'
        })
        // Reset form
        setContactData({
          fullName: '',
          email: '',
          phone: '',
          company: ''
        })
      } else if (response.status === 403) {
        setSnackbar({
          open: true,
          message: 'Access denied. Only admins can save contacts.',
          severity: 'error'
        })
      } else {
        setSnackbar({
          open: true,
          message: data.message || 'Failed to save contact',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error saving contact:', error)
      setSnackbar({
        open: true,
        message: 'Network error. Please try again.',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setContactData({
      fullName: '',
      email: '',
      phone: '',
      company: ''
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <>
      <Grid container spacing={3}>
        {/* Contact Form */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <SettingsCard title="Contact Information" icon={<Person />}>
            <div className="space-y-4">
              {/* Role-based access warning */}
              {!canSaveContacts() && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Only administrators can save contact information. 
                  Current role: {user?.role?.replace('ROLE_', '') || 'Unknown'}
                </Alert>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton 
                      size="small" 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        width: 24,
                        height: 24,
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    >
                      <PhotoCamera sx={{ fontSize: '0.8rem' }} />
                    </IconButton>
                  }
                >
                  <Avatar 
                    sx={{ width: 80, height: 80, fontSize: '1.5rem' }}
                    src="/api/placeholder/80/80"
                  >
                    {contactData.fullName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </Avatar>
                </Badge>
                <div>
                  <Typography 
                    variant="h6"
                    sx={{ fontSize: '1.1rem', fontFamily: 'Inter, sans-serif' }}
                  >
                    {contactData.fullName || 'New Contact'}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="textSecondary"
                    sx={{ fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}
                  >
                    {contactData.company || 'Company not specified'}
                  </Typography>
                </div>
              </div>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name *"
                    value={contactData.fullName}
                    onChange={(e) => setContactData({...contactData, fullName: e.target.value})}
                    size="small"
                    required
                    sx={{ 
                      '& .MuiInputBase-input': { 
                        fontSize: '0.85rem',
                        fontFamily: 'Inter, sans-serif'
                      },
                      '& .MuiInputLabel-root': { 
                        fontSize: '0.8rem',
                        fontFamily: 'Inter, sans-serif'
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email *"
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                    size="small"
                    required
                    sx={{ 
                      '& .MuiInputBase-input': { 
                        fontSize: '0.85rem',
                        fontFamily: 'Inter, sans-serif'
                      },
                      '& .MuiInputLabel-root': { 
                        fontSize: '0.8rem',
                        fontFamily: 'Inter, sans-serif'
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={contactData.phone}
                    onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                    size="small"
                    sx={{ 
                      '& .MuiInputBase-input': { 
                        fontSize: '0.85rem',
                        fontFamily: 'Inter, sans-serif'
                      },
                      '& .MuiInputLabel-root': { 
                        fontSize: '0.8rem',
                        fontFamily: 'Inter, sans-serif'
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={contactData.company}
                    onChange={(e) => setContactData({...contactData, company: e.target.value})}
                    size="small"
                    sx={{ 
                      '& .MuiInputBase-input': { 
                        fontSize: '0.85rem',
                        fontFamily: 'Inter, sans-serif'
                      },
                      '& .MuiInputLabel-root': { 
                        fontSize: '0.8rem',
                        fontFamily: 'Inter, sans-serif'
                      }
                    }}
                  />
                </Grid>
              </Grid>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={handleSaveContact}
                  disabled={loading || !canSaveContacts()}
                  sx={{ 
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'none'
                  }}
                >
                  {loading ? <CircularProgress size={16} /> : 'Save Contact'}
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={handleCancel}
                  disabled={loading}
                  sx={{ 
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'none'
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </SettingsCard>
        </Grid>

        {/* User Info Display */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <SettingsCard title="User Information" icon={<Language />}>
            <div className="space-y-3">
              <div>
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                  Username
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '0.85rem' }}>
                  {user?.username || 'Not logged in'}
                </Typography>
              </div>
              
              <div>
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                  Role
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '0.85rem' }}>
                  {user?.role?.replace('ROLE_', '') || 'Unknown'}
                </Typography>
              </div>
              
              <div>
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                  Permissions
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '0.85rem' }}>
                  {isAdmin() ? 'Full Access' : 'Limited Access'}
                </Typography>
              </div>
              
              {!canSaveContacts() && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Contact saving is restricted to administrators only.
                </Alert>
              )}
            </div>
          </SettingsCard>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}