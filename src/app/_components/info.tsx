"use client"
import { InfoContext } from "@/context/textContext"
import { useState, type ReactNode } from "react"

const InfoProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0)
  const increment = () => setCount((prev) => prev + 1)

  return (
    <InfoContext.Provider value={{ count, increment }}>
      {children}
    </InfoContext.Provider>
  )
}

export default InfoProvider
