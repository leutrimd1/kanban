import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import { boardReducer, loadState, saveState } from './board'
import type { BoardAction } from './board'
import type { BoardState } from '../types'

interface BoardContextValue {
  state: BoardState
  dispatch: React.Dispatch<BoardAction>
}

const BoardContext = createContext<BoardContextValue | null>(null)

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, undefined, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  return <BoardContext.Provider value={{ state, dispatch }}>{children}</BoardContext.Provider>
}

export function useBoard() {
  const ctx = useContext(BoardContext)
  if (!ctx) throw new Error('useBoard must be used within a BoardProvider')
  return ctx
}
