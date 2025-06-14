// app/company/page.tsx
'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import {
  BusinessCenter,
  People,
  Timeline,
  TrendingUp,
  LocationOn,
  Email,
  Phone,
  Edit,
  Add,
  Group,
  Assignment,
  Assessment,
  CalendarToday,
  AttachMoney,
  CheckCircle,
  Schedule,
  Warning,
} from '@mui/icons-material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`company-tabpanel-${index}`}
      aria-labelledby={`company-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function CompanyPage() {
  const [tabValue, setTabValue] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState<'department' | 'project'>('department')

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleOpenDialog = (type: 'department' | 'project') => {
    setDialogType(type)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // Mock data
  const companyStats = {
    totalEmployees: 245,
    departments: 8,
    activeProjects: 12,
    revenue: '$2.4M',
  }

  const departments = [
    { name: 'Engineering', employees: 45, budget: '$450K', head: 'John Smith' },
    { name: 'Marketing', employees: 12, budget: '$120K', head: 'Sarah Johnson' },
    { name: 'Sales', employees: 28, budget: '$280K', head: 'Mike Davis' },
    { name: 'HR', employees: 8, budget: '$80K', head: 'Lisa Wilson' },
    { name: 'Finance', employees: 6, budget: '$60K', head: 'David Brown' },
  ]

  const projects = [
    { name: 'Website Redesign', status: 'In Progress', progress: 75, team: 6, deadline: '2025-07-15' },
    { name: 'Mobile App', status: 'Planning', progress: 25, team: 8, deadline: '2025-09-30' },
    { name: 'API Integration', status: 'Completed', progress: 100, team: 4, deadline: '2025-05-20' },
    { name: 'Security Audit', status: 'In Progress', progress: 60, team: 3, deadline: '2025-08-10' },
  ]

  const recentActivities = [
    { action: 'New employee onboarded', department: 'Engineering', time: '2 hours ago' },
    { action: 'Project milestone completed', department: 'Marketing', time: '5 hours ago' },
    { action: 'Budget approved', department: 'Finance', time: '1 day ago' },
    { action: 'Team meeting scheduled', department: 'HR', time: '2 days ago' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'In Progress':
        return 'primary'
      case 'Planning':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle />
      case 'In Progress':
        return <Schedule />
      case 'Planning':
        return <Warning />
      default:
        return <Assignment />
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Company Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your company structure, departments, and projects
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <People />
                </Avatar>
                <Typography variant="h6">Employees</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {companyStats.totalEmployees}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total workforce
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <BusinessCenter />
                </Avatar>
                <Typography variant="h6">Departments</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {companyStats.departments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active departments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <Assignment />
                </Avatar>
                <Typography variant="h6">Projects</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {companyStats.activeProjects}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active projects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <AttachMoney />
                </Avatar>
                <Typography variant="h6">Revenue</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {companyStats.revenue}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This quarter
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="company tabs">
            <Tab label="Departments" />
            <Tab label="Projects" />
            <Tab label="Recent Activity" />
          </Tabs>
        </Box>

        {/* Departments Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Department Overview</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog('department')}
            >
              Add Department
            </Button>
          </Box>
          <Grid container spacing={3}>
            {departments.map((dept, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6">{dept.name}</Typography>
                      <Tooltip title="Edit Department">
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Department Head: {dept.head}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        <Group sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                        {dept.employees} Employees
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Budget: {dept.budget}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Projects Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Active Projects</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog('project')}
            >
              Add Project
            </Button>
          </Box>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Team Size</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {project.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(project.status)}
                        label={project.status}
                        color={getStatusColor(project.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          sx={{ width: 100, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2">{project.progress}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{project.team} members</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 16 }} />
                        {project.deadline}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit Project">
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Recent Activity Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Recent Company Activity
          </Typography>
          <List>
            {recentActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Assessment />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={activity.action}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Department: {activity.department}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
      </Paper>

      {/* Add Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add New {dialogType === 'department' ? 'Department' : 'Project'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {dialogType === 'department' ? (
              <>
                <TextField label="Department Name" fullWidth />
                <TextField label="Department Head" fullWidth />
                <TextField label="Budget" fullWidth />
                <TextField label="Initial Team Size" type="number" fullWidth />
              </>
            ) : (
              <>
                <TextField label="Project Name" fullWidth />
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select label="Status">
                    <MenuItem value="Planning">Planning</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
                <TextField label="Team Size" type="number" fullWidth />
                <TextField label="Deadline" type="date" fullWidth InputLabelProps={{ shrink: true }} />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained">
            Add {dialogType === 'department' ? 'Department' : 'Project'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}