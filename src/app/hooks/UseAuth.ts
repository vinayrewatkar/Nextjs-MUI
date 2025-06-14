// app/hooks/useAuth.ts
'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export interface User {
  username: string
  role: string
  roles: string[]
  isAdmin: boolean
  isDeveloper: boolean
  fullName?: string
  email?: string
  phone?: string
  company?: string
}

/**
 * Decode a JWT payload without any library.
 * Returns the payload as an object, or null if invalid.
 * NOTE: We only use this to check token validity and get username,
 * NOT for role verification (roles come from backend)
 */
function decodeJwtPayload(token: string): { sub: string; exp: number } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const payloadBase64 = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    const decodedJson = decodeURIComponent(
      atob(payloadBase64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    const payload = JSON.parse(decodedJson)
    return payload
  } catch {
    return null
  }
}

export default function useAuth() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user info from backend
  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUser(data.user)
        } else {
          // Backend returned success: false
          localStorage.removeItem('jwt')
          setUser(null)
        }
      } else if (response.status === 401 || response.status === 403) {
        // Unauthorized - token is invalid
        localStorage.removeItem('jwt')
        setUser(null)
      } else {
        // Other server error
        console.error('Error fetching user info:', response.status)
        setUser(null)
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
      // On network error, still try to use token if it's valid
      const payload = decodeJwtPayload(token)
      if (payload && payload.exp > Math.floor(Date.now() / 1000)) {
        // Token is still valid, set minimal user info
        setUser({
          username: payload.sub,
          role: 'ROLE_DEVELOPER', // Default role when backend is unreachable
          roles: ['ROLE_DEVELOPER'],
          isAdmin: false,
          isDeveloper: true
        })
      } else {
        localStorage.removeItem('jwt')
        setUser(null)
      }
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      // Ensure code runs client-side
      const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null

      // If no token, user is not authenticated
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      // Quick token validation before making API call
      const payload = decodeJwtPayload(token)
      if (!payload) {
        // Invalid token format
        localStorage.removeItem('jwt')
        setUser(null)
        setLoading(false)
        return
      }

      const { exp } = payload
      const nowSec = Math.floor(Date.now() / 1000)

      if (exp < nowSec) {
        // Token expired
        localStorage.removeItem('jwt')
        setUser(null)
        setLoading(false)
        return
      }

      // Token is valid, fetch user info from backend
      await fetchUserInfo(token)
      setLoading(false)
    }

    initAuth()
  }, [pathname])

  const logout = () => {
    localStorage.removeItem('jwt')
    setUser(null)
    // Don't redirect here, let the modal handle it
  }

  // Helper functions for role checking (now uses backend-verified roles)
  const isAdmin = () => user?.isAdmin === true
  const isDeveloper = () => user?.isDeveloper === true
  const hasRole = (requiredRole: string) => user?.role === requiredRole
  const hasAnyRole = (roles: string[]) => {
    if (!user || !user.roles) return false
    return roles.some(role => user.roles.includes(role))
  }

  // Helper function to check if user can save contacts
  const canSaveContacts = () => isAdmin()

  return {
    user,
    loading,
    logout,
    isAdmin,
    isDeveloper,
    hasRole,
    hasAnyRole,
    canSaveContacts,
    // Re-fetch user info (useful after role changes)
    refreshUser: () => {
      const token = localStorage.getItem('jwt')
      if (token) {
        fetchUserInfo(token)
      }
    }
  }
}