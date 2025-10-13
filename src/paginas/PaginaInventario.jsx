"use client"

import styled from "styled-components"
import { motion } from "framer-motion"
import { useAutenticacao } from "../contextos/ContextoAutenticacao"
import { Package, Search, Filter, Plus, Edit, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { modelos3d } from "../dados/modelos3d"
import ModalGerenciarItem from "../componentes/ModalGerenciarItem"

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Cabecalho = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Titulo = styled.h1`
  font-size: 2rem;
  color: var(--cor-neon-azul);
  text-shadow: 0 0 20px var(--cor-neon-azul);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const BarraPesquisa = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  max-width: 500px;
`

const InputPesquisa = styled.div`
  position: relative;
  flex: 1;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    background: var(--cor-fundo-card);
    border: 1px solid rgba(0, 212, 255, 0.3);
    border-radius: 8px;
    color: var(--cor-texto-primario);
    font-family: var(--fonte-corpo);
    
    &:focus {
      outline: none;
      border-color: var(--cor-neon-azul);
      box-shadow: var(--sombra-neon-azul);
    }
  }
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--cor-neon-azul);
  }
`

const BotaoFiltro = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: var(--cor-fundo-card);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-neon-azul);
  font-family: var(--fonte-corpo);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transicao-rapida);
  
  &:hover {
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
  }
`

const BotaoAdicionar = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: var(--cor-neon-verde);
  border: 1px solid var(--cor-neon-verde);
  border-radius: 8px;
  color: var(--cor-fundo);
  font-family: var(--fonte-corpo);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  transition: all var(--transicao-rapida);
  
  &:hover {
    background: transparent;
    color: var(--cor-neon-verde);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }
`

const GridItens = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const CardItem = styled(motion.div)`
  padding: 1.5rem;
  background: var(--cor-fundo-card);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  transition: all var(--transicao-rapida);
  cursor: pointer;
  
  &:hover {
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
    transform: translateY(-5px);
  }
`

const ItemImagem = styled.div`
  width: 100%;
  height: 180px;
  background: var(--cor-fundo-secundario);
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cor-neon-azul);
  font-size: 3rem;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
    animation: varredura 3s linear infinite;
  }
  
  @keyframes varredura {
    to {
      left: 100%;
    }
  }
`

const ItemNome = styled.h3`
  font-size: 1.1rem;
  color: var(--cor-texto-primario);
  margin-bottom: 0.5rem;
`

const ItemCategoria = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid var(--cor-neon-azul);
  border-radius: 4px;
  color: var(--cor-neon-azul);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
`

const ItemDescricao = styled.p`
  color: var(--cor-texto-secundario);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
  font-size: 0.85rem;
  color: var(--cor-texto-terciario);
`

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  background: ${(props) => (props.$disponivel ? "rgba(0, 255, 136, 0.1)" : "rgba(255, 107, 53, 0.1)")};
  border: 1px solid ${(props) => (props.$disponivel ? "var(--cor-neon-verde)" : "var(--cor-neon-laranja)")};
  border-radius: 4px;
  color: ${(props) => (props.$disponivel ? "var(--cor-neon-verde)" : "var(--cor-neon-laranja)")};
  font-size: 0.75rem;
  text-transform: uppercase;
`

const AcoesItem = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
`

const BotaoAcao = styled(motion.button)`
  flex: 1;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid ${(props) => (props.$deletar ? "var(--cor-neon-laranja)" : "var(--cor-neon-azul)")};
  border-radius: 6px;
  color: ${(props) => (props.$deletar ? "var(--cor-neon-laranja)" : "var(--cor-neon-azul)")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  transition: all var(--transicao-rapida);

  &:hover {
    background: ${(props) => (props.$deletar ? "rgba(255, 107, 53, 0.1)" : "rgba(0, 212, 255, 0.1)")};
    box-shadow: ${(props) => (props.$deletar ? "0 0 15px rgba(255, 107, 53, 0.3)" : "var(--sombra-neon-azul)")};
  }
`

function PaginaInventario() {
  const { usuario } = useAutenticacao()
  const [pesquisa, setPesquisa] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [itemEditando, setItemEditando] = useState(null)
  const [itensInventario, setItensInventario] = useState([])

  const podeGerenciar =
    usuario?.nivel === "gerente" || usuario?.nivel === "admin" 

  useEffect(() => {
    const itensSalvos = localStorage.getItem("waynetech_inventario")
    if (itensSalvos) {
      setItensInventario(JSON.parse(itensSalvos))
    } else {
      const itensIniciais = modelos3d.map((modelo) => ({
        id: modelo.id,
        nome: modelo.nome,
        categoria: modelo.categoria,
        descricao: modelo.descricao,
        thumbnail: modelo.thumbnail,
        quantidade: modelo.id <= 6 ? 1 : modelo.id <= 8 ? 2 : modelo.id <= 10 ? 8 : 15,
        disponivel: modelo.id !== 3,
        nivelMinimo: modelo.nivelMinimo,
      }))
      setItensInventario(itensIniciais)
      localStorage.setItem("waynetech_inventario", JSON.stringify(itensIniciais))
    }
  }, [])

  const salvarItens = (novosItens) => {
    setItensInventario(novosItens)
    localStorage.setItem("waynetech_inventario", JSON.stringify(novosItens))
  }

  const handleSalvarItem = (dados) => {
    if (itemEditando) {
      const novosItens = itensInventario.map((item) => (item.id === itemEditando.id ? { ...dados, id: item.id } : item))
      salvarItens(novosItens)
    } else {
      const novoId = Math.max(...itensInventario.map((i) => i.id), 0) + 1
      const novoItem = { ...dados, id: novoId }
      salvarItens([...itensInventario, novoItem])
    }
    setModalAberto(false)
    setItemEditando(null)
  }

  const handleDeletarItem = (id) => {
    if (confirm("Tem certeza que deseja remover este item do inventário?")) {
      const novosItens = itensInventario.filter((item) => item.id !== id)
      salvarItens(novosItens)
    }
  }

  const handleEditarItem = (item) => {
    setItemEditando(item)
    setModalAberto(true)
  }

  const handleAdicionarItem = () => {
    setItemEditando(null)
    setModalAberto(true)
  }

  const niveisAcesso = {
    funcionario: 1,
    gerente: 2,
    admin: 3,
  }

  const nivelUsuario = niveisAcesso[usuario?.nivel] || 0

  const itensFiltrados = itensInventario.filter((item) => {
    const nivelItem = niveisAcesso[item.nivelMinimo] || 0
    const acessoPermitido = nivelUsuario >= nivelItem
    const correspondePesquisa =
      item.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      item.categoria.toLowerCase().includes(pesquisa.toLowerCase())
    return acessoPermitido && correspondePesquisa
  })

  return (
      <Container>
        <Cabecalho>
          <Titulo>
            <Package size={32} />
            INVENTÁRIO
          </Titulo>
          <BarraPesquisa>
            <InputPesquisa>
              <Search size={20} />
              <input
                type="text"
                placeholder="Pesquisar itens..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </InputPesquisa>
            <BotaoFiltro whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Filter size={18} />
              Filtros
            </BotaoFiltro>
            {podeGerenciar && (
              <BotaoAdicionar onClick={handleAdicionarItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Plus size={18} />
                Adicionar
              </BotaoAdicionar>
            )}
          </BarraPesquisa>
        </Cabecalho>

        <GridItens>
          {itensFiltrados.map((item, index) => (
            <CardItem
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <ItemImagem>
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.nome}
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.parentElement.innerHTML = '<svg width="60" height="60"><use href="#package-icon"/></svg>'
                    }}
                  />
                ) : (
                  <Package size={60} />
                )}
              </ItemImagem>
              <ItemNome>{item.nome}</ItemNome>
              <ItemCategoria>{item.categoria}</ItemCategoria>
              <ItemDescricao>{item.descricao}</ItemDescricao>
              <ItemInfo>
                <span>Qtd: {item.quantidade}</span>
                <Badge $disponivel={item.disponivel}>{item.disponivel ? "Disponível" : "Em Uso"}</Badge>
              </ItemInfo>

              {podeGerenciar && (
                <AcoesItem>
                  <BotaoAcao
                    onClick={() => handleEditarItem(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit size={16} />
                    Editar
                  </BotaoAcao>
                  <BotaoAcao
                    $deletar
                    onClick={() => handleDeletarItem(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 size={16} />
                    Remover
                  </BotaoAcao>
                </AcoesItem>
              )}
            </CardItem>
          ))}
        </GridItens>

        <ModalGerenciarItem
          aberto={modalAberto}
          aoFechar={() => {
            setModalAberto(false)
            setItemEditando(null)
          }}
          item={itemEditando}
          aoSalvar={handleSalvarItem}
        />
      </Container>
  )
}

export default PaginaInventario
