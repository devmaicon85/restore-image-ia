"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
    title: string;
    description: string;
    confirmRed:boolean
    onConfirm: () => void;
    children: React.ReactNode;
};
export function DialogConfirm({
    title,
    description,
    onConfirm,
    confirmRed,
    children,
}: Props) {

    const [open, setOpen] = useState(false);

  
    return (
        <Dialog defaultOpen={false} open={open} onOpenChange={setOpen} >
            {children}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="gap-2"     >
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-4">
                    <Button onClick={()=>setOpen(false)} variant={"outline"}>Cancelar</Button>
                    <Button onClick={onConfirm} variant={confirmRed ? "destructive" : "default"}>Sim</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
