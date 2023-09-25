import Link from "next/link";

export function Logo() {
    return (
        <span className="font-extrabold text-2xl text-primary-foreground flex bg-secondary-foreground px-4 py-2.5 rounded-full select-none">
            re<span className="font-extralight">store</span>{" "}
            <span className="rounded-full ml-2 bg-accent w-8 h-8 text-primary text-lg flex justify-center items-center ">
                IA
            </span>
        </span>
    );
}
