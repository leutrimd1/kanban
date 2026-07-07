import { useState } from 'react'
import { Paper, Stack, Typography, Chip, Button, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TaskCard } from './TaskCard'
import { useBoard } from '../state/BoardContext'
import type { Column } from '../types'

interface BoardColumnProps {
  column: Column
  onAddTask: (columnId: Column['id']) => void
}

export function BoardColumn({ column, onAddTask }: BoardColumnProps) {
  const { state, dispatch } = useBoard()
  const [isDragOver, setIsDragOver] = useState(false)
  const otherColumns = state.columnOrder
    .filter((id) => id !== column.id)
    .map((id) => ({ id, title: state.columns[id].title }))

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    const taskId = event.dataTransfer.getData('text/task-id')
    const fromColumn = event.dataTransfer.getData('text/from-column') as Column['id']
    if (!taskId || !fromColumn) return

    dispatch({
      type: 'MOVE_TASK',
      taskId,
      fromColumn,
      toColumn: column.id,
      toIndex: column.taskIds.length,
    })
  }

  return (
    <Paper
      variant="outlined"
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      sx={{
        p: 1.5,
        width: { xs: '100%', sm: 300 },
        flexShrink: 0,
        bgcolor: isDragOver ? 'action.hover' : 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5, px: 0.5 }}>
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700 }}>
          {column.title}
        </Typography>
        <Chip size="small" label={column.taskIds.length} />
      </Stack>

      <Box sx={{ flexGrow: 1, minHeight: 40 }}>
        {column.taskIds.map((taskId) => {
          const task = state.tasks[taskId]
          if (!task) return null
          return (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={(event) => {
                event.dataTransfer.setData('text/task-id', task.id)
                event.dataTransfer.setData('text/from-column', column.id)
              }}
              onDelete={() => dispatch({ type: 'DELETE_TASK', taskId: task.id, columnId: column.id })}
              otherColumns={otherColumns}
              onMoveTo={(toColumn) =>
                dispatch({
                  type: 'MOVE_TASK',
                  taskId: task.id,
                  fromColumn: column.id,
                  toColumn,
                  toIndex: state.columns[toColumn].taskIds.length,
                })
              }
            />
          )
        })}
      </Box>

      <Button startIcon={<AddIcon />} onClick={() => onAddTask(column.id)} sx={{ mt: 1 }}>
        Add task
      </Button>
    </Paper>
  )
}
