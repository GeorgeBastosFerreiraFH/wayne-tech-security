import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORTA = process.env.PORT || 5000
const CHAVE_JWT = process.env.JWT_SECRET || "waynetech_secret_key_2025"

// Middlewares
app.use(cors())
app.use(express.json())

// Configuração do banco de dados PostgreSQL
const pool = new pg.Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "waynetech",
  password: process.env.DB_PASSWORD || "postgres",
  port: process.env.DB_PORT || 5432,
})

// Middleware de autenticação
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" })
  }

  try {
    const decoded = jwt.verify(token, CHAVE_JWT)
    req.usuario = decoded
    next()
  } catch (erro) {
    return res.status(401).json({ erro: "Token inválido" })
  }
}

// Middleware de verificação de nível de acesso
const verificarNivel = (nivelMinimo) => {
  const niveis = { funcionario: 1, gerente: 2, admin: 3 }

  return (req, res, next) => {
    const nivelUsuario = niveis[req.usuario.nivel] || 0
    const nivelRequerido = niveis[nivelMinimo] || 0

    if (nivelUsuario < nivelRequerido) {
      return res.status(403).json({ erro: "Acesso negado" })
    }

    next()
  }
}

// Rotas de autenticação
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, senha } = req.body

    const resultado = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email])

    if (resultado.rows.length === 0) {
      return res.status(401).json({ erro: "Credenciais inválidas" })
    }

    const usuario = resultado.rows[0]
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash)

    if (!senhaValida) {
      return res.status(401).json({ erro: "Credenciais inválidas" })
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email, nivel: usuario.nivel }, CHAVE_JWT, {
      expiresIn: "24h",
    })

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        nivel: usuario.nivel,
      },
    })
  } catch (erro) {
    console.error("Erro no login:", erro)
    res.status(500).json({ erro: "Erro no servidor" })
  }
})

// Rotas de inventário
app.get("/api/inventario", verificarToken, async (req, res) => {
  try {
    const niveis = { funcionario: 1, gerente: 2, admin: 3 }
    const nivelUsuario = niveis[req.usuario.nivel] || 0

    const resultado = await pool.query("SELECT * FROM inventario WHERE nivel_minimo <= $1 ORDER BY id", [nivelUsuario])

    res.json(resultado.rows)
  } catch (erro) {
    console.error("Erro ao buscar inventário:", erro)
    res.status(500).json({ erro: "Erro no servidor" })
  }
})

// Rotas de monitoramento (apenas gerente e admin)
app.get("/api/monitoramento/cameras", verificarToken, verificarNivel("gerente"), async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM cameras ORDER BY id")
    res.json(resultado.rows)
  } catch (erro) {
    console.error("Erro ao buscar câmeras:", erro)
    res.status(500).json({ erro: "Erro no servidor" })
  }
})

app.get("/api/monitoramento/alertas", verificarToken, verificarNivel("gerente"), async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM alertas ORDER BY criado_em DESC LIMIT 10")
    res.json(resultado.rows)
  } catch (erro) {
    console.error("Erro ao buscar alertas:", erro)
    res.status(500).json({ erro: "Erro no servidor" })
  }
})

// Rota de logs (apenas admin)
app.get("/api/logs", verificarToken, verificarNivel("admin"), async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM logs ORDER BY criado_em DESC LIMIT 50")
    res.json(resultado.rows)
  } catch (erro) {
    console.error("Erro ao buscar logs:", erro)
    res.status(500).json({ erro: "Erro no servidor" })
  }
})

// Rota de saúde
app.get("/api/health", (req, res) => {
  res.json({ status: "online", timestamp: new Date().toISOString() })
})

// Iniciar servidor
app.listen(PORTA, () => {
  console.log(`🦇 Servidor WayneTech rodando na porta ${PORTA}`)
})
