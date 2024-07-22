import { createStore } from 'zustand/vanilla'

export type Message = {
  type: string,
  msg: string,
  closable: boolean,
  autoHideTimer: number,
}

export type AlertState = {
  messages: Message[]
}

export type AlertActions = {
  addMessage: (message: Message) => void
  closeMessage: (index: number) => void
}

export type AlertStore = AlertState & AlertActions

export const defaultInitState: AlertState = {
  messages: []
}

export const createAlertStore = (
  initState: AlertState = defaultInitState,
) => {
  return createStore<AlertStore>()((set) => ({
    ...initState,
    addMessage: (message: Message) => set((state) => ({messages: [...state.messages, message]})),
    closeMessage: (index: number) => set((state) => ({messages: [...state.messages]})),
  }))
}