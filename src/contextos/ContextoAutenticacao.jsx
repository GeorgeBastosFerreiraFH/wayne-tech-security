"use client"

import { createContext, useContext } from "react"

export const ContextoAutenticacao = createContext(null)

export const useAutenticacao = () => {
  const contexto = useContext(ContextoAutenticacao)
  if (!contexto) {
    throw new Error("useAutenticacao deve ser usado dentro de um ContextoAutenticacao.Provider")
  }
  return contexto
}
