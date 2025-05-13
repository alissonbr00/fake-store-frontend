🏪 FakeStore Loja - Projeto React + Material UI
Um sistema de autenticação e listagem de produtos consumindo a FakeStoreAPI, com modo Tabela & Cards, JWT e integração ao GitHub.

🚀 Setup e Instalação
Siga os passos abaixo para rodar o projeto localmente:

1️⃣ Clone este repositório

bash
git clone https://github.com/alissonbr00/fake-store-frontend

cd projeto-loja
2️⃣ Instale as dependências

bash
npm install
3️⃣ Crie um arquivo .env para configurar a API

bash
VITE_API_BASE_URL=https://fakestoreapi.com
4️⃣ Inicie o servidor de desenvolvimento

bash
npm run dev
🔐 Login
Para acessar, use as credenciais padrão da FakeStoreAPI:

Username: mor_2314

Password: 83r5^_

Após o login, um JWT será salvo no localStorage, permitindo acesso às rotas autenticadas.

🛒 Funcionalidades
✅ Login usando JWT ✅ Modo de exibição alternável (Tabela ↔️ Cards) ✅ Listagem de produtos autenticado ✅ Exibição de detalhes no drawer lateral ✅ Logout, removendo o token

🎨 Tecnologias
O projeto utiliza as seguintes tecnologias:

⚛ React + Vite (Interface moderna e responsiva)

🎨 Material UI (Componentes estilizados)

🔐 JWT Authentication (Login seguro)

🔄 Axios (Requisições à API)

🛠 TypeScript (Tipagem segura)

🤝 Contribuições
Sinta-se à vontade para sugerir melhorias! Faça um fork e envie um pull request.

🔗 GitHub: https://github.com/alissonbr00/fake-store-frontend
