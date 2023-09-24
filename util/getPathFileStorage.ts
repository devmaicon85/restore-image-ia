import { SUPABASE_BUCKET } from "./constants";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
const FOLDER_PROCESSING = process.env.NEXT_PUBLIC_FOLDER_PROCESSING
const FOLDER_RESTORED = process.env.NEXT_PUBLIC_FOLDER_RESTORED

type PathImage = "Processing" | "Restored"

type PathImageProps = {
    userId: string,
    pathImagem: PathImage,
    imageName?: string,
    storageFullUrl?: boolean
}

// todo arquivo é gravado em uma pasta no bucket com id do usuário logado
// essa função recebe o id do usuario logado, o path da imagem e o nome da imagem e gera a url da imagem.
// caso storageFullUrl seja informado, gera a url publica completa 

export function getPathFileStorage({ userId, pathImagem, imageName, storageFullUrl }: PathImageProps) {

    let path = "";

    if (storageFullUrl) {
        path += SUPABASE_URL + "/" + STORAGE_URL + "/" + SUPABASE_BUCKET + "/"
    }

    path += userId;

    if (pathImagem === "Processing") path += "/" + FOLDER_PROCESSING
    else if (pathImagem === "Restored") path += "/" + FOLDER_RESTORED

    if (imageName) path += "/" + imageName

    return path;
}

