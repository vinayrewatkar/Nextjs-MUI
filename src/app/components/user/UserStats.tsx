import { Card, CardContent, Typography, Grid } from '@mui/material';
import { User } from './../../types/User';

interface StatsCardProps {
  label: string
  value: number
  color: string
}

export const StatsCard = ({ label, value, color }: StatsCardProps) => (
  <Card sx={{ 
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <CardContent sx={{ p: 2 }}>
      <Typography 
        color="textSecondary" 
        variant="caption"
        sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </Typography>
      <Typography 
        variant="h5" 
        sx={{ 
          fontSize: '1.25rem', 
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          color: `${color}.main`
        }}
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

interface UserStatsProps {
  users: User[]
}

export const UserStats = ({ users }: UserStatsProps) => {
  const statsData = [
    { label: 'Total Users', value: users.length, color: 'primary' },
    { label: 'Active Users', value: users.filter(u => u.status === 'Active').length, color: 'success' },
    { label: 'Pending Users', value: users.filter(u => u.status === 'Pending').length, color: 'warning' },
    { label: 'Suspended Users', value: users.filter(u => u.status === 'Suspended').length, color: 'error' },
  ];

  return (
    <Grid container spacing={2}>
      {statsData.map((stat, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <StatsCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};