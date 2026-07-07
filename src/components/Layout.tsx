import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import ViewKanbanIcon from '@mui/icons-material/ViewKanban'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <ViewKanbanIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" component="div">
            Kanban
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  )
}
