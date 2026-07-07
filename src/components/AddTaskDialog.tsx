import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from '@mui/material'
import type { Priority } from '../types'

interface AddTaskDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (title: string, description: string, priority: Priority) => void
}

const priorities: Priority[] = ['low', 'medium', 'high']

export function AddTaskDialog({ open, onClose, onSubmit }: AddTaskDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setPriority('medium')
    onClose()
  }

  const handleSubmit = () => {
    if (!title.trim()) return
    onSubmit(title.trim(), description.trim(), priority)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add task</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
            minRows={2}
            fullWidth
          />
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value as Priority)}
            fullWidth
          >
            {priorities.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!title.trim()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
