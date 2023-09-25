Essa aplicação foi desenvolvida através do "Projeto Next js 13 Completo com IA Supabase Shadcn-ui"
Link do video no Youtube: https://www.youtube.com/watch?v=KHKpKR1NuaU&t=2s&ab_channel=DeveloperDeck101


// instalar todas as dependencias
pnpm i

//renomear env.example para .env e substituir pelas suas credenciais do supabase e replicate 

 (https://supabase.com/)
(https://replicate.com/)


MELHORIAS QUE REALIZEI NO PROJETO

Separei a aplicação e as imagens por usuário logado, tornando assim a aplicação multi tenancy.
Crei uma pasta por usuário no logado no supabase com políticas de permissão apenas para a pasta do usuário logado.
Nova listagem das imagens originais enviadas pelo usuário.
Nova opção de abrir imagem com o botão direito
Nova opção de excluir imagem com o botão direito


Funções uteis separadas na pasta Utils
	downloadImage.ts
	openImage.ts
	getBlobFromImage.ts //pra buscar o blob de uma imagem sem usar o supabase
	getPathFileStorage.ts // pra buscar o diretorio no storage
	constants.ts // pra simplificar o uso das env.


Funcionalidades do supabase separadas
	Storage:
		deleteFileStoreClient.ts
		getFileStorageClient.ts
		listAllStorageServer.ts
		uploadFileStorageClient.ts
    Auth:
        getSessionAuthServer.ts

Criação do AuthProvider para acesso ao codigo do usuario em toda a aplicação 

