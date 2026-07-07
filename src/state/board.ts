import type { BoardState, ColumnId, Priority, Task } from '../types'

const STORAGE_KEY = 'kanban-board-state'

const initialState: BoardState = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Set up project', description: 'Scaffold the Vite + React + TS app.', priority: 'high' },
    'task-2': { id: 'task-2', title: 'Design board layout', description: 'Sketch the columns and card layout.', priority: 'medium' },
    'task-3': { id: 'task-3', title: 'Wire up routing', description: 'Add react-router routes for the app.', priority: 'medium' },
    'task-4': { id: 'task-4', title: 'Deploy to GitHub Pages', description: 'Publish the app via GitHub Actions.', priority: 'low' },
  },
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: ['task-3', 'task-4'] },
    'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: ['task-2'] },
    done: { id: 'done', title: 'Done', taskIds: ['task-1'] },
  },
  columnOrder: ['todo', 'in-progress', 'done'],
}

export function loadState(): BoardState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return initialState
  try {
    return JSON.parse(raw) as BoardState
  } catch {
    return initialState
  }
}

export function saveState(state: BoardState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export type BoardAction =
  | { type: 'MOVE_TASK'; taskId: string; fromColumn: ColumnId; toColumn: ColumnId; toIndex: number }
  | { type: 'ADD_TASK'; columnId: ColumnId; title: string; description: string; priority: Priority }
  | { type: 'DELETE_TASK'; taskId: string; columnId: ColumnId }

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'MOVE_TASK': {
      const { taskId, fromColumn, toColumn, toIndex } = action
      const fromTaskIds = state.columns[fromColumn].taskIds.filter((id) => id !== taskId)
      const toTaskIds = [...(fromColumn === toColumn ? fromTaskIds : state.columns[toColumn].taskIds)]
      toTaskIds.splice(toIndex, 0, taskId)

      return {
        ...state,
        columns: {
          ...state.columns,
          [fromColumn]: { ...state.columns[fromColumn], taskIds: fromTaskIds },
          [toColumn]: { ...state.columns[toColumn], taskIds: toTaskIds },
        },
      }
    }
    case 'ADD_TASK': {
      const id = `task-${Date.now()}`
      const task: Task = { id, title: action.title, description: action.description, priority: action.priority }
      return {
        ...state,
        tasks: { ...state.tasks, [id]: task },
        columns: {
          ...state.columns,
          [action.columnId]: {
            ...state.columns[action.columnId],
            taskIds: [...state.columns[action.columnId].taskIds, id],
          },
        },
      }
    }
    case 'DELETE_TASK': {
      const { [action.taskId]: _removed, ...remainingTasks } = state.tasks
      return {
        ...state,
        tasks: remainingTasks,
        columns: {
          ...state.columns,
          [action.columnId]: {
            ...state.columns[action.columnId],
            taskIds: state.columns[action.columnId].taskIds.filter((id) => id !== action.taskId),
          },
        },
      }
    }
    default:
      return state
  }
}
