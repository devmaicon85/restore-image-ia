"use client";

import { UserNav } from "../common/user-nav";
import { Logo } from "../app/logo";
import { ToggleTheme } from "../app/toggle-theme";

export default function UserAppHeader() {
    return (
        <header className="m-4 container mx-auto">
            <nav className="flex justify-between items-center">
                <Logo />
                <div className="gap-2 flex">
                    <ToggleTheme />
                    <UserNav />
                </div>
            </nav>
        </header>
    );
}
