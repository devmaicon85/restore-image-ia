import Link from "next/link";

export function Logo() {
    return (
        <span className="font-extrabold text-3xl text-primary flex px-4 py-2.5 rounded-full select-none">
            re<span className="font-extralight">store</span>{" "}
            <span className="rounded-full ml-1 bg-accent w-10 h-10 text-primary text-2xl flex justify-center items-center ">
                IA
            </span>
        </span>
    );
}
