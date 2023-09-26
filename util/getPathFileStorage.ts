import { FOLDER_PROCESSING, FOLDER_RESTORED, STORAGE_URL, SUPABASE_BUCKET, SUPABASE_URL } from "./constants";


type PathImage = "Processing" | "Restored"

type PathImageProps = {
    userId: string,
    pathImagem: PathImage,
    imageName?: string,
    storageFullUrl?: boolean
}

// essa função recebe o id do usuario logado, o path da imagem e então gera a url para um bucket do supabase;
// cada usuário logado pode gravar apenas na sua pasta;
// nome da imagem é opcional pois pode estar querendo pegar o diretorio inteiro (para listar as imagens)
// se storageFullUrl é informado, gera a url publica completa 

export function getPathFileStorage({ userId, pathImagem, imageName, storageFullUrl }: PathImageProps) {

    let path = userId; // obrigatório informar o id do usuário logado

    if (pathImagem === "Processing") path += "/" + FOLDER_PROCESSING
    else if (pathImagem === "Restored") path += "/" + FOLDER_RESTORED
    else throw new Error("pathImagem deve ser Processing ou Restored")

    if (imageName) path += "/" + imageName

    if (storageFullUrl) {
        path = SUPABASE_URL + "/" + STORAGE_URL + "/" + SUPABASE_BUCKET + "/" + path
    }

 
    return path;
}

