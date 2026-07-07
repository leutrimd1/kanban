import { Card, CardContent, CardActions, Typography, Chip, IconButton, Stack } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import type { Task } from '../types'

const priorityColor: Record<Task['priority'], 'success' | 'warning' | 'error'> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
}

interface TaskCardProps {
  task: Task
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void
  onDelete: () => void
}

export function TaskCard({ task, onDragStart, onDelete }: TaskCardProps) {
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
        <IconButton size="small" aria-label="delete task" onClick={onDelete}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  )
}
