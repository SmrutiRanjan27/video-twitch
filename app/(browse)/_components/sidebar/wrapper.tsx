"use client"

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({
    children
}: WrapperProps) => {
    const isClient = useIsClient();
    const { collapsed } = useSidebar((state) => state);

    if (!isClient) {
        return <SidebarSkeleton />
    }

    return (
        <aside className={cn("fixed left-0 flex flex-col h-full bg-background border-r border-[#2D2E35] z-50",
            collapsed ? "w-[70px]" : "w-60")}
        >
            {children}
        </aside>
    )
}

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </aside>
    )
}