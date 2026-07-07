export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
}

export type ColumnId = 'todo' | 'in-progress' | 'done'

export interface Column {
  id: ColumnId
  title: string
  taskIds: string[]
}

export interface BoardState {
  tasks: Record<string, Task>
  columns: Record<ColumnId, Column>
  columnOrder: ColumnId[]
}
