"use client"

import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { X, Save } from "lucide-react"
import { useState, useEffect } from "react"

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`

const Modal = styled(motion.div)`
  background: var(--cor-fundo-card);
  border: 1px solid var(--cor-neon-azul);
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 40px rgba(0, 212, 255, 0.3);
`

const Cabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
`

const Titulo = styled.h2`
  font-family: var(--fonte-titulo);
  font-size: 1.5rem;
  color: var(--cor-neon-azul);
  text-transform: uppercase;
`

const BotaoFechar = styled.button`
  background: transparent;
  border: none;
  color: var(--cor-texto-secundario);
  cursor: pointer;
  padding: 0.5rem;
  transition: all var(--transicao-rapida);

  &:hover {
    color: var(--cor-neon-laranja);
  }
`

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Campo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-family: var(--fonte-corpo);
  font-size: 0.9rem;
  color: var(--cor-texto-primario);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: var(--cor-fundo-secundario);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-texto-primario);
  font-family: var(--fonte-corpo);

  &:focus {
    outline: none;
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  background: var(--cor-fundo-secundario);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-texto-primario);
  font-family: var(--fonte-corpo);
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
  }
`

const Select = styled.select`
  padding: 0.75rem 1rem;
  background: var(--cor-fundo-secundario);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-texto-primario);
  font-family: var(--fonte-corpo);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
  }
`

const BotoesAcao = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const Botao = styled(motion.button)`
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: ${(props) => (props.$primario ? "var(--cor-neon-azul)" : "transparent")};
  border: 1px solid var(--cor-neon-azul);
  border-radius: 8px;
  color: ${(props) => (props.$primario ? "var(--cor-fundo)" : "var(--cor-neon-azul)")};
  font-family: var(--fonte-corpo);
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all var(--transicao-rapida);

  &:hover {
    background: ${(props) => (props.$primario ? "var(--cor-neon-azul)" : "rgba(0, 212, 255, 0.1)")};
    box-shadow: var(--sombra-neon-azul);
  }
`

function ModalGerenciarItem({ aberto, aoFechar, item, aoSalvar }) {
  const [dados, setDados] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    nivelMinimo: "funcionario",
    quantidade: 1,
    disponivel: true,
  })

  useEffect(() => {
    if (item) {
      setDados(item)
    } else {
      setDados({
        nome: "",
        categoria: "",
        descricao: "",
        nivelMinimo: "funcionario",
        quantidade: 1,
        disponivel: true,
      })
    }
  }, [item])

  const handleSubmit = (e) => {
    e.preventDefault()
    aoSalvar(dados)
  }

  const handleChange = (campo, valor) => {
    setDados((prev) => ({ ...prev, [campo]: valor }))
  }

  return (
    <AnimatePresence>
      {aberto && (
        <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={aoFechar}>
          <Modal
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Cabecalho>
              <Titulo>{item ? "Editar Item" : "Adicionar Item"}</Titulo>
              <BotaoFechar onClick={aoFechar}>
                <X size={24} />
              </BotaoFechar>
            </Cabecalho>

            <Formulario onSubmit={handleSubmit}>
              <Campo>
                <Label>Nome do Item</Label>
                <Input
                  type="text"
                  value={dados.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  placeholder="Ex: Batmóvel"
                  required
                />
              </Campo>

              <Campo>
                <Label>Categoria</Label>
                <Select value={dados.categoria} onChange={(e) => handleChange("categoria", e.target.value)} required>
                  <option value="">Selecione uma categoria</option>
                  <option value="Veículo Tático">Veículo Tático</option>
                  <option value="Veículo Aéreo">Veículo Aéreo</option>
                  <option value="Equipamento">Equipamento</option>
                  <option value="Gadget">Gadget</option>
                  <option value="Infraestrutura">Infraestrutura</option>
                  <option value="Segurança">Segurança</option>
                </Select>
              </Campo>

              <Campo>
                <Label>Descrição</Label>
                <TextArea
                  value={dados.descricao}
                  onChange={(e) => handleChange("descricao", e.target.value)}
                  placeholder="Descreva o item..."
                  required
                />
              </Campo>

              <Campo>
                <Label>Nível Mínimo de Acesso</Label>
                <Select
                  value={dados.nivelMinimo}
                  onChange={(e) => handleChange("nivelMinimo", e.target.value)}
                  required
                >
                  <option value="funcionario">Funcionário</option>
                  <option value="gerente">Gerente</option>
                  <option value="admin">Admin</option>
                </Select>
              </Campo>

              <Campo>
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  min="0"
                  value={dados.quantidade}
                  onChange={(e) => handleChange("quantidade", Number.parseInt(e.target.value))}
                  required
                />
              </Campo>

              <Campo>
                <Label>Status</Label>
                <Select
                  value={dados.disponivel}
                  onChange={(e) => handleChange("disponivel", e.target.value === "true")}
                >
                  <option value="true">Disponível</option>
                  <option value="false">Em Uso</option>
                </Select>
              </Campo>

              <BotoesAcao>
                <Botao type="button" onClick={aoFechar}>
                  Cancelar
                </Botao>
                <Botao type="submit" $primario whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Save size={18} />
                  Salvar
                </Botao>
              </BotoesAcao>
            </Formulario>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  )
}

export default ModalGerenciarItem
