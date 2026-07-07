import { useState } from 'react'
import { Card, CardContent, CardActions, Typography, Chip, IconButton, Stack, Menu, MenuItem } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import type { Column, Task } from '../types'

const priorityColor: Record<Task['priority'], 'success' | 'warning' | 'error'> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
}

interface TaskCardProps {
  task: Task
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void
  onDelete: () => void
  otherColumns: Pick<Column, 'id' | 'title'>[]
  onMoveTo: (columnId: Column['id']) => void
}

export function TaskCard({ task, onDragStart, onDelete, otherColumns, onMoveTo }: TaskCardProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

  return (
    <Card
      variant="outlined"
      draggable
      onDragStart={onDragStart}
      sx={{ mb: 1.5, cursor: 'grab' }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {task.title}
        </Typography>
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {task.description}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
        <Stack direction="row">
          <Chip size="small" label={task.priority} color={priorityColor[task.priority]} />
        </Stack>
        <Stack direction="row">
          <IconButton
            size="small"
            aria-label="move task to another column"
            onClick={(event) => setMenuAnchor(event.currentTarget)}
          >
            <SwapHorizIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" aria-label="delete task" onClick={onDelete}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
          {otherColumns.map((column) => (
            <MenuItem
              key={column.id}
              onClick={() => {
                setMenuAnchor(null)
                onMoveTo(column.id)
              }}
            >
              Move to {column.title}
            </MenuItem>
          ))}
        </Menu>
      </CardActions>
    </Card>
  )
}
