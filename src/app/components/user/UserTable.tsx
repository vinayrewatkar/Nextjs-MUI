import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Avatar, 
  Typography, 
  Checkbox,
  IconButton,
  Tooltip,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { Visibility, Edit, MoreVert, Person } from '@mui/icons-material';
import useAuth from '../../hooks/UseAuth';

interface Contact {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  company: string;
}

interface ContactTableProps {
  selectedContacts?: number[];
  handleSelectContact?: (contactId: number) => void;
  handleSelectAll?: () => void;
  onMenuClick?: (event: React.MouseEvent<HTMLElement>, contact: Contact) => void;
}

export const ContactTable = ({
  selectedContacts = [],
  handleSelectContact = () => {},
  handleSelectAll = () => {},
  onMenuClick = () => {}
}: ContactTableProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, canSaveContacts } = useAuth();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get JWT token from localStorage
      const token = localStorage.getItem('jwt');
      
      if (!token) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }

      // Check if user has permission to view contacts
      if (!canSaveContacts()) {
        setError('You do not have permission to view contacts. Admin access required.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8080/api/contact/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (response.status === 403) {
          setError('Access denied. Admin privileges required.');
        } else {
          setError(`HTTP error! status: ${response.status}`);
        }
        setLoading(false);
        return;
      }

      const result = await response.json();
      
      if (result.success) {
        setContacts(result.data || []);
        setError(null);
      } else {
        setError(result.message || 'Failed to fetch contacts');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch contacts if user is authenticated and has permission
    if (user && canSaveContacts()) {
      fetchContacts();
    } else if (user && !canSaveContacts()) {
      setError('You do not have permission to view contacts. Admin access required.');
      setLoading(false);
    } else {
      setError('Please log in to view contacts.');
      setLoading(false);
    }
  }, [user]);

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
          Loading contacts...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        Please log in to view contacts.
      </Alert>
    );
  }

  if (!canSaveContacts()) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Access denied. Admin privileges required to view contacts.
      </Alert>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedContacts.length > 0 && selectedContacts.length < contacts.length}
                checked={contacts.length > 0 && selectedContacts.length === contacts.length}
                onChange={handleSelectAll}
                size="small"
              />
            </TableCell>
            <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Contact</TableCell>
            <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Phone</TableCell>
            <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Company</TableCell>
            <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow 
              key={contact.id}
              hover
              selected={selectedContacts.includes(contact.id)}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => handleSelectContact(contact.id)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: 'primary.main',
                      fontSize: '0.8rem'
                    }}
                  >
                    {getInitials(contact.fullName)}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                      {contact.fullName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                      {contact.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: '0.8rem' }}>
                  {contact.phone}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: '0.8rem' }}>
                  {contact.company}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Tooltip title="View Contact">
                    <IconButton size="small">
                      <Visibility sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Contact">
                    <IconButton size="small">
                      <Edit sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                  <IconButton size="small" onClick={(e) => onMenuClick(e, contact)}>
                    <MoreVert sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {contacts.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <Typography variant="body2" color="textSecondary">
            No contacts found
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
};