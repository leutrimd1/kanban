import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <Box sx={{ p: 6, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        This page doesn't exist.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Back to board
      </Button>
    </Box>
  )
}
