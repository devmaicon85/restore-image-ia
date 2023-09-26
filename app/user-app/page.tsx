import { RedirectType, redirect } from "next/navigation";

import UserAppHeader from "@/components/user-app/header";
import { SideBar } from "@/components/user-app/sidebar";
import { Separator } from "@/components/ui/separator";
import { ImageUploadPlaceholder } from "@/components/user-app/image-upload-placeholder";
import { ListImages } from "@/components/user-app/list-images";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { listAllStorageServer } from "@/lib/supabase/storage/listAllStorageServer";
import { getSessionAuthServer } from "@/lib/supabase/auth/getSessionAuthServer";
import { getPathFileStorage } from "@/util/getPathFileStorage";
import { PathImage, RestoredImage } from "@/types";
interface Props {
    params: { userId: string };
}
export default async function UserApp({ params }: Props) {
    const {
        data: { session },
        error: sessionError,
    } = await getSessionAuthServer();

    if (!session || sessionError) {
        redirect("/", RedirectType.replace);
    }

    const urlImage = (image: RestoredImage, PathImage: PathImage) =>
        getPathFileStorage({
            userId: session.user.id,
            pathImagem: PathImage,
            imageName: image.name,
            storageFullUrl: true,
        });

    const { data: processingImages, error: errorProcessing } =
        await listAllStorageServer(
            getPathFileStorage({
                userId: session.user.id,
                pathImagem: "Processing",
            })
        );

    if (errorProcessing) {
        console.error("erro ao listar imagens processadas");
    }

    return (
        <AuthProvider>
            <UserAppHeader />
            <div className="flex">
                <SideBar  />
                <div className="col-span-3 lg:col-span-4 lg:border-l">
                    <div className="h-full px-4 py-6 lg:px-8">
                        <div className="border-none p-0 outline-none">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Imagens Restauradas
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Listagem das imagens restauradas pela IA
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-4" />

                            <div className="relative">
                                <ImageUploadPlaceholder />
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 my-10">
                                    {processingImages?.map((image) => (
                                        <div
                                            key={image.id}
                                            className="grid grid-cols-2 items-center gap-4 bg-gray-100 rounded-lg p-4"
                                        >
                                            <ListImages
                                                key={image.id}
                                                image={image}
                                                width={250}
                                                height={250}
                                                url={urlImage(
                                                    image,
                                                    "Processing"
                                                )}
                                            />
                                            <ListImages
                                                key={image.id}
                                                image={image}
                                                width={250}
                                                height={250}
                                                url={urlImage(
                                                    image,
                                                    "Restored"
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative"></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}
