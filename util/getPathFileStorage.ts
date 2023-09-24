import { FOLDER_PROCESSING, FOLDER_RESTORED, STORAGE_URL, SUPABASE_BUCKET, SUPABASE_URL } from "./constants";


type PathImage = "Processing" | "Restored"

type PathImageProps = {
    userId: string,
    pathImagem: PathImage,
    imageName?: string,
    storageFullUrl?: boolean
}

// todo arquivo é gravado em um bucket do supabase-storage em uma pasta com id do usuário logado
// essa função recebe o id do usuario logado, o path da imagem e o nome da imagem e gera a url.
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

