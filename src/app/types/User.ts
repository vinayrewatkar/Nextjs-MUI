export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Suspended';

export interface User {
  id: number
  name: string
  email: string
  status: UserStatus
  avatar: string
  role: string
  department: string
  joinDate: string
  lastActive: string
  phone?: string
  permissions: string[]
}

export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}