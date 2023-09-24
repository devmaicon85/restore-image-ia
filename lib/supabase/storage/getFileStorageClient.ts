import { FileToProcess } from "@/types";
import { SUPABASE_BUCKET } from "@/util/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getFileStorageClient(file: FileToProcess) {

    const supabase = createClientComponentClient();

    if (!file) {
        throw new Error("Nenhum arquivo selecionado");
    }

    const {
        data: { publicUrl },
    } = supabase.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(`${file?.path}`);


    return { publicUrl }
}
