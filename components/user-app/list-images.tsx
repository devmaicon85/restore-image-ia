"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { RestoredImage } from "@/types";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { downloadImageUrl } from "@/util/downloadImage";
import { openImageUrl } from "@/util/openImage";
import { deleteFilesStorageClient } from "@/lib/supabase/storage/deleteFilesStoreClient";
import { getPathFileStorage } from "@/util/getPathFileStorage";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    image: RestoredImage;
    width?: number;
    height?: number;
    url: string;
}

export function ListImages({
    image,
    width,
    height,
    url,
    className,
    ...props
}: Props) {
    const { user } = useAuthProvider();
    const router = useRouter();

    async function handleDeleteImage(image: string) {
        try {
            if (!user) {
                throw new Error("Nenhum usuário logado");
            }

            const imageProcessing = getPathFileStorage({
                userId: user.id,
                pathImagem: "Processing",
                imageName: image,
            });

            const imageRestored = getPathFileStorage({
                userId: user.id,
                pathImagem: "Restored",
                imageName: image,
            });

            deleteFilesStorageClient([imageRestored, imageProcessing]);

            router.refresh();
        } catch (error: any) {
            alert(`Erro ao deletar imagem: ${error.message}`);
        }
    }

    return (
        <div className={cn("space-y-3", className)} {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <Image
                        src={url}
                        alt={image.name}
                        width={width}
                        height={height}
                        className={cn(
                            " rounded-lg transition-all hover:scale-105"
                        )}
                    />
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                    <ContextMenuItem
                        onClick={() => {
                            openImageUrl(url);
                        }}
                    >
                        Abrir Imagem
                    </ContextMenuItem>
                    <ContextMenuItem
                        onClick={() => {
                            handleDeleteImage(image.name);
                        }}
                    >
                        Excluir Imagem
                    </ContextMenuItem>

                    <ContextMenuItem
                        onClick={() => {
                            downloadImageUrl(url, image.name);
                        }}
                    >
                        Download
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    );
}
