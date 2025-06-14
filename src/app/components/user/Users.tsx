'use client'

import React, { useState } from 'react';
import { 
  Typography,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Box,
  Toolbar,
  alpha,
  Pagination,
  Grid
} from '@mui/material';
import { 
  Upload, 
  Download, 
  Add, 
  Email, 
  Block, 
  Delete 
} from '@mui/icons-material';

// Components
import { UserCard } from './UserCard';
import { UserStats } from './UserStats';
import { ContactTable } from './UserTable';
import { UserFilters } from './UserFilters';
import { UserMenu } from './UserMenu';

// Types
interface Contact {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  company: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// TabPanel component (moved here since it's only used in this file)
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`users-tabpanel-${index}`}
      aria-labelledby={`users-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function Users() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, contact: Contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContact(null);
  };

  const handleSelectContact = (contactId: number) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    // This will be handled by the ContactTable component internally
    // since it fetches its own data
    setSelectedContacts([]);
  };

  return (
    <Box p={2} display="flex" flexDirection="column" gap={3}>
      {/* Header */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
        <Box>
          <Typography 
            variant="h4" 
            mb={1}
            sx={{ fontSize: '1.75rem', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            Contact Management
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary"
            sx={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}
          >
            Manage contacts, companies, and information
          </Typography>
        </Box>
        
        <Box display="flex" flexWrap="wrap" gap={1}>
          <Button
            variant="outlined"
            startIcon={<Upload sx={{ fontSize: '1rem' }} />}
            size="small"
            sx={{ 
              borderRadius: '8px',
              fontSize: '0.8rem',
              textTransform: 'none'
            }}
          >
            Import
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download sx={{ fontSize: '1rem' }} />}
            size="small"
            sx={{ 
              borderRadius: '8px',
              fontSize: '0.8rem',
              textTransform: 'none'
            }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Add sx={{ fontSize: '1rem' }} />}
            size="small"
            sx={{ 
              borderRadius: '8px',
              fontSize: '0.8rem',
              textTransform: 'none'
            }}
          >
            Add Contact
          </Button>
        </Box>
      </Box>

      {/* Stats Cards - You can update UserStats to work with contacts or create ContactStats */}
      {/* <UserStats users={[]} /> */}

      {/* Main Content */}
      <Paper 
        sx={{ 
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Filters and Controls - You can update UserFilters for contacts or simplify */}
        <Box p={2} borderBottom="1px solid rgba(255,255,255,0.1)">
          {/* You can add contact-specific filters here */}
          <Box display="flex" gap={2} alignItems="center">
            <Typography variant="body2" color="textSecondary">
              View: Table Mode
            </Typography>
          </Box>

          {/* Bulk Actions */}
          {selectedContacts.length > 0 && (
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                borderRadius: '8px',
                mt: 2
              }}
            >
              <Typography
                sx={{ flex: '1 1 100%', fontSize: '0.8rem' }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {selectedContacts.length} selected
              </Typography>
              <Button size="small" startIcon={<Email />} sx={{ mr: 1, fontSize: '0.7rem' }}>
                Email
              </Button>
              <Button size="small" startIcon={<Block />} sx={{ mr: 1, fontSize: '0.7rem' }}>
                Block
              </Button>
              <Button size="small" startIcon={<Delete />} color="error" sx={{ fontSize: '0.7rem' }}>
                Delete
              </Button>
            </Toolbar>
          )}
        </Box>

        {/* Content */}
        <Box p={2}>
          <ContactTable 
            selectedContacts={selectedContacts}
            handleSelectContact={handleSelectContact}
            handleSelectAll={handleSelectAll}
            onMenuClick={handleMenuClick}
          />
        </Box>
      </Paper>

      {/* Action Menu - You can update UserMenu to work with contacts */}
      {selectedContact && (
        <UserMenu 
          anchorEl={anchorEl}
          selectedUser={selectedContact as any} // Temporary type casting
          onClose={handleMenuClose}
        />
      )}
    </Box>
  );
}