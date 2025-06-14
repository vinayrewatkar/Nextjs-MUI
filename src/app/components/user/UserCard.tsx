import { Card, CardContent, Box, Typography, Avatar, Badge, Chip, IconButton } from '@mui/material';
import { MoreVert, AdminPanelSettings, Groups, Person } from '@mui/icons-material';
import { User, UserStatus } from './../../types/User';

interface UserCardProps {
  user: User
  onMenuClick: (event: React.MouseEvent<HTMLElement>, user: User) => void
}

export const UserCard = ({ user, onMenuClick }: UserCardProps) => {
  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'default';
      case 'Pending': return 'warning';
      case 'Suspended': return 'error';
      default: return 'default';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <AdminPanelSettings sx={{ fontSize: '1rem' }} />;
      case 'Manager': return <Groups sx={{ fontSize: '1rem' }} />;
      default: return <Person sx={{ fontSize: '1rem' }} />;
    }
  };

  return (
    <Card sx={{ 
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': { transform: 'translateY(-2px)' }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={user.status === 'Active' ? (
                <Box width={12} height={12} bgcolor="green.500" borderRadius="50%" border={2} borderColor="white" />
              ) : null}
            >
              <Avatar 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  bgcolor: 'primary.main',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {user.avatar}
              </Avatar>
            </Badge>
            <Box>
              <Typography 
                variant="h6"
                sx={{ fontSize: '1rem', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {user.name}
              </Typography>
              <Typography 
                variant="caption" 
                color="textSecondary"
                sx={{ fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={(e) => onMenuClick(e, user)}>
            <MoreVert />
          </IconButton>
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex" alignItems="center" gap={1}>
            {getRoleIcon(user.role)}
            <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
              {user.role}
            </Typography>
          </Box>
          <Chip
            label={user.status}
            color={getStatusColor(user.status)}
            size="small"
            sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
          />
        </Box>
        
        <Typography 
          variant="caption" 
          color="textSecondary"
          sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif', display: 'block', mb: 0.5 }}
        >
          {user.department} • Joined {user.joinDate}
        </Typography>
        
        <Typography 
          variant="caption" 
          color="textSecondary"
          sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
        >
          Last active: {user.lastActive}
        </Typography>
      </CardContent>
    </Card>
  );
};