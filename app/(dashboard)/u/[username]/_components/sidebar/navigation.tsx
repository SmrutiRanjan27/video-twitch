"use client"

import { useUser } from "@clerk/nextjs";
import { FullscreenIcon, KeyRoundIcon, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation"
import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
    
    const pathname = usePathname();
    const {user} = useUser();

    const routes = [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: FullscreenIcon
        },
        {
            label: "Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRoundIcon
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users
        }
    ]

    if (!user?.username) {
        return (
            <ul className="space-y-2 px-1 pt-4 lg:pt-0">
                {[...Array(4)].map((_, index) => (
                    <NavItemSkeleton key={index} />
                ))}
            </ul>
        )
    }
    
    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map(route => (
                <NavItem 
                    key={route.href}
                    icon={route.icon}
                    href={route.href}
                    label={route.label}
                    isActive={route.href === pathname}
                />
            ))}
        </ul>
    )
}