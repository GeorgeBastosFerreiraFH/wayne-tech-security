"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ContextoAutenticacao } from "./contextos/ContextoAutenticacao"
import PaginaLogin from "./paginas/PaginaLogin"
import PaginaDashboard from "./paginas/PaginaDashboard"
import PaginaInventario from "./paginas/PaginaInventario"
import PaginaVisualizacao3D from "./paginas/PaginaVisualizacao3D"
import PaginaMonitoramento from "./paginas/PaginaMonitoramento"
import Pagina404 from "./paginas/Pagina404"
import RotaProtegida from "./componentes/RotaProtegida"
import Layout from "./componentes/Layout"
import LoadingPersonalizado from "./componentes/LoadingPersonalizado"

function App() {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [carregandoAposLogin, setCarregandoAposLogin] = useState(false)
  const [mensagemLoading, setMensagemLoading] = useState("Inicializando sistema...")

  useEffect(() => {
    const token = localStorage.getItem("waynetech_token")
    const usuarioSalvo = localStorage.getItem("waynetech_usuario")

    if (token && usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }

    setTimeout(() => {
      setCarregando(false)
    }, 1500)
  }, [])

  const login = (dadosUsuario, token) => {
    setCarregandoAposLogin(true)

    setMensagemLoading("Verificando credenciais...")

    setTimeout(() => {
      setMensagemLoading("Carregando sistemas de segurança...")
    }, 800)

    setTimeout(() => {
      setMensagemLoading("Inicializando protocolos...")
    }, 1600)

    setTimeout(() => {
      setMensagemLoading("Acesso concedido!")
    }, 2400)

    setTimeout(() => {
      localStorage.setItem("waynetech_token", token)
      localStorage.setItem("waynetech_usuario", JSON.stringify(dadosUsuario))
      setUsuario(dadosUsuario)
      setCarregandoAposLogin(false)
      setMensagemLoading("Inicializando sistema...")
    }, 3200)
  }

  const logout = () => {
    localStorage.removeItem("waynetech_token")
    localStorage.removeItem("waynetech_usuario")
    setUsuario(null)
  }

  return (
    <ContextoAutenticacao.Provider value={{ usuario, login, logout }}>
      {carregando || carregandoAposLogin ? (
        <LoadingPersonalizado usuario={usuario} mensagem={mensagemLoading} />
      ) : (
        <Routes>
          <Route path="/login" element={usuario ? <Navigate to="/dashboard" /> : <PaginaLogin />} />

          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <RotaProtegida>
                  <PaginaDashboard />
                </RotaProtegida>
              }
            />

            <Route
              path="/inventario"
              element={
                <RotaProtegida>
                  <PaginaInventario />
                </RotaProtegida>
              }
            />

            <Route
              path="/visualizacao-3d"
              element={
                <RotaProtegida nivelMinimo="gerente">
                  <PaginaVisualizacao3D />
                </RotaProtegida>
              }
            />

            <Route
              path="/monitoramento"
              element={
                <RotaProtegida nivelMinimo="gerente">
                  <PaginaMonitoramento />
                </RotaProtegida>
              }
            />

            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route path="*" element={<Pagina404 />} />
          </Route>
        </Routes>
      )}
    </ContextoAutenticacao.Provider>
  )
}

export default App
