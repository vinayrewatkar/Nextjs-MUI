// app/components/AuthModal.tsx
'use client'

import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  IconButton,
  InputAdornment,
  Alert,
  Avatar,
  Fade,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Lock as LockIcon,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'

interface AuthModalProps {
  onClose: () => void
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const theme = useTheme()
  const router = useRouter()
  const [tabValue, setTabValue] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [signupData, setSignupData] = useState({ 
    username: '', 
    password: '', 
    confirmPassword: '',
    role: 'DEVELOPER' // Default role
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setError('')
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleRoleChange = (e: SelectChangeEvent) => {
    setSignupData({ ...signupData, role: e.target.value })
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      })

      if (res.ok) {
        const { token } = await res.json()
        localStorage.setItem('jwt', token)
        onClose()
        router.refresh()
      } else {
        const errorData = await res.json()
        setError(errorData.message || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: signupData.username,
          password: signupData.password,
          role: signupData.role, // Include role in registration
        }),
      })

      if (res.ok) {
        setTabValue(0) // Switch to login tab
        setError('')
        setSignupData({ username: '', password: '', confirmPassword: '', role: 'DEVELOPER' })
        // Show success message
        setTimeout(() => {
          setError('')
        }, 3000)
      } else {
        const errorData = await res.json()
        setError(errorData.message || 'Signup failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 480 },
          maxWidth: 480,
          outline: 'none',
        }}
      >
        <Card
          elevation={24}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            border: `1px solid ${
              theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.05)'
            }`,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              p: 3,
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 56,
                height: 56,
                mx: 'auto',
                mb: 2,
              }}
            >
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              Welcome
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
              Please sign in to continue to your dashboard
            </Typography>
          </Box>

          <CardContent sx={{ p: 0 }}>
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    py: 2,
                    fontWeight: 600,
                  },
                }}
              >
                <Tab
                  icon={<LoginIcon />}
                  iconPosition="start"
                  label="Sign In"
                  id="auth-tab-0"
                  aria-controls="auth-tabpanel-0"
                />
                <Tab
                  icon={<PersonAddIcon />}
                  iconPosition="start"
                  label="Sign Up"
                  id="auth-tab-1"
                  aria-controls="auth-tabpanel-1"
                />
              </Tabs>
            </Box>

            {/* Error Alert */}
            {error && (
              <Box sx={{ p: 3, pb: 0 }}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              </Box>
            )}

            {/* Login Form */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
                <form onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    variant="outlined"
                    sx={{ mb: 3 }}
                    required
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={handleLoginChange}
                    variant="outlined"
                    sx={{ mb: 4 }}
                    required
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      },
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </Box>
            </TabPanel>

            {/* Signup Form */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                <form onSubmit={handleSignup}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    variant="outlined"
                    sx={{ mb: 3 }}
                    required
                    disabled={loading}
                  />
                  
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      value={signupData.role}
                      label="Role"
                      onChange={handleRoleChange}
                      disabled={loading}
                    >
                      <MenuItem value="DEVELOPER">Developer</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={signupData.password}
                    onChange={handleSignupChange}
                    variant="outlined"
                    sx={{ mb: 3 }}
                    required
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    variant="outlined"
                    sx={{ mb: 4 }}
                    required
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
                      },
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </Box>
            </TabPanel>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  )
}