"use client"


import { UserNav } from "../common/user-nav"


export default function UserAppHeader() {
    
    return(
        <header className="m-4 container mx-auto">
            <nav className="flex justify-between items-center">
                <span className="font-extrabold">re<span className="font-extralight">Store</span></span>
                <UserNav />
            </nav>
        </header>
    )
}