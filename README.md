# credenciamento-eventos (scaffold)

Projeto dividido em dois repositórios/pastas para deploys distintos:
- credenciamento-eventos-backend (API - Node.js + Express)
- credenciamento-eventos-frontend (Next.js)

## O que já está incluído
- Upload de imagens do dispositivo via formulário (Front) e Cloudinary (Back)
- Criação de eventos (nome, data, local, descrição, imagem)
- Inscrição de participantes (nome, e-mail, telefone, setor)
- Geração de QR Code e PDF personalizado (PDF enviado por e-mail)
- Exemplo de integração Z-API (arquivo separado e comentado)

## Arquivos importantes
- backend/.env.example (preencha com suas credenciais)
- frontend: configure NEXT_PUBLIC_BACKEND_URL para a URL do backend

---
## Instruções rápidas para configurar MongoDB Atlas
1. Acesse https://www.mongodb.com/cloud/atlas e crie uma conta (gratuita).
2. Ao criar o projeto, escolha o cluster gratuito (Shared Cluster - M0).
3. Na seção *Database Access*, crie um usuário (username + password) com acesso ao cluster.
4. Na seção *Network Access*, adicione seu IP (ou 0.0.0.0/0 para testes).
5. Clique em *Connect* > *Connect your application* e copie a connection string (algo como `mongodb+srv://<user>:<password>@cluster0.xyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).
6. Cole essa string em `credenciamento-eventos-backend/.env` como `MONGO_URI` (substitua `<user>` e `<password>` e o nome do DB conforme desejar).

---
## Deploy recomendado
Backend: Render (https://render.com) - criar Web Service apontando para a pasta credenciamento-eventos-backend
Frontend: Vercel (https://vercel.com) - apontar para a pasta credenciamento-eventos-frontend

## Passos gerais de deploy
1. Crie um repositório no GitHub e suba as pastas `credenciamento-eventos-backend` e `credenciamento-eventos-frontend` na raiz.
2. No Render: crie um novo Web Service e selecione o subdiretório `credenciamento-eventos-backend` (defina variáveis de ambiente conforme .env.example). Build: `npm install`, Start: `npm start`.
3. No Vercel: importe o projeto e selecione o subdiretório `credenciamento-eventos-frontend`. Defina `NEXT_PUBLIC_BACKEND_URL` com a URL do backend do Render.

---
## Observações
- O scaffold é um ponto de partida. Teste localmente antes de subir para produção.
- Se quiser que eu suba o conteúdo para um repositório GitHub (zip -> repo) ou gerar instruções passo-a-passo com prints, eu posso ajudar.

Gerado em: 2025-11-06T16:42:41.683188 UTC

