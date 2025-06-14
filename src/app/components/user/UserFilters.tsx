import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';

interface UserFiltersProps {
  searchQuery: string
  statusFilter: string
  roleFilter: string
  viewMode: 'table' | 'cards'
  setSearchQuery: (value: string) => void
  setStatusFilter: (value: string) => void
  setRoleFilter: (value: string) => void
  setViewMode: (mode: 'table' | 'cards') => void
}

export const UserFilters = ({
  searchQuery,
  statusFilter,
  roleFilter,
  viewMode,
  setSearchQuery,
  setStatusFilter,
  setRoleFilter,
  setViewMode
}: UserFiltersProps) => (
  <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
    <Box display="flex" flexWrap="wrap" gap={2}>
      <TextField
        size="small"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ color: 'gray', mr: 1, fontSize: '1rem' }} />,
        }}
        sx={{ 
          minWidth: 250,
          '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.8rem' }
        }}
      />
      
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel sx={{ fontSize: '0.8rem' }}>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) => setStatusFilter(e.target.value as string)}
          sx={{ fontSize: '0.8rem' }}
        >
          <MenuItem value="All" sx={{ fontSize: '0.8rem' }}>All Status</MenuItem>
          <MenuItem value="Active" sx={{ fontSize: '0.8rem' }}>Active</MenuItem>
          <MenuItem value="Inactive" sx={{ fontSize: '0.8rem' }}>Inactive</MenuItem>
          <MenuItem value="Pending" sx={{ fontSize: '0.8rem' }}>Pending</MenuItem>
          <MenuItem value="Suspended" sx={{ fontSize: '0.8rem' }}>Suspended</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel sx={{ fontSize: '0.8rem' }}>Role</InputLabel>
        <Select
          value={roleFilter}
          label="Role"
          onChange={(e) => setRoleFilter(e.target.value as string)}
          sx={{ fontSize: '0.8rem' }}
        >
          <MenuItem value="All" sx={{ fontSize: '0.8rem' }}>All Roles</MenuItem>
          <MenuItem value="Admin" sx={{ fontSize: '0.8rem' }}>Admin</MenuItem>
          <MenuItem value="Manager" sx={{ fontSize: '0.8rem' }}>Manager</MenuItem>
          <MenuItem value="Developer" sx={{ fontSize: '0.8rem' }}>Developer</MenuItem>
          <MenuItem value="Designer" sx={{ fontSize: '0.8rem' }}>Designer</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box display="flex" alignItems="center" gap={1}>
      <Tabs 
        value={viewMode === 'table' ? 0 : 1}
        onChange={(e, v) => setViewMode(v === 0 ? 'table' : 'cards')}
        sx={{ minHeight: 32 }}
      >
        <Tab 
          label="Table" 
          sx={{ fontSize: '0.7rem', minHeight: 32, textTransform: 'none' }} 
        />
        <Tab 
          label="Cards" 
          sx={{ fontSize: '0.7rem', minHeight: 32, textTransform: 'none' }} 
        />
      </Tabs>
      <IconButton size="small">
        <Refresh sx={{ fontSize: '1rem' }} />
      </IconButton>
    </Box>
  </Box>
);