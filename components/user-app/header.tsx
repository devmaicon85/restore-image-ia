"use client"


import { UserNav } from "../common/user-nav"
import { Logo } from "../logo"


export default function UserAppHeader() {
    
    return(
        <header className="m-4 container mx-auto">
            <nav className="flex justify-between items-center">
                <Logo/>
                <UserNav />
            </nav>
        </header>
    )
}