"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"
import { usePathname } from "next/navigation"
import { UserAvatar } from "@/components/user-avatar"
import { LiveBadge } from "@/components/live-badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface UserItemProps {
    username : string
    imageUrl: string
    isLive?: boolean
}

export const UserItem = ({
    username, imageUrl, isLive
}: UserItemProps) => {
    const {collapsed} = useSidebar((state) => state);

    const pathName = usePathname();
    const href = `/user/${username}`;
    const isActive = pathName == href;

    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full h-12",
                isActive && "bg-accent"
            )}
        >
            <Link href={href} className="w-full">
                <div className={cn(
                    "flex items-center w-full gap-x-4",
                    collapsed ? "justify-center" : "justify-start"
                )}>
                    <UserAvatar 
                        username={username}
                        imageUrl={imageUrl}
                        isLive={isLive}
                    />
                    {!collapsed && 
                        <p className="truncate">
                            {username}
                        </p>
                    }
                    {!collapsed && isLive && (
                        <LiveBadge className="ml-auto"/>
                    )}
                </div>
            </Link>
        </Button>
    )
}

export const UserItemSkeleton = () => {
    return (
        <li className="flex justify-center lg:justify-start items-center gap-x-4 p-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full"/>
            <Skeleton className="hidden lg:flex w-full h-6 rounded-md"/>
        </li>
    )
}