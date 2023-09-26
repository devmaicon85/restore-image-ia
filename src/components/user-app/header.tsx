"use client";

import { UserNav } from "../common/user-nav";
import { Logo } from "../app/logo";
import { ToggleTheme } from "../app/toggle-theme";

export default function UserAppHeader() {
    return (
        <header className=" p-4 border-b">
            <nav className="flex justify-between items-center">
                <div className=" mx-8 md:mx-0 transition-all duration-500"><Logo /></div>
                <div className="gap-2 flex">
                    <ToggleTheme />
                    <UserNav />
                </div>
            </nav>
        </header>
    );
}
