# Recuperação de senha

**RF - Requisitos Funcionais**
- O usuário deve poder recuperar sua senha informando o seu endereço de e-mail
- O usuário deve receber um e-mail com instruções para a recuperação de senha
- O usuário deve poder resetar sua senha

**RNF - Requisitos Não Funcionais**
- Utilizar mailtrap para testar envios em desenvolvimento
- Utilizar Amazon SES para testar envios em produção
- O envios de e-mails deve acontecer em segundo plano (background job)

**RN - Regras De Negócios**
- O link para resetar a senha deve expirar em 2h
- O usuário precisa confirmar a nova senha ao resetar


# Atualização do perfil

**RF**
- O usuário deve poder atualizar seu perfil (nome, email e senha)

**RNF**

**RN**
- O usuário não pode alterar seu email para um email já utilizado
- Para atualizar a senha, o usuário deve informar a senha antiga
- Para atualizar a senha, o usuário precisa confirmar a nova senha

# Painel de prestador
**RF**
- Usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber notificações sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**
- Os agendamentos do dia deve ser armazenados em cache
- As notificações do prestador devem ser armazenadas em MongoDB
- As notificações do prestador devem ser enviadas em tempo-real com Socket.io


**RN**
- A notificação de deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de serviços
**RF**
- O usuario deve poder listar todos os prestadores de serviço cadastrados
- O usuario deve poder listar os dias de um mês com pelo menos um horário dispovídel de um prestador
- O usuario deve poder listar horários disponíveis em um dia específico de um prestador 
- O usuario deve poder realizar um novo agendamento com m prestador

**RNF**
- A listagem de prestadores deve ser armazenado em cache para evitar recarregar toda vez

**RN**
- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h e 18h (Primeiro às 8h e ultimo às 17h)
- Usuário não pode agendar em um horário já ocupado
- Usuário não pode agendar em um horário que já possou
- Usuário não pode agendar em um serviço consigo mesmo


TODO

1. Rotas e controllers
2. Repositório de tokens (Typeorm)
3. Criar migrations de token
4. Provider de envio de e-mail (DEV)
5. Registrar providers no constainer
6. Testar tudo.