// app/components/DashboardLayout.tsx
'use client'

import React, { useEffect, useState, useMemo } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Avatar,
  Button,
  Modal,
  Backdrop,
  Chip,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Notifications,
  Block as BlockIcon,
  BusinessCenter as CompanyIcon,
} from '@mui/icons-material'
import { useRouter, usePathname } from 'next/navigation'
import useAuth from '../../hooks/UseAuth'
import AuthModal from '../auth/AuthModal'

const drawerWidth = 260

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface MenuItem {
  text: string
  icon: React.ReactNode
  path: string
  roles: string[] // Required roles to access this menu item
}

const menuItems: MenuItem[] = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/', 
    roles: ['ROLE_ADMIN', 'ROLE_DEVELOPER'] 
  },
  { 
    text: 'Analytics', 
    icon: <AnalyticsIcon />, 
    path: '/analytics', 
    roles: ['ROLE_ADMIN', 'ROLE_DEVELOPER'] 
  },
  { 
    text: 'Company', 
    icon: <CompanyIcon />, 
    path: '/company', 
    roles: ['ROLE_ADMIN', 'ROLE_DEVELOPER'] 
  },
  { 
    text: 'Users', 
    icon: <PeopleIcon />, 
    path: '/users', 
    roles: ['ROLE_ADMIN'] // Only admin can access
  },
  { 
    text: 'Settings', 
    icon: <SettingsIcon />, 
    path: '/settings', 
    roles: ['ROLE_ADMIN','ROLE_DEVELOPER'] 
  },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading, logout, hasAnyRole } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true)
    } else {
      setShowAuthModal(false)
    }
  }, [user, loading])

  // Check if user has access to current route
  useEffect(() => {
    if (!loading && user) {
      const currentMenuItem = menuItems.find(item => item.path === pathname)
      if (currentMenuItem && !hasAnyRole(currentMenuItem.roles)) {
        // User doesn't have access to current page, redirect to dashboard
        router.push('/')
      }
    }
  }, [user, pathname, loading, router, hasAnyRole])

  // Memoize accessible menu items to prevent unnecessary re-filtering
  const accessibleMenuItems = useMemo(() => {
    if (!user || loading) return []
    return menuItems.filter(item => hasAnyRole(item.roles))
  }, [user, loading, hasAnyRole])

  // Memoize restricted menu items
  const restrictedMenuItems = useMemo(() => {
    if (!user || loading || user.role !== 'ROLE_DEVELOPER') return []
    return menuItems.filter(item => !hasAnyRole(item.roles))
  }, [user, loading, hasAnyRole])

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  const username = user?.username || ''
  const userRole = user?.role || ''
  const firstLetter = username.charAt(0).toUpperCase() || 'U'

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const getCurrentPageTitle = () => {
    return menuItems.find((item) => item.path === pathname)?.text || 'Dashboard'
  }

  const isCurrentPath = (path: string) => pathname === path

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin'
      case 'ROLE_DEVELOPER':
        return 'Developer'
      default:
        return 'User'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'error'
      case 'ROLE_DEVELOPER':
        return 'primary'
      default:
        return 'default'
    }
  }

  const drawer = (
    <div>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {username}
          </Typography>
          <Chip 
            label={getRoleDisplayName(userRole)}
            size="small"
            color={getRoleColor(userRole) as any}
            variant="outlined"
          />
        </Box>
      </Box>

      <List>
        {accessibleMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => router.push(item.path)}
              selected={isCurrentPath(item.path)}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: (theme) => theme.palette.action.selected,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isCurrentPath(item.path)
                    ? 'primary.main'
                    : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: isCurrentPath(item.path)
                    ? 'primary.main'
                    : 'text.primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* Show restricted items (grayed out) for developers */}
        {restrictedMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              disabled
              sx={{
                borderRadius: 1,
                mb: 1,
              }}
            >
              <ListItemIcon sx={{ color: 'text.disabled' }}>
                <BlockIcon />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ color: 'text.disabled' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      {/* Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: 'text.primary', display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary' }}>
            {getCurrentPageTitle()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: 'text.secondary' }}>
              <Notifications />
            </IconButton>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
              {firstLetter}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
              <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                {username}
              </Typography>
              <Chip 
                label={getRoleDisplayName(userRole)}
                size="small"
                color={getRoleColor(userRole) as any}
                sx={{ height: 16, fontSize: '0.65rem' }}
              />
            </Box>
            <Button onClick={logout} sx={{ ml: 2 }} color="primary">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          filter: showAuthModal ? 'blur(4px)' : 'none',
          transition: 'filter 0.3s ease',
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>

      {/* Auth Modal */}
      <Modal
        open={showAuthModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
            },
          },
        }}
      >
        <Box>
          <AuthModal onClose={() => setShowAuthModal(false)} />
        </Box>
      </Modal>
    </Box>
  )
}