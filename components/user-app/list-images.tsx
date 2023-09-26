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
import { useAuthProvider } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { downloadImageUrl } from "@/util/downloadImage";
import { openImageUrl } from "@/util/openImage";
import { deleteFilesStorageClient } from "@/lib/supabase/storage/deleteFilesStoreClient";
import { getPathFileStorage } from "@/util/getPathFileStorage";
import { toast } from "../ui/use-toast";
import { Button, buttonVariants } from "../ui/button";
import { ChevronDown, Download, ExternalLink, LucideLink2, Menu, MoreHorizontal, Option, OptionIcon, Trash, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DialogConfirm } from "../app/dialogConfirm";
import { DialogTrigger } from "../ui/dialog";

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

            await deleteFilesStorageClient([imageRestored, imageProcessing]);

            router.refresh();
        } catch (error: any) {
            toast({
                title: "Erro ao deletar imagem",
                description: error.message,
                variant: "destructive",
            });
        }
    }

    return (
        <div className={cn("space-y-3", className)} {...props}>
            <Image
                        src={url}
                        alt={image.name}
                        width={width}
                        height={height}
                        className={cn(
                            " rounded-lg transition-all hover:scale-105"
                        )}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j+/TsABc4C5lCWr+MAAAAASUVORK5CYII="
                    />
            <DropdownMenu>
                <DropdownMenuTrigger title="opções">
                    <span className={buttonVariants({variant: "link"})}><Menu size={16}/></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                    <DropdownMenuItem
                        onClick={() => {
                            openImageUrl(url);
                        }}
                    >
                        <Button
                            variant={"ghost"}
                            className="gap-2 p-2 w-full justify-start"
                        >
                            <ExternalLink size={18} /> Abrir
                        </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => {
                            downloadImageUrl(url, image.name);
                        }}
                    >
                        <Button
                            variant={"ghost"}
                            className="gap-2 p-2 w-full  justify-start"
                        >
                            <Download size={18} /> Download
                        </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <DialogConfirm
                            confirmRed
                            title="Excluir imagem?"
                            description="Tem certeza que deseja excluir essa imagem? Essa ação não poderá ser desfeita."
                            onConfirm={() => handleDeleteImage(image.name)}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    className="gap-2 w-full hover:bg-destructive p-2 m-2 justify-start"
                                >
                                    <Trash2 size={18} /> Excluir
                                </Button>
                            </DialogTrigger>
                        </DialogConfirm>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
