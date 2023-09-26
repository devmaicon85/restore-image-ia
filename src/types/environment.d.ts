export { }
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_SUPABASE_URL: string;
            NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
            NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET: string;
            NEXT_PUBLIC_FOLDER_RESTORED: string;
            NEXT_PUBLIC_FOLDER_PROCESSING: string;
            NEXT_PUBLIC_SUPABASE_STORAGE_URL: string;

            REPLICATE_API_TOKEN: string;

        }
    }
}