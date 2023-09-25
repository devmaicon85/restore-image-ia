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

3. No supabase > store crie um bucket chamado `images` e crie policies de insert, select, update e delete com a seguinte police
   `((bucket_id = 'images'::text) AND ((auth.uid())::text = (storage.foldername(name))[1]))`
   _isso vai permitir que o usuário logado consiga apenas criar imagens dentro da pasta com seu id._

# Melhorias Realizadas

A seguir estão as melhorias realizadas no projeto original:

- Separação da aplicação e das imagens por usuário logado, tornando assim a aplicação multi tenancy.
- Criação de uma pasta para cada usuário logado no Supabase, com políticas de permissão aplicadas apenas à pasta do usuário logado.
- Polling imagem from replicate do lado do servidor não funcionava na vercel quando a resposta demorava mais de 10 segundos; O while agora ocorre do lado do cliente corrigindo esse problema.


## Outras melhorias
- Nova listagem das imagens originais enviadas pelo usuário.
- Nova opção de abrir imagem com o botão direito.
- Nova opção de excluir imagem com o botão direito.


## Funções Modificadas e Separadas na Pasta Utils

- `downloadImage.ts`
- `openImage.ts`
- `getBlobFromImage.ts` - busca o *blob* de uma imagem sem usar o Supabase.
- `getPathFileStorage.ts` - busca o diretório no *storage*.
- `constants.ts` - simplifica o uso das variáveis de ambiente.

## Funções do Supabase Separadas em arquivos

#### Storage

- `deleteFileStoreClient.ts`
- `getFileStorageClient.ts`
- `listAllStorageServer.ts`
- `uploadFileStorageClient.ts`

#### Auth

- `getSessionAuthServer.ts`

## Criação do AuthProvider

Criado um provider `AuthProvider` para persistir o acesso ao código do usuário em toda a aplicação.

## Tema Dark / Light / System

Foi adicionado suporte para os temas Dark, Light e System.

## Logo Diferente

Foi adicionada uma logo personalizada à aplicação.
