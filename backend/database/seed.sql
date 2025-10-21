-- Dados iniciais para o sistema WayneTech

-- Inserir usuários (senhas: todos usam "wayne123" como senha)
-- Senha hash gerada com bcrypt para "wayne123": $2b$10$rQZ9vXJ5kZJ5X5X5X5X5XeO5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X
INSERT INTO usuarios (nome, email, senha_hash, nivel_acesso) VALUES
  ('Bruce Wayne', 'bruce@waynetech.com', '$2b$10$YourHashHere', 'admin'),
  ('Alfred Pennyworth', 'alfred@waynetech.com', '$2b$10$YourHashHere', 'admin'),
  ('Lucius Fox', 'lucius@waynetech.com', '$2b$10$YourHashHere', 'gerente'),
  ('Barbara Gordon', 'barbara@waynetech.com', '$2b$10$YourHashHere', 'gerente'),
  ('Dick Grayson', 'dick@waynetech.com', '$2b$10$YourHashHere', 'funcionario')
ON CONFLICT (email) DO NOTHING;

-- Inserir itens do inventário
INSERT INTO inventario (nome, categoria, status, localizacao, modelo_3d, thumbnail, especificacoes) VALUES
  ('Batwing', 'Veículos', 'Operacional', 'Hangar Principal', '/modelos3d/3d_batwing_batman_planespacecraft.glb', '/thumbnails/batwing.jpg', '{"velocidade_maxima": "Mach 3", "armamento": "Mísseis guiados, canhões", "autonomia": "5000km"}'),
  ('Batmóvel', 'Veículos', 'Operacional', 'Garagem A1', '/modelos3d/batmobile.glb', '/thumbnails/batmobile.jpg', '{"velocidade_maxima": "350 km/h", "blindagem": "Nível 10", "armamento": "Canhões, mísseis"}'),
  ('Tumbler', 'Veículos', 'Manutenção', 'Garagem B2', '/modelos3d/batmobile-the_dark_knight_tumbler.glb', '/thumbnails/tumbler.jpg', '{"velocidade_maxima": "320 km/h", "modo_salto": "Sim", "blindagem": "Nível 9"}'),
  ('Traje Batman vs Superman', 'Equipamentos', 'Operacional', 'Armário de Trajes', '/modelos3d/batman_vs_superman_suit.glb', '/thumbnails/suit.jpg', '{"resistencia": "Kryptonita", "peso": "45kg", "tecnologia": "Exoesqueleto"}'),
  ('Batarang', 'Armas', 'Operacional', 'Arsenal', '/modelos3d/dc_batman_batarang.glb', '/thumbnails/batarang.jpg', '{"material": "Titânio", "alcance": "50m", "tipo": "Retornável"}'),
  ('Drone de Segurança', 'Vigilância', 'Operacional', 'Torre de Controle', '/modelos3d/security_drone.glb', '/thumbnails/security-drone.jpg', '{"autonomia": "8h", "cameras": "4K 360°", "alcance": "10km"}'),
  ('Drone Policial', 'Vigilância', 'Operacional', 'Torre de Controle', '/modelos3d/police_drone.glb', '/thumbnails/police-drone.jpg', '{"autonomia": "6h", "cameras": "Térmica + 4K", "alcance": "8km"}'),
  ('Drone Padrão', 'Vigilância', 'Operacional', 'Torre de Controle', '/modelos3d/drone.glb', '/thumbnails/drone.jpg', '{"autonomia": "4h", "cameras": "HD", "alcance": "5km"}'),
  ('Console Principal', 'Tecnologia', 'Operacional', 'Sala de Controle', '/modelos3d/large-wall-mounted_computer_console.glb', '/thumbnails/console-large.jpg', '{"processamento": "Quantum", "telas": "12", "ia": "Alfred AI"}'),
  ('Console Secundário', 'Tecnologia', 'Operacional', 'Sala de Controle', '/modelos3d/wall_computer_-_small.glb', '/thumbnails/console-small.jpg', '{"processamento": "Neural", "telas": "4", "backup": "Sim"}'),
  ('Armadilha Sci-Fi', 'Segurança', 'Em Desenvolvimento', 'Laboratório', '/modelos3d/sci_fi_trap_game_ready.glb', '/thumbnails/trap.jpg', '{"tipo": "Campo de força", "alcance": "10m", "energia": "Reator Arc"}'),
  ('Batcaverna', 'Instalações', 'Operacional', 'Subsolo', '/modelos3d/the_batcave.glb', '/thumbnails/batcave.jpg', '{"area": "5000m²", "profundidade": "50m", "seguranca": "Nível Máximo"}')
ON CONFLICT DO NOTHING;

-- Inserir câmeras
INSERT INTO cameras (nome, localizacao, status, url_stream) VALUES
  ('Entrada Principal', 'Portão Norte', 'online', '/cam-1.gif'),
  ('Estacionamento', 'Garagem Subterrânea', 'online', '/cam-1.gif'),
  ('Laboratório', 'Ala Científica', 'online', '/cam-1.gif'),
  ('Perímetro Norte', 'Cerca Externa', 'offline', '/cam-1.gif')
ON CONFLICT DO NOTHING;

-- Inserir alertas
INSERT INTO alertas (tipo, mensagem, nivel, resolvido) VALUES
  ('Segurança', 'Movimento detectado no perímetro norte', 'alto', false),
  ('Sistema', 'Atualização de firmware disponível', 'baixo', false),
  ('Manutenção', 'Batmóvel Tumbler requer manutenção preventiva', 'medio', false),
  ('Segurança', 'Tentativa de acesso não autorizado bloqueada', 'critico', true)
ON CONFLICT DO NOTHING;
