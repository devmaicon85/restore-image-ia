"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    FanIcon,
    ListMusic,
    ListStart,
    Menu,
    PlayCircle,
    Radio,
    X,
} from "lucide-react";
import { FileIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function SideBar({ className }: SidebarProps) {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div>
            <div
                className={cn(
                    "m-4 absolute -mt-16 block md:hidden rounded-md",
                    openMenu && "bg-primary text-secondary"
                )}
            >
                <Button
                    variant="ghost"
                    size={"icon"}
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <Menu />
                </Button>
            </div>
            <div
                className={cn(
                    "pb-12 bg-background h-screen w-full z-50 absolute md:relative  md:max-w-xs min-w-[200px]",
                    className,
                    openMenu ? "block" : "hidden md:block"
                )}
            >
                <div className=" flex justify-end  absolute w-full ">
                    <Button
                        variant="ghost"
                        className={cn(" mt-2 mr-3 md:hidden")}
                        size={"icon"}
                        onClick={() => setOpenMenu(false)}
                    >
                        <X />
                    </Button>
                </div>
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
                                    <ListStart className="mr-2 h-4 w-4" />{" "}
                                    Listagem
                                </Button>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}
