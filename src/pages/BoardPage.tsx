import { useState } from 'react'
import { Stack, Box } from '@mui/material'
import { BoardColumn } from '../components/BoardColumn'
import { AddTaskDialog } from '../components/AddTaskDialog'
import { useBoard } from '../state/BoardContext'
import type { ColumnId, Priority } from '../types'

export function BoardPage() {
  const { state, dispatch } = useBoard()
  const [activeColumn, setActiveColumn] = useState<ColumnId | null>(null)

  const handleAddTask = (title: string, description: string, priority: Priority) => {
    if (!activeColumn) return
    dispatch({ type: 'ADD_TASK', columnId: activeColumn, title, description, priority })
  }

  return (
    <Box sx={{ p: 3, overflowX: 'auto' }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
        {state.columnOrder.map((columnId) => (
          <BoardColumn key={columnId} column={state.columns[columnId]} onAddTask={setActiveColumn} />
        ))}
      </Stack>

      <AddTaskDialog
        open={activeColumn !== null}
        onClose={() => setActiveColumn(null)}
        onSubmit={handleAddTask}
      />
    </Box>
  )
}
