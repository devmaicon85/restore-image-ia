import { SUPABASE_BUCKET } from "@/util/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export async function uploadFileStorageClient(path: string, file: File | Blob) {
    if (!file) {
        throw new Error("Nenhum arquivo selecionado");
    }

    const supabase = createClientComponentClient();


    const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(path, file);

    if (error) {
        throw new Error("erro ao enviar imagem");
    }

    return { data }

}
