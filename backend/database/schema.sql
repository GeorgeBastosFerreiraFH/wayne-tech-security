-- Criação do banco de dados WayneTech

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  nivel VARCHAR(50) NOT NULL CHECK (nivel IN ('funcionario', 'gerente', 'admin')),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de inventário
CREATE TABLE IF NOT EXISTS inventario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  descricao TEXT,
  quantidade INTEGER DEFAULT 0,
  disponivel BOOLEAN DEFAULT true,
  nivel_minimo INTEGER DEFAULT 1 CHECK (nivel_minimo IN (1, 2, 3)),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de câmeras
CREATE TABLE IF NOT EXISTS cameras (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  localizacao VARCHAR(255) NOT NULL,
  ativo BOOLEAN DEFAULT true,
  ultima_atividade TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de alertas
CREATE TABLE IF NOT EXISTS alertas (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('critico', 'normal', 'info')),
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  resolvido BOOLEAN DEFAULT false,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolvido_em TIMESTAMP
);

-- Tabela de logs
CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  acao VARCHAR(255) NOT NULL,
  detalhes TEXT,
  ip_address VARCHAR(50),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_inventario_nivel ON inventario(nivel_minimo);
CREATE INDEX idx_alertas_tipo ON alertas(tipo);
CREATE INDEX idx_logs_usuario ON logs(usuario_id);
CREATE INDEX idx_logs_criado_em ON logs(criado_em DESC);
