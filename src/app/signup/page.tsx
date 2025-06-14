// app/signup/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Alert,
  Fade,
  Link,
  Avatar,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  PersonAdd,
} from '@mui/icons-material'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'DEVELOPER', // default role
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess('Account created successfully! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        const text = await res.text()
        setError(text || 'Signup failed. Username might already exist.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={24}
          sx={{
            borderRadius: 4,
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <CardContent sx={{ p: 6 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                }}
              >
                <PersonAdd fontSize="large" />
              </Avatar>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold', color: 'text.primary' }}
              >
                Create Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Join us today and get started
              </Typography>
            </Box>

            {/* Success Alert */}
            {success && (
              <Fade in={!!success}>
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  {success}
                </Alert>
              </Fade>
            )}

            {/* Error Alert */}
            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              </Fade>
            )}

            {/* Signup Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                name="username"
                label="Username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />

              {/* Role Selector */}
              <FormControl
                fullWidth
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              >
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={formData.role}
                  label="Role"
                  onChange={handleChange}
                  disabled={loading}
                >
                  <MenuItem value="DEVELOPER">Developer</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.8,
                  mb: 3,
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0e8679 0%, #32d66a 100%)',
                  },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 25px rgba(17, 153, 142, 0.3)',
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    Creating Account...
                  </Box>
                ) : (
                  'Create Account'
                )}
              </Button>

              {/* Login Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
