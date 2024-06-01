"use client"

import { useSidebar } from "@/store/use-sidebar";
import { Button } from '@/components/ui/button';
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

export const Toggle = () => {
    const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse";
    
    const onClick = () => {
        if (collapsed) {
            onExpand()
        } else {
            onCollapse()
        }
    }

    return (
        <div className={cn("p-3 mb-2 flex items-center w-full", 
            collapsed ? "hidden lg:flex justify-center" : "pl-6 justify-between"
        )}>
            {!collapsed && 
            <p className="font-semibold text-primary">
                For you
            </p>}
            <Hint
                label={label}
                asChild={true}
                side="right"
                align="start"
            >
                <Button
                    onClick={onClick}
                    className="h-auto p-2"
                    variant="ghost"
                >
                    {collapsed ? <ArrowRightFromLineIcon className="h-4 w-4"/> : <ArrowLeftFromLineIcon className="h-4 w-4"/>}
                </Button>
            </Hint>
        </div>
    )
}