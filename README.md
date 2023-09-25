# Aplicação Next.js com IA Supabase Shadcn-ui

Esta aplicação foi desenvolvida com base no projeto "Projeto Next.js 13 Completo com IA Supabase Shadcn-ui". 
O objetivo deste projeto é criar uma aplicação para a restauração de fotos antigas utilizando IA

O vídeo completo do projeto pode ser encontrado [aqui](https://www.youtube.com/watch?v=KHKpKR1NuaU&t=2s&ab_channel=DeveloperDeck101).

## Instalação

Siga as instruções abaixo para instalar todas as dependências necessárias:

1. Execute o seguinte comando para instalar as dependências:

```bash
pnpm i
```

2. Renomeie o arquivo `env.example` para `.env` e substitua as credenciais do Supabase e Replicate pelos seus próprios valores.

- [Supabase](https://supabase.com/)
- [Replicate](https://replicate.com/)

## Melhorias Realizadas

A seguir estão as melhorias realizadas no projeto original:

- Separação da aplicação e das imagens por usuário logado, tornando assim a aplicação multi tenancy.
- Criação de uma pasta para cada usuário logado no Supabase, com políticas de permissão aplicadas apenas à pasta do usuário logado.
- Nova listagem das imagens originais enviadas pelo usuário.
- Nova opção de abrir imagem com o botão direito.
- Nova opção de excluir imagem com o botão direito.

### Funções Modificadas e Separadas na Pasta Utils

- `downloadImage.ts`
- `openImage.ts`
- `getBlobFromImage.ts` - busca o *blob* de uma imagem sem usar o Supabase.
- `getPathFileStorage.ts` - busca o diretório no *storage*.
- `constants.ts` - simplifica o uso das variáveis de ambiente.

### Funcionalidades do Supabase Separadas

#### Storage

- `deleteFileStoreClient.ts`
- `getFileStorageClient.ts`
- `listAllStorageServer.ts`
- `uploadFileStorageClient.ts`

#### Auth

- `getSessionAuthServer.ts`

### Criação do AuthProvider

Foi criado um `AuthProvider` para permitir o acesso ao código do usuário em toda a aplicação.

### Tema Dark / Light / System

Foi adicionado suporte para os temas Dark, Light e System.

### Logo Diferente

Foi adicionada uma logo personalizada à aplicação.
