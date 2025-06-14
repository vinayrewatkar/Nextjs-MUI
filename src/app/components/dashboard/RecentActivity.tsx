import React from 'react'
import {
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material'
import { ChartCard } from './ChartCard'

interface Activity {
  id: number
  user: string
  action: string
  time: string
  avatar: string
}

const recentActivities: Activity[] = [
  { id: 1, user: 'John Doe', action: 'Made a purchase', time: '2 min ago', avatar: 'JD' },
  { id: 2, user: 'Sarah Smith', action: 'Signed up', time: '5 min ago', avatar: 'SS' },
  { id: 3, user: 'Mike Johnson', action: 'Left a review', time: '12 min ago', avatar: 'MJ' },
  { id: 4, user: 'Emily Brown', action: 'Updated profile', time: '18 min ago', avatar: 'EB' },
]

export const RecentActivity: React.FC = () => (
  <ChartCard title="Recent Activity">
    <div className="h-80 overflow-hidden">
      <List sx={{ padding: 0 }}>
        {recentActivities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            <ListItem sx={{ padding: '8px 0' }}>
              <ListItemAvatar>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    fontSize: '0.7rem',
                    bgcolor: 'primary.main',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  {activity.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography 
                    variant="body2"
                    sx={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}
                  >
                    {activity.user}
                  </Typography>
                }
                secondary={
                  <div>
                    <Typography 
                      variant="caption" 
                      color="textSecondary"
                      sx={{ fontSize: '0.7rem', fontFamily: 'Inter, sans-serif' }}
                    >
                      {activity.action}
                    </Typography>
                    <br />
                    <Typography 
                      variant="caption" 
                      color="primary"
                      sx={{ fontSize: '0.65rem', fontFamily: 'Inter, sans-serif' }}
                    >
                      {activity.time}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
            {index < recentActivities.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  </ChartCard>
)