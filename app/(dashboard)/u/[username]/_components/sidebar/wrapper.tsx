"use client"

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({children}: WrapperProps) => {
    const {collapsed} = useCreatorSidebar((state) => state);
    const isClient = useIsClient();

    if (!isClient) {
        return <WrapperSkeleton />
    }
    return (
        <aside
            className={cn(
                "fixed left-0 flex flex-col h-full bg-brackground border-r border-[#2D2E35] z-50",
                collapsed ? "w-[70px]" : "w-60"
            )}
        >
            {children}
        </aside>
    )
}

export const WrapperSkeleton = () => {
    return (
        <aside
            className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-brackground border-r border-[#2D2E35] z-50"
        >
            <ToggleSkeleton />
        </aside>
    )
}