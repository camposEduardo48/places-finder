"use client"
import { createContext, useContext } from "react"

export type ContextTypes = {
  count: number
  increment: () => void
}

export const InfoContext = createContext<ContextTypes | undefined>(undefined)

export const useInfo = () => {
  const context = useContext(InfoContext)
  if (!context) {
    throw new Error("O componente precisa estar dentro do InfoProvider")
  }
  return context
}
