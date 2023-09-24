import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FanIcon, ListMusic, ListStart, PlayCircle, Radio } from "lucide-react";
import { FileIcon } from "@radix-ui/react-icons";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function SideBar({ className }: SidebarProps) {
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Discover
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant="secondary"
                            className="w-full justify-start"
                        >
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Listen Now
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <FanIcon className="mr-2 h-4 w-4" />
                            Browse
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <Radio className="mr-2 h-4 w-4" />
                            Radio
                        </Button>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Library
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <ListMusic className="mr-2 h-4 w-4" />
                            Playlists
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <FileIcon className="mr-2 h-4 w-4" />
                            Songs
                        </Button>
                    </div>
                </div>
                <div className="py-2">
                    <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                        Playlists
                    </h2>
                    <ScrollArea className="h-[300px] px-1">
                        <div className="space-y-1 p-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-start font-normal"
                            >
                                <ListStart className="mr-2 h-4 w-4" /> Listagem
                            </Button>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
