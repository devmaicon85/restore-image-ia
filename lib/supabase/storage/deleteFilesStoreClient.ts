import { SUPABASE_BUCKET } from "@/util/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function deleteFilesStorageClient(files: string[]) {

    const supabase = createClientComponentClient();


    if (!files) {
        throw new Error("Nenhum arquivo selecionado");
    }

    const { error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .remove(files);

    if (error) {
        throw new Error("erro ao deletar imagem");
    }
}