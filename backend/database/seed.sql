-- Dados iniciais para o sistema WayneTech

-- Inserir usuários de demonstração
-- Senha para todos: wayne123 (hash bcrypt)
INSERT INTO usuarios (nome, email, senha_hash, nivel) VALUES
('João Silva', 'funcionario@waynetech.com', '$2a$10$rKZqYvTjXKqU5Z5Z5Z5Z5uXKqU5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', 'funcionario'),
('Maria Santos', 'gerente@waynetech.com', '$2a$10$rKZqYvTjXKqU5Z5Z5Z5Z5uXKqU5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', 'gerente'),
('Bruce Wayne', 'bruce@waynetech.com', '$2a$10$rKZqYvTjXKqU5Z5Z5Z5Z5uXKqU5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', 'admin'),
('Alfred Pennyworth', 'alfred@waynetech.com', '$2a$10$rKZqYvTjXKqU5Z5Z5Z5Z5uXKqU5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', 'admin');

-- Inserir itens de inventário
INSERT INTO inventario (nome, categoria, descricao, quantidade, disponivel, nivel_minimo) VALUES
('Servidor Principal', 'Infraestrutura', 'Servidor de alta performance para processamento de dados', 5, true, 1),
('Estação de Trabalho', 'Hardware', 'Computadores de última geração para equipe', 50, true, 1),
('Sistema de Câmeras', 'Segurança', 'Câmeras de vigilância com visão noturna', 120, true, 2),
('Drones de Patrulha', 'Segurança', 'Drones autônomos para monitoramento perimetral', 8, true, 2),
('Batmóvel', 'Veículo Tático', 'Veículo blindado de alta performance', 1, true, 3),
('Bat-Asa', 'Veículo Aéreo', 'Aeronave de combate e reconhecimento', 1, false, 3),
('Batarangues', 'Gadget', 'Dispositivos de arremesso multifuncionais', 200, true, 3),
('Traje Tático', 'Equipamento', 'Armadura avançada com tecnologia Wayne', 3, true, 3);

-- Inserir câmeras
INSERT INTO cameras (nome, localizacao, ativo) VALUES
('Entrada Principal', 'Portão Principal', true),
('Estacionamento', 'Garagem Subterrânea', true),
('Laboratório', 'Andar 15 - Ala Oeste', true),
('Perímetro Norte', 'Muro Externo Norte', false);

-- Inserir alertas
INSERT INTO alertas (tipo, titulo, descricao, resolvido) VALUES
('critico', 'Movimento detectado - Setor B', 'Sensor de movimento ativado no Setor B às 23:45', false),
('normal', 'Backup concluído com sucesso', 'Backup automático do sistema finalizado', true),
('critico', 'Câmera offline - Perímetro Norte', 'Câmera do perímetro norte não está respondendo', false);

-- Inserir logs de exemplo
INSERT INTO logs (usuario_id, acao, detalhes) VALUES
(1, 'Login', 'Usuário fez login no sistema'),
(2, 'Acesso Inventário', 'Visualizou lista de equipamentos'),
(3, 'Acesso Monitoramento', 'Verificou status das câmeras'),
(4, 'Acesso Logs', 'Consultou logs do sistema');
